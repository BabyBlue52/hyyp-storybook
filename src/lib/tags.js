import axiosInstance from '@/lib/axios'

/** Used when GET /tags is empty or unreachable, so pickers still render. */
export const FALLBACK_TAGS = [
    { name: 'Bar', value: 'bar', match: 'accommodation', matchValue: 'bar', active: true, sort: 10 },
    { name: 'Outdoors', value: 'outdoors', match: 'facility', matchValue: 'outdoor', active: true, sort: 20 },
    { name: 'Food', value: 'food', match: 'searchTag', matchValue: null, active: true, sort: 30 },
    { name: 'Music', value: 'music', match: 'searchTag', matchValue: null, active: true, sort: 40 },
    { name: 'Dancefloor', value: 'dancefloor', match: 'searchTag', matchValue: null, active: true, sort: 50 },
    { name: 'Theater', value: 'theater', match: 'searchTag', matchValue: null, active: true, sort: 60 },
    { name: 'Sports', value: 'sports', match: 'searchTag', matchValue: null, active: true, sort: 70 },
]

const DRAFT_SEARCH_TAGS_KEY = 'hyyp:draftSearchTags'

const LEGACY_ACCOMMODATION = {
    bar: 'bar',
    restaurant: 'bar',
    hotel: 'hotel',
    residence: 'residence',
}

const LEGACY_FACILITY = {
    outdoor: 'outdoor',
    outdoors: 'outdoor',
    indoor: 'indoor',
    indoors: 'indoor',
}

export function normalizeTag(tag) {
    const value = String(tag?.value || tag?.name || '').trim().toLowerCase()
    return {
        name: String(tag?.name || value).trim() || value,
        value,
        match: tag?.match || 'searchTag',
        matchValue: tag?.matchValue ? String(tag.matchValue).trim().toLowerCase() : null,
        active: tag?.active !== false,
        sort: Number.isFinite(Number(tag?.sort)) ? Number(tag.sort) : 0,
    }
}

export async function fetchSearchTags() {
    try {
        const res = await axiosInstance.get('/tags')
        const list = Array.isArray(res?.data?.data) ? res.data.data : []
        const tags = list.map(normalizeTag).filter((tag) => tag.value && tag.active)
        if (tags.length) return tags.sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name))
    } catch {
        // Fall through to the built-in list.
    }
    return FALLBACK_TAGS.map(normalizeTag)
}

/**
 * Turn a selected tag value into the map filter it belongs to.
 * Catalog match wins. Legacy bar/outdoors mapping covers values missing from the catalog.
 */
export function classifySearchTag(raw, catalog = []) {
    const value = String(raw || '').toLowerCase().trim()
    if (!value) return null
    const meta = (catalog || []).find((tag) => String(tag.value).toLowerCase() === value)
    if (meta?.match === 'accommodation') {
        return { kind: 'accommodation', value: meta.matchValue || value }
    }
    if (meta?.match === 'facility') {
        return { kind: 'facility', value: meta.matchValue || value }
    }
    if (meta?.match === 'searchTag') {
        return { kind: 'amenity', value }
    }
    if (LEGACY_ACCOMMODATION[value]) {
        return { kind: 'accommodation', value: LEGACY_ACCOMMODATION[value] }
    }
    if (LEGACY_FACILITY[value]) {
        return { kind: 'facility', value: LEGACY_FACILITY[value] }
    }
    return { kind: 'amenity', value }
}

export function stashDraftSearchTags(tags) {
    const values = (Array.isArray(tags) ? tags : [])
        .map((tag) => String(tag || '').trim().toLowerCase())
        .filter(Boolean)
    if (!values.length) {
        sessionStorage.removeItem(DRAFT_SEARCH_TAGS_KEY)
        return
    }
    sessionStorage.setItem(DRAFT_SEARCH_TAGS_KEY, JSON.stringify(values))
}

export function takeDraftSearchTags() {
    const raw = sessionStorage.getItem(DRAFT_SEARCH_TAGS_KEY)
    sessionStorage.removeItem(DRAFT_SEARCH_TAGS_KEY)
    if (!raw) return []
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed.map((tag) => String(tag).toLowerCase()) : []
    } catch {
        return []
    }
}
