import axiosInstance from '@/lib/axios'
import roomSizeOptions from '@/composables/roomSizeLibrary.json'

const sizeByToken = new Map()
for (const option of roomSizeOptions) {
  sizeByToken.set(String(option.value).toUpperCase(), option.value)
  sizeByToken.set(String(option.label).toLowerCase(), option.value)
}

let mergedVenuesCache = null
let venuesInflight = null

/** Query params for GET /venues (room size, accommodation, indoor/outdoor). */
export function venuesQueryFromFilters(filters = {}) {
  const params = {}
  if (filters.roomSize) params.roomSize = filters.roomSize
  if (filters.accommodationTypes?.length) {
    params.accommodationTypes = filters.accommodationTypes.join(',')
  }
  if (filters.facilityTypes?.length) {
    params.facilityTypes = filters.facilityTypes.join(',')
  }
  return params
}

function unwrapList(res) {
  const body = res?.data
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  return []
}

export function normalizeRoomSize(size) {
  if (size == null || size === '') return ''
  const raw = String(size).trim()
  return sizeByToken.get(raw.toUpperCase()) || sizeByToken.get(raw.toLowerCase()) || raw.toUpperCase()
}

function coercePrice(value) {
  if (value === '' || value == null) return null
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function lowestRoomPrice(rooms) {
  const prices = (rooms || [])
    .map((room) => coercePrice(room?.price_per_hr ?? room?.pricePerHr))
    .filter((n) => n != null)
  if (!prices.length) return null
  return Math.min(...prices)
}

function venueKey(venue) {
  if (venue?.id != null && venue.id !== '') return String(venue.id)
  if (venue?._id != null) return String(venue._id)
  return ''
}

function roomVenueKey(room) {
  if (room?.venueId != null && room.venueId !== '') return String(room.venueId)
  if (room?.venue_id != null && room.venue_id !== '') return String(room.venue_id)
  return ''
}

export function roomBelongsToVenue(room, venueId) {
  const id = String(venueId ?? '')
  if (!id || id === 'undefined' || id === 'null') return false
  if (room?.venueId != null && String(room.venueId) === id) return true
  if (room?.venue_id != null && String(room.venue_id) === id) return true
  const venue = room?.venue
  if (venue != null && typeof venue === 'object') {
    if (venue._id != null && String(venue._id) === id) return true
    if (venue.id != null && String(venue.id) === id) return true
    if (venue.venueId != null && String(venue.venueId) === id) return true
  }
  if (venue != null && (typeof venue === 'string' || typeof venue === 'number')) {
    return String(venue) === id
  }
  return false
}

function collectRoomSizes(venue) {
  const fromField = Array.isArray(venue.roomSizes) ? venue.roomSizes : []
  const fromRooms = Array.isArray(venue.rooms) ? venue.rooms.map((room) => room.size) : []
  const raw = fromField.length ? fromField : fromRooms
  return [...new Set(raw.map(normalizeRoomSize).filter(Boolean))]
}

/** Attach public /rooms onto venue list so map cards can show starting price and filter by size. */
export function attachRoomsToVenues(venues, rooms) {
  const grouped = new Map()
  for (const room of rooms || []) {
    const key = roomVenueKey(room)
    if (!key) continue
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(room)
  }

  return (venues || []).map((venue) => {
    const venueRooms = grouped.get(venueKey(venue)) || []
    const roomSizes = collectRoomSizes({ ...venue, rooms: venueRooms })
    const starting = lowestRoomPrice(venueRooms)
    const existing = coercePrice(venue.price_per_hr ?? venue.pricePerHr)
    const price = starting ?? existing
    return {
      ...venue,
      rooms: venueRooms,
      roomSizes,
      price_per_hr: price,
      pricePerHr: price,
    }
  })
}

function matchesAccommodation(type, selected) {
  const value = String(type || '').toLowerCase()
  return selected.some((key) => {
    if (key === 'hotel') return value.includes('hotel')
    if (key === 'bar') return value.includes('bar') || value.includes('restaurant') || value.includes('restuarant')
    if (key === 'residence') return value.includes('residence')
    return false
  })
}

function matchesFacility(searchTags, selected) {
  const tags = (searchTags || []).map((tag) => String(tag).toLowerCase())
  const hasOutdoor = tags.some((tag) => tag === 'outdoor' || tag === 'outdoors')
  const hasIndoor = tags.some((tag) => tag === 'indoor' || tag === 'indoors')
  const outdoor = selected.includes('outdoor')
  const indoor = selected.includes('indoor')
  if (outdoor && indoor) return true
  if (outdoor) return hasOutdoor
  if (indoor) return hasIndoor || !hasOutdoor
  return true
}

function venueTagList(venue) {
  const raw = [
    ...(Array.isArray(venue.searchTags) ? venue.searchTags : []),
    ...(Array.isArray(venue.tags) ? venue.tags : []),
    ...(Array.isArray(venue.amenities) ? venue.amenities : []),
  ]
  return raw
    .map((tag) => {
      if (tag == null) return ''
      if (typeof tag === 'string') return tag.toLowerCase()
      return String(tag.value || tag.name || tag.label || '').toLowerCase()
    })
    .filter(Boolean)
}

function matchesAmenities(venue, selected) {
  const tags = venueTagList(venue)
  return selected.every((raw) => {
    const wanted = String(raw).toLowerCase().trim()
    if (!wanted) return true
    return tags.some((tag) => tag === wanted || tag.includes(wanted) || wanted.includes(tag))
  })
}

function matchesCity(venue, city) {
  const wanted = String(city).toLowerCase().trim()
  if (!wanted) return true
  const value = [venue.venue_city, venue.city].filter(Boolean).join(' ').toLowerCase()
  return value.includes(wanted)
}

const ACCOMMODATION_HOME_TAGS = {
  bar: 'bar',
  restaurant: 'bar',
  hotel: 'hotel',
  residence: 'residence',
}

const FACILITY_HOME_TAGS = {
  outdoor: 'outdoor',
  outdoors: 'outdoor',
  indoor: 'indoor',
  indoors: 'indoor',
}

/** Map homepage city + must-have tags onto the same filter object the map uses. */
export function filtersFromHomeSearch({ tags = [], city = '' } = {}) {
  const accommodationTypes = []
  const facilityTypes = []
  const amenities = []
  for (const raw of tags) {
    const tag = String(raw).toLowerCase().trim()
    if (!tag) continue
    if (ACCOMMODATION_HOME_TAGS[tag]) {
      const value = ACCOMMODATION_HOME_TAGS[tag]
      if (!accommodationTypes.includes(value)) accommodationTypes.push(value)
      continue
    }
    if (FACILITY_HOME_TAGS[tag]) {
      const value = FACILITY_HOME_TAGS[tag]
      if (!facilityTypes.includes(value)) facilityTypes.push(value)
      continue
    }
    amenities.push(tag)
  }
  const normalizedCity = String(city || '').trim()
  const invalidCity =
    !normalizedCity ||
    normalizedCity === 'Use Current Location' ||
    normalizedCity === 'City not found'
  return {
    roomSize: '',
    accommodationTypes,
    facilityTypes,
    amenities,
    city: invalidCity ? '' : normalizedCity,
  }
}

/** Apply the same filter rules locally so the UI works even if the API ignores query params. */
export function applyVenueFilters(venues, filters = {}) {
  let list = Array.isArray(venues) ? venues : []
  if (filters.roomSize) {
    const wanted = normalizeRoomSize(filters.roomSize)
    list = list.filter((venue) => {
      const sizes = collectRoomSizes(venue)
      // No room metadata at all (rooms request failed): don't hide the venue.
      if (!sizes.length && venue.rooms == null && !Array.isArray(venue.roomSizes)) return true
      return sizes.includes(wanted)
    })
  }
  if (filters.accommodationTypes?.length) {
    list = list.filter((venue) =>
      matchesAccommodation(venue.accomodation_type || venue.accommodation_type, filters.accommodationTypes)
    )
  }
  if (filters.facilityTypes?.length) {
    list = list.filter((venue) => matchesFacility(venue.searchTags, filters.facilityTypes))
  }
  if (filters.amenities?.length) {
    list = list.filter((venue) => matchesAmenities(venue, filters.amenities))
  }
  if (filters.city) {
    list = list.filter((venue) => matchesCity(venue, filters.city))
  }
  return list
}

/**
 * Live api.hyyp.io serves GET /rooms and 404s GET /venues/:id/rooms.
 * Local server is the reverse, so try the flat list first.
 */
export async function fetchRoomsForVenue(venueId, extraVenueId) {
  if (venueId == null || venueId === '') return []

  const matchesVenue = (room) =>
    roomBelongsToVenue(room, venueId) ||
    (extraVenueId != null && extraVenueId !== '' && roomBelongsToVenue(room, extraVenueId))

  const listRes = await axiosInstance.get('/rooms').catch(() => null)
  if (listRes) {
    const list = unwrapList(listRes)
    if (list.length) return list.filter(matchesVenue)
  }

  try {
    const res = await axiosInstance.get(`/venues/${venueId}/rooms`)
    return unwrapList(res).map((room) => ({
      ...room,
      venueId: room.venueId ?? room.venue_id ?? venueId,
    }))
  } catch {
    return []
  }
}

/** GET /api/venues — join rooms for prices and sizes, then apply filters locally if the API ignores query params. */
async function fetchAllRooms(venues) {
  const listRes = await axiosInstance.get('/rooms').catch(() => null)
  if (listRes) {
    const list = unwrapList(listRes)
    if (list.length) return list
  }

  const perVenue = await Promise.all(
    (venues || []).map(async (venue) => {
      const id = venue?.id
      if (id == null || id === '') return []
      return fetchRoomsForVenue(id)
    })
  )
  return perVenue.flat()
}

async function loadMergedVenues(refresh = false) {
  if (!refresh && mergedVenuesCache) return mergedVenuesCache
  if (!refresh && venuesInflight) return venuesInflight

  venuesInflight = (async () => {
    try {
      const venuesRes = await axiosInstance.get('/venues')
      const venues = unwrapList(venuesRes)
      let rooms = []
      try {
        rooms = await fetchAllRooms(venues)
      } catch (err) {
        console.error('Error fetching rooms for venue list:', err)
      }
      mergedVenuesCache = rooms.length ? attachRoomsToVenues(venues, rooms) : venues
      return mergedVenuesCache
    } finally {
      venuesInflight = null
    }
  })()

  return venuesInflight
}

/** GET /api/venues — join rooms once, then filter in memory. Pass `{ refresh: true }` to refetch. */
export async function fetchVenues(filters = {}, { refresh = false } = {}) {
  const merged = await loadMergedVenues(refresh)
  return applyVenueFilters(merged, filters)
}

/** True for positive integer venue ids (excludes "undefined", "new", etc.). */
export function isValidVenueId(id) {
  if (id == null || id === '' || id === 'new') return false
  const s = String(id).trim()
  if (s === 'undefined' || s === 'null' || s === 'NaN') return false
  if (!/^\d+$/.test(s)) return false
  const n = parseInt(s, 10)
  return !Number.isNaN(n) && n >= 1
}

/** GET /api/venues/:id */
export async function fetchVenueById(venueId) {
  const res = await axiosInstance.get(`/venues/${venueId}`)
  return res.data?.data ?? null
}

/** GET /api/venues/me — current user's linked venue (requires auth). */
export async function fetchMyVenue() {
  const res = await axiosInstance.get('/venues/me')
  return res.data?.data ?? null
}

/**
 * Prefer a numeric route id; otherwise load the authenticated user's venue via /me.
 * @returns {{ venue: object | null, source: 'id' | 'me' | null }}
 */
export async function fetchVenueByIdOrMe(routeVenueId) {
  if (isValidVenueId(routeVenueId)) {
    const venue = await fetchVenueById(String(routeVenueId).trim())
    return { venue, source: 'id' }
  }
  try {
    const venue = await fetchMyVenue()
    return { venue, source: venue ? 'me' : null }
  } catch (err) {
    if (err.response?.status === 404) {
      return { venue: null, source: null }
    }
    throw err
  }
}
