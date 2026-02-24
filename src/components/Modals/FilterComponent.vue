<template>
    <div v-if="isActive" class="overlay" @click="handleClick"></div>
    <div class="filters-wrapper">
    <div class="filters-button" @click="handleClick" :class="{ 'active': isActive || appliedFiltersCount > 0}"> 
        <svg version="1.1" id="Capa_1" x="0px" y="0px"  viewBox="0 0 612.006 612.006" style="enable-background:new 0 0 612.006 612.006;" xml:space="preserve">
            <g>
                <g>
                    <g>
                        <path d="M292.911,318.872H14.833C6.639,318.872,0,312.232,0,304.04c0-8.194,6.639-14.833,14.833-14.833h278.078     c8.194,0,14.833,6.639,14.833,14.833C307.744,312.232,301.105,318.872,292.911,318.872z"/>
                        <path d="M597.167,318.872H449.638c-8.193,0-14.833-6.64-14.833-14.833c0-8.194,6.64-14.833,14.833-14.833h147.529     c8.193,0,14.833,6.639,14.833,14.833C612,312.232,605.36,318.872,597.167,318.872z"/>
                        <path d="M214.545,506.712H14.833C6.639,506.712,0,500.072,0,491.88c0-8.193,6.639-14.834,14.833-14.834h199.712     c8.194,0,14.833,6.641,14.833,14.834C229.378,500.072,222.739,506.712,214.545,506.712z"/>
                        <path d="M597.167,506.712H371.266c-8.193,0-14.833-6.64-14.833-14.833c0-8.192,6.64-14.833,14.833-14.833h225.901     c8.193,0,14.833,6.641,14.833,14.833C612,500.072,605.36,506.712,597.167,506.712z"/>
                        <path d="M129.368,134.96H14.833C6.639,134.96,0,128.32,0,120.127s6.639-14.833,14.833-14.833h114.535     c8.193,0,14.833,6.639,14.833,14.833S137.562,134.96,129.368,134.96z"/>
                        <path d="M597.167,134.96H286.1c-8.194,0-14.833-6.639-14.833-14.833s6.639-14.833,14.833-14.833h311.073     c8.193,0,14.833,6.639,14.833,14.833C612,128.32,605.36,134.96,597.167,134.96z"/>
                        <path d="M175.635,181.215c-33.695,0-61.101-27.406-61.101-61.1c0-33.683,27.406-61.089,61.101-61.089     c33.683,0,61.088,27.406,61.088,61.089C236.718,153.81,209.312,181.215,175.635,181.215z M175.635,88.693     c-17.331,0-31.434,14.097-31.434,31.422c0,17.331,14.103,31.434,31.434,31.434c17.325,0,31.422-14.104,31.422-31.434     C207.052,102.791,192.954,88.693,175.635,88.693z"/>
                        <path d="M257.709,552.979c-33.695,0-61.1-27.406-61.1-61.102c0-33.688,27.405-61.095,61.1-61.095     c33.689,0,61.094,27.406,61.094,61.095C318.798,525.573,291.393,552.979,257.709,552.979z M257.709,460.45     c-17.331,0-31.434,14.099-31.434,31.43c0,17.33,14.103,31.435,31.434,31.435s31.428-14.104,31.428-31.435     C289.137,474.549,275.035,460.45,257.709,460.45z"/>
                        <path d="M339.173,365.121c-33.689,0-61.095-27.404-61.095-61.094c0-33.683,27.406-61.089,61.095-61.089     c33.688,0,61.094,27.406,61.094,61.089C400.267,337.716,372.861,365.121,339.173,365.121z M339.173,272.605     c-17.331,0-31.429,14.097-31.429,31.422c0,17.331,14.098,31.428,31.429,31.428s31.428-14.097,31.428-31.428     C370.601,286.702,356.504,272.605,339.173,272.605z"/>
                    </g>
                </g>
            </g>
        </svg>
        <p>Filters<span>({{ appliedFiltersCount }})</span></p>
    </div>
    <div class="filter-content" v-if="isActive">
        <div class="filter-header">
            <button class="close-btn" @click="handleClick" aria-label="Close filters">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#37515F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <h2>Filters</h2>
        </div>
        <hr/>
        <div class="filter-body">
            <div class="filter-item column">
                <h4 class="poppins">Rooms and Capacity</h4>
                <div class="filter-input">
                    <select class="form-select" @change="handleRoomSizeChange" :value="selectedFilters.roomSize">
                        <option value="">Select room size</option>
                        <option value="1">Small</option>
                        <option value="2">Medium</option>
                        <option value="3">Large</option>
                        <option value="4">Extra Large</option>
                    </select>
                </div>
                <div class="info-text">*
                Room size and capacity are based on the number of people that can comfortably fit in the room. These are estimates and may vary depending on the individual room's layout and amenities.
                </div>
            </div>
            <hr/>
            <div class="filter-item column">
                <h4 class="poppins">Accomodation Type</h4>
                <div class="filter-input form-checkbox">
                    <label for="hotel">
                        <input type="checkbox" id="hotel" @change="handleAccommodationTypeChange('hotel', $event)" :checked="selectedFilters.accommodationTypes.includes('hotel')">
                        Hotel
                    </label>
                </div>
                <div class="filter-input form-checkbox">
                    <label for="bar">
                        <input type="checkbox" id="bar" @change="handleAccommodationTypeChange('bar', $event)" :checked="selectedFilters.accommodationTypes.includes('bar')">
                        Restuarant/Bar
                    </label>
                </div>
                <div class="filter-input form-checkbox">
                    <label for="residence">
                        <input type="checkbox" id="residence" @change="handleAccommodationTypeChange('residence', $event)" :checked="selectedFilters.accommodationTypes.includes('residence')">
                        Residence
                    </label>
                </div>
            </div>
            <hr/>
            <div class="filter-item column">
                <h4 class="poppins">Facility Type</h4>
                <div class="filter-input form-checkbox">
                    <label for="indoor">
                        <input type="checkbox" id="indoor" @change="handleFacilityTypeChange('indoor', $event)" :checked="selectedFilters.facilityTypes.includes('indoor')">
                        Indoor
                    </label>
                </div>
                <div class="filter-input form-checkbox">
                    <label for="outdoor">
                        <input type="checkbox" id="outdoor" @change="handleFacilityTypeChange('outdoor', $event)" :checked="selectedFilters.facilityTypes.includes('outdoor')">
                        Outdoor
                    </label>
                </div>   
            </div>
            <hr/>
            <div class="filter-footer justify-end">
                <InlineButton @click="clearAllFilters" text='Clear All' />
                <Button :title="`Apply Filters (${appliedFiltersCount})`"  @click="handleClick"/>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import InlineButton from '@/components/Buttons/InlineButton.vue';
import Button from '@/components/Buttons/Button.vue';

const isActive = ref(false);

// Filter state
let selectedFilters = reactive({
    roomSize: '',
    accommodationTypes: [],
    facilityTypes: []
});

// Computed property to count applied filters
const appliedFiltersCount = computed(() => {
    let count = 0;
    
    // Count room size selection
    if (selectedFilters.roomSize) {
        count++;
    }
    
    count += selectedFilters.accommodationTypes.length;
    
    count += selectedFilters.facilityTypes.length;
    
    return count;
});

function handleClick() {
    isActive.value = !isActive.value;
}

// Handle room size change
function handleRoomSizeChange(event) {
    selectedFilters.roomSize = event.target.value;
}

// Handle accommodation type change
function handleAccommodationTypeChange(type, event) {
    if (event.target.checked) {
        selectedFilters.accommodationTypes.push(type);
    } else {
        const index = selectedFilters.accommodationTypes.indexOf(type);
        if (index > -1) {
            selectedFilters.accommodationTypes.splice(index, 1);
        }
    }
}

// Handle facility type change
function handleFacilityTypeChange(type, event) {
    if (event.target.checked) {
        selectedFilters.facilityTypes.push(type);
    } else {
        const index = selectedFilters.facilityTypes.indexOf(type);
        if (index > -1) {
            selectedFilters.facilityTypes.splice(index, 1);
        }
    }
}

// Clear all filters
function clearAllFilters() {
    selectedFilters.roomSize = '';
    selectedFilters.accommodationTypes = [];
    selectedFilters.facilityTypes = [];
}

// Prevent body scroll when filters are open
watch(isActive, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

</script>

<style lang="scss" scoped>
@use "sass:color";
    h2 {
        width:100%;
        font-family: $poppins;
        font-weight: 500;
        font-size: $paragraph;
        text-align: center;
    }
    h4{
        font-family: $poppins;
        font-weight: 500;
        font-size: $paragraph;
        text-align: left;
    }
    select.form-select {
        width: 220px;
        margin-top: 8px;
        padding: 8px 12px;
        border: 1px solid $grey_40;
        border-radius: 4px;
        font-size: $paragraph;
        background-color: white;
    }
    .filters-wrapper {
        position: relative;
    }
    .filters-button {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 100%;
        background: white;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: $smooth;
        border: 2px solid transparent;       
        &.active {
            background: gunMetal_60;
            border: 2px solid $gunMetal_20;
            p {
                color: $gunMetal_20;
            }
            svg {
                fill: $gunMetal_20;
            }
        }

        p {
            font-weight: 700;
            font-size: $small;
            padding-bottom: 1px;
            transition: $smooth;
            span {
                margin-left: 4px;
            }
        }
        svg {
            width: 16px;
            height: 16px;
            padding: 0.5px;
            transition: fill 0.2s ease;
        }
    }
    .filter-content {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 10px;
        width:600px;
        height: max-content;
        background: white;
        border-radius: 8px;
        padding: 10px 0 30px 0;
        z-index: 9;
        
        box-shadow: 0 0 10px 0 rgba($gunMetal, 0.1);
        .filter-header {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0 ;
        }
        .filter-body {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .filter-footer {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 0 20px;
            button.default-btn {
                min-width: 200px !important;
                max-width: 200px !important;
            }
            .clear-btn {
                padding: 10px 20px;
                border: 2px solid $grey_40;
                border-radius: 5px;
                background-color: white;
                color: $gunMetal;
                font-family: $poppins;
                font-size: $small;
                cursor: pointer;
                transition: $smooth;
                
                &:hover {
                    background-color: $grey_20;
                    border-color: $gunMetal;
                }
            }
        }
        .filter-item {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            padding: 5px 20px;
            margin-bottom: 20px;
            .filter-input {
                width: max-content;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                input {
                    margin-right: 10px;
                }
            }
            .form-checkbox {
                padding: 8px 0;
            }
            label {
                font-size: $paragraph;
                margin-top: 0;
                margin-left: 10px;
            }
        }
        .info-text {
            max-width: calc(100% - 40px);
            display: flex;
            justify-content: flex-start;
            font-size: $small;
            margin-top: 10px;
            padding: 5px 10px;
            background: rgba($gunMetal_60, 1);
            border-radius: $border-radius;
            color: $gunMetal;
            text-align: left;
            font-style: italic;
            line-height: 1.1rem;
        }
        button.close-btn {
            position: relative;
            top: -10px;
            left: 50px;
            svg {
                width: 20px;
                height: 20px;
                fill: $gunMetal_20;
            }
        }
    }
    
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba($black, 0.25);
        z-index: 8;
        cursor: pointer;
    }
</style>