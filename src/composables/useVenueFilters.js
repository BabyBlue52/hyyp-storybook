import { reactive, computed } from 'vue';

function emptyFilters() {
    return {
        roomSize: '',
        accommodationTypes: [],
        facilityTypes: [],
    };
}

function copyInto(target, source) {
    target.roomSize = source.roomSize || '';
    target.accommodationTypes = [...(source.accommodationTypes || [])];
    target.facilityTypes = [...(source.facilityTypes || [])];
}

export function countFilters(filters) {
    let count = 0;
    if (filters.roomSize) count += 1;
    count += filters.accommodationTypes?.length || 0;
    count += filters.facilityTypes?.length || 0;
    return count;
}

const draftFilters = reactive(emptyFilters());
const appliedFilters = reactive(emptyFilters());

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

    return {
        draftFilters,
        appliedFilters,
        draftCount,
        appliedCount,
        applyFilters,
        discardDraft,
        clearAll,
    };
}
