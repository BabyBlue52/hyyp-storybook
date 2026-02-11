<template>
    <form class="search-wrapper column " @submit.prevent>
        <div class="row d-flex w-100">
            <div class="border">
                <div class="location">
                    <div class="icon">
                        <button type="button" @click="getCurrentLocation">
                            <v-icon icon="mdi-map-marker" color="#37515F"></v-icon>
                        </button>
                    </div>
                    <CityDropdown
                        :modelValue="location"
                        @update:modelValue="onLocationSelect"
                        :items="locationOptions"
                        placeholder="Select city"
                    />
                </div>
                <div class="search">
                    <div class="icon">
                        <v-icon icon="mdi-magnify" color="#37515F"></v-icon>
                    </div>
                    <input 
                        type="text" 
                        :placeholder="placeholder" 
                        @input="handleInput" 
                        v-model="searchQuery" 
                      
                        disabled
                    />
                    <div class="search-input-overlay" @click="toggleSearch"></div>
                    <TagContainer
                        v-if="isSearching"
                        :tags="sortedTags"
                        :selectedTags="selectedTags"
                        ignore-click-selector=".search"
                        @toggleTag="toggleTag"
                        @addTag="addTag"
                        @removeTag="removeTag"
                        @close="isSearching = false"
                    />
                </div>
            </div>
            <RouterLink to="/map">
                <Button text="Search"/>
            </RouterLink>
        </div>
    </form>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "@/components/Buttons/Button.vue";
import CityDropdown from "@/components/UI/CityDropdown.vue";
import TagContainer from "@/components/UI/TagContainer.vue";

const placeholder = 'Try searching a few must-haves i.e. bar, outdoors, etc.';
const location = ref('');
const token = import.meta.env.VITE_MAPBOX_API_KEY;
const allTagOptions = ref([
    'bar',
    'outdoors',
    'food',
    'music',
    'dancefloor',
    'theater',
    'sports',
]);
const selectedTags = ref([]);
const isSearching = ref(false);
const searchQuery = ref('');

// Cities you control – no Mapbox API on keystroke; edit this list as needed
const cities = [
    'Austin',
    'Los Angeles',
    'Pflugerville',
    'Cincinnati',
    'New York',
    'San Francisco',
    'Chicago',
    'Houston',
    'Miami',
];
// computed means we don't need to re-render the component when the cities array changes
const locationOptions = computed(() => ['Use Current location', ...cities]);

function onLocationSelect(value) {
    if (value === 'Use Current location') {
        getCurrentLocation();
    } else {
        location.value = value;
    }
}

const getCurrentLocation = (event) => {
    if (event) event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
};

const showPosition = async (position) => {
    const { latitude, longitude } = position.coords;
    // Mapbox used only here (once per click), not on every keystroke
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}&limit=1`
        );
        const data = await response.json();
        const features = data.features || [];
        if (features.length === 0) return;
        // Get the city from the features
        const placeCtx = features[0].context?.find((item) => item.id.startsWith('place'));
        const city = placeCtx ? placeCtx.text : features[0].place_name?.split(',')[0]?.trim();
        if (!city) return;
        // Check if the city is in the list of cities
        const inList = cities.some((c) => c.toLowerCase() === city.toLowerCase());
        location.value = inList ? cities.find((c) => c.toLowerCase() === city.toLowerCase()) : 'City not found';
    } catch (error) {
        console.error('Error fetching location:', error);
    }
};

// Search tag container functionality
const sortedTags = computed(() => [...allTagOptions.value].sort());

const toggleSearch = () => {
    isSearching.value = !isSearching.value;
};
const handleInput = (event) => {
    searchQuery.value = event.target.value;
    if (searchQuery.value.length > 0) {
        isSearching.value = true;
    } else {
        isSearching.value = false;
    }
};

/* Handling tags adding, removing */
function updateInputReadout() {
    searchQuery.value = selectedTags.value.join(', ');
}

function toggleTag(tag) {
    const idx = selectedTags.value.indexOf(tag);
    if (idx === -1) {
        selectedTags.value = [...selectedTags.value, tag];
    } else {
        selectedTags.value = selectedTags.value.filter((t) => t !== tag);
    }
    updateInputReadout();
}

function addTag(tag) {
    if (!selectedTags.value.includes(tag)) {
        selectedTags.value = [...selectedTags.value, tag];
        updateInputReadout();
    }
}

function removeTag(tag) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
}
</script>
<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;
form.search-wrapper {
    display: flex;
    position: relative;
    width: max-content;
    max-width: 800px;
    height: max-content;
    padding: 0px 10px;
    background: white;
    border-radius: $border-radius;
    .border {
        display: flex;
        margin-right: 10px;
        border: 1px solid #999999;
        border-radius: 5px;
        padding-top: 5px;
        height: 40px;
    }
    .location {
        display: flex;
        align-items: center;
        width: 200px;
        margin: 5px 0;
        padding: 0 10px;
        border-right: 1px solid $grey_20;
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            width: 32px;
            position: relative;
            bottom: 2px;
            margin-right: 10px;
            opacity: 0.33;
            &:hover {
                opacity: 1;
            }
        }
        input {
            position: relative;
            top: -2px;
            width: 100%;
            border: none !important;
            border-bottom: 1px solid #100409;
            outline: none;
            margin: 0 !important;
            font-size: $small;
            color: $grey_80;
            &:focus-within,
            &:focus-visible {
                border-bottom: 1px solid #100409;
            }
            &:placeholder-shown {
                color: $grey_80;
                font-size: $small;
            }
        }
    }
    .search {
        @extend .location;
        width: 400px;
        border: none;
        .icon {
            opacity: 0.33;
            &:hover {
                opacity: .33;
            }
        }
    }
    .search-input-overlay {
        position: absolute;
        top: 9px;
        left: 215px;
        width: 100%;
        max-width: calc(50% + 20px);
        height: calc(100% - 18px);
        background: rgba(0,0,0,0);
        cursor: pointer;
    }
}
</style>