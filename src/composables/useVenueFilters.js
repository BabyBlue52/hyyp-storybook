import { reactive, computed, ref } from 'vue';

function emptyFilters() {
    return {
        roomSize: '',
        accommodationTypes: [],
        facilityTypes: [],
        amenities: [],
        city: '',
    };
}

function copyInto(target, source) {
    target.roomSize = source.roomSize || '';
    target.accommodationTypes = [...(source.accommodationTypes || [])];
    target.facilityTypes = [...(source.facilityTypes || [])];
    target.amenities = [...(source.amenities || [])];
    target.city = source.city || '';
}

export function countFilters(filters) {
    let count = 0;
    if (filters.roomSize) count += 1;
    count += filters.accommodationTypes?.length || 0;
    count += filters.facilityTypes?.length || 0;
    count += filters.amenities?.length || 0;
    return count;
}

const draftFilters = reactive(emptyFilters());
const appliedFilters = reactive(emptyFilters());
const isFiltersOpen = ref(false);

/**
 * Shared map-page filter state. Draft edits stay local until Apply;
 * applied filters are sent to GET /venues.
 */
export function useVenueFilters() {
    const draftCount = computed(() => countFilters(draftFilters));
    const appliedCount = computed(() => countFilters(appliedFilters));

    function applyFilters() {
        copyInto(appliedFilters, draftFilters);
    }

    function discardDraft() {
        copyInto(draftFilters, appliedFilters);
    }

    function clearAll() {
        copyInto(draftFilters, emptyFilters());
        copyInto(appliedFilters, emptyFilters());
    }

    /** Replace draft + applied with a full filter set (homepage Search). */
    function setAppliedFilters(source) {
        copyInto(draftFilters, { ...emptyFilters(), ...source });
        copyInto(appliedFilters, draftFilters);
    }

    return {
        draftFilters,
        appliedFilters,
        isFiltersOpen,
        draftCount,
        appliedCount,
        applyFilters,
        discardDraft,
        clearAll,
        setAppliedFilters,
    };
}
