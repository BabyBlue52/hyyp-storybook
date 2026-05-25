<template>
    <div class="hyyp-input address-autocomplete">
        <div class="d-flex column">
            <label>{{ label }}</label>
            <div class="autocomplete-wrapper">
                <v-text-field
                    :model-value="searchQuery"
                    @update:model-value="handleInput"
                    @focus="showSuggestions = true"
                    @blur="handleBlur"
                    :placeholder="placeholder"
                    variant="filled"
                    hide-details
                ></v-text-field>
                <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
                    <div
                        v-for="(suggestion, index) in suggestions"
                        :key="index"
                        class="suggestion-item"
                        @mousedown.prevent="selectAddress(suggestion)"
                    >
                        <div class="suggestion-main">{{ suggestion.place_name }}</div>
                        <div class="suggestion-details">{{ suggestion.context?.map(c => c.text).join(', ') }}</div>
                    </div>
                </div>
                <div v-if="loading" class="suggestions-dropdown">
                    <div class="suggestion-item">Loading...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Address'
    },
    placeholder: {
        type: String,
        default: 'Start typing an address...'
    }
});

const emit = defineEmits(['update:modelValue', 'address-selected']);

const searchQuery = ref(props.modelValue || '');
const suggestions = ref([]);
const showSuggestions = ref(false);
const loading = ref(false);
const searchTimeout = ref(null);

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
    if (newValue !== searchQuery.value) {
        searchQuery.value = newValue;
    }
});

const handleInput = (value) => {
    searchQuery.value = value;
    emit('update:modelValue', value);
    
    if (value.length < 3) {
        suggestions.value = [];
        return;
    }

    // Debounce API calls
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
        searchAddresses(value);
    }, 300);
};

const searchAddresses = async (query) => {
    if (!MAPBOX_TOKEN) {
        console.error('Mapbox API key not found');
        return;
    }

    loading.value = true;
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
            `access_token=${MAPBOX_TOKEN}&` +
            `types=address&` +
            `country=US&` +
            `limit=5`
        );

        const data = await response.json();
        suggestions.value = data.features || [];
    } catch (error) {
        console.error('Error fetching addresses:', error);
        suggestions.value = [];
    } finally {
        loading.value = false;
    }
};

const parseAddressComponents = (feature) => {
    const context = feature.context || [];
    const properties = feature.properties || {};
    let address = '';
    let city = '';
    let state = '';
    let zipCode = '';
    let coordinates = feature.geometry.coordinates;
    let venue_district = null;

    // feature.text: contains the street name (e.g., "Main Street")
    // - feature.properties.address: sometimes contains the street number
    
    const streetName = feature.text || properties.street || '';
    let streetNumber = properties.address || properties.housenumber || '';
    
    
    if (feature.place_name && !streetNumber) {
        const firstPart = feature.place_name.split(',')[0]?.trim() || '';
    
        const numberMatch = firstPart.match(/^(\d+[A-Za-z]?)\s/);
        if (numberMatch) {
            streetNumber = numberMatch[1];
        } else {
            // If no number found, use the entire first part as address
            // This handles cases where place_name has the full address
            address = firstPart;
        }
    }
    
    // Combine street number and street name
    if (streetNumber && streetName && !address) {
        address = `${streetNumber} ${streetName}`.trim();
    } else if (streetName && !address) {
        address = streetName;
    } else if (streetNumber && !address) {
        address = streetNumber;
    }
    
    // Final fallback: use first part of place_name
    if (!address && feature.place_name) {
        const parts = feature.place_name.split(',');
        address = parts[0]?.trim() || '';
    }

    // Parse context array for city, state, zipCode
    context.forEach(item => {
        const id = item.id;
        if (id.startsWith('place')) {
            
            city = item.text || city;
        } else if (id.startsWith('region')) {
            
            state = item.text || state;
        } else if (id.startsWith('postcode')) {
            
            zipCode = item.text || zipCode;
        } else if (id.startsWith('district') && !city) {
            // Sometimes district is used for city
            city = item.text || city;
        } else if (id.startsWith('neighborhood') || id.startsWith('locality')) {
            venue_district = item.text || venue_district;
        }
    });

    // Fallback: try to parse from place_name if context didn't provide values
    if (feature.place_name && (!city || !state || !zipCode)) {
        const parts = feature.place_name.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            city = city || parts[parts.length - 3] || '';
            state = state || parts[parts.length - 2] || '';
            zipCode = zipCode || parts[parts.length - 1] || '';
        }
    }

    // If neighborhood/locality unavailable, default venue_district to city
    if (!venue_district && city) {
        venue_district = city;
    }

    return {
        address: address || feature.place_name || '',
        city: city || '',
        state: state || '',
        zipCode: zipCode || '',
        coordinates: coordinates || [0, 0],
        fullAddress: feature.place_name || '',
        venue_district: venue_district || ''
    };
};

const selectAddress = (suggestion) => {
    const addressData = parseAddressComponents(suggestion);
    
    searchQuery.value = addressData.fullAddress || suggestion.place_name;
    emit('update:modelValue', searchQuery.value);
    emit('address-selected', addressData);
    
    showSuggestions.value = false;
    suggestions.value = [];
};

const handleBlur = () => {
    // Delay hiding suggestions to allow click events to fire
    setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
};
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
.address-autocomplete {
    position: relative;
}

.autocomplete-wrapper {
    position: relative;
    width: 100%;
}

.suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid $grey_80;
    border-radius: $border-radius;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 4px;
}

.suggestion-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid $grey_80;
    transition: background-color 0.2s;

    &:hover {
        background-color: $grey_80;
    }

    &:last-child {
        border-bottom: none;
    }
}

.suggestion-main {
    font-weight: $medium;
    color: $black;
    margin-bottom: 4px;
    font-size: $paragraph;
}

.suggestion-details {
    font-size: $small;
    color: $grey_80;
}
</style>
