<template>
    <div v-if="isActive && !isMobile" class="overlay" @click="closeWithoutApplying">
    </div>
    <div class="filters-wrapper">
        <div class="filters-btn" @click="handleClick" :class="{ 'active': isActive || appliedCount > 0}">
            <v-icon icon="mdi-tune-variant"></v-icon>
            <p>Filters<span>({{ badgeCount }})</span></p>
        </div>
        <component
            :is="isMobile ? 'v-navigation-drawer' : 'div'"
            v-if="isActive"
            :class="{ 'filter-bottom-drawer': isMobile, 'filter-content': !isMobile }"
            v-bind="drawerBind"
        >
            <div :class="{ 'filter-content filter-content--drawer': isMobile }">
            <div class="filter-header">
                <button class="close-btn" @click="closeWithoutApplying" aria-label="Close filters">
                    <v-icon icon="mdi-close"></v-icon>
                </button>
                <h2 >Filters</h2>
                <hr class="w-100 mx-0" />
            </div>
            <div class="filter-body">
                <div class="filter-item column">
                    <h4>Room Size and Capacity
                        <v-icon icon="mdi-information-variant-circle-outline" />
                    </h4>
                    <div class="filter-input">
                        <RoomSizeDropdown v-model="draftFilters.roomSize" label="" />
                    </div>
                    <div class="info-text ">
                        <div class="icon">
                            <v-icon icon="mdi-information-variant-circle-outline"></v-icon>
                        </div>
                        <div class="message">
                            <p>Room size and capacity are based on the number of people that can comfortably fit in the room. These are estimates and may vary depending on the individual room's layout and amenities.</p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="filter-item column">
                    <h4>Accomodation Type</h4>
                    <div class="filter-input form-checkbox">
                        <label :for="idFor('hotel')">
                            <input type="checkbox" :id="idFor('hotel')" @change="handleAccommodationTypeChange('hotel', $event)" :checked="draftFilters.accommodationTypes.includes('hotel')">
                            Hotel
                        </label>
                    </div>
                    <div class="filter-input form-checkbox">
                        <label :for="idFor('bar')">
                            <input type="checkbox" :id="idFor('bar')" @change="handleAccommodationTypeChange('bar', $event)" :checked="draftFilters.accommodationTypes.includes('bar')">
                            Restaurant/Bar
                        </label>
                    </div>
                    <div class="filter-input form-checkbox">
                        <label :for="idFor('residence')">
                            <input type="checkbox" :id="idFor('residence')" @change="handleAccommodationTypeChange('residence', $event)" :checked="draftFilters.accommodationTypes.includes('residence')">
                            Residence
                        </label>
                    </div>
                </div>
                <hr/>
                <div class="filter-item column">
                    <h4 class="poppins">Facility Type</h4>
                    <div class="filter-input form-checkbox">
                        <label :for="idFor('indoor')">
                            <input type="checkbox" :id="idFor('indoor')" @change="handleFacilityTypeChange('indoor', $event)" :checked="draftFilters.facilityTypes.includes('indoor')">
                            Indoor
                        </label>
                    </div>
                    <div class="filter-input form-checkbox">
                        <label :for="idFor('outdoor')">
                            <input type="checkbox" :id="idFor('outdoor')" @change="handleFacilityTypeChange('outdoor', $event)" :checked="draftFilters.facilityTypes.includes('outdoor')">
                            Outdoor
                        </label>
                    </div>
                </div>
            </div>
            <div class="filter-footer justify-end">
                <hr class="w-100 mx-0" />
                <div class="filter-footer__actions">
                    <InlineButton @click="clearAllFilters" text='Clear All' />
                    <Button :text="`Apply Filters (${draftCount})`" @click="applyAndClose" />
                </div>
            </div>
            </div>
        </component>
    </div>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from 'vue';
import { useDisplay } from 'vuetify';
import InlineButton from '@/components/Buttons/InlineButton.vue';
import Button from '@/components/Buttons/Button.vue';
import { useVenueFilters } from '@/composables/useVenueFilters';
import RoomSizeDropdown from '../UI/RoomSizeDropdown.vue';

const isActive = ref(false);
const instanceId = Math.random().toString(36).slice(2, 8);
const idFor = (name) => `filter-${name}-${instanceId}`;
const {
    draftFilters,
    appliedCount,
    draftCount,
    isFiltersOpen,
    applyFilters,
    discardDraft,
    clearAll,
} = useVenueFilters();

const { width } = useDisplay();
const isMobile = computed(() => width.value <= 768);
const badgeCount = computed(() => (isActive.value ? draftCount.value : appliedCount.value));

const drawerBind = computed(() => {
    if (!isMobile.value) return {};
    return {
        location: 'bottom',
        temporary: true,
        height: 'auto',
        modelValue: isActive.value,
        'onUpdate:modelValue': onDrawerModelChange,
    };
});

function onDrawerModelChange(open) {
    if (open) {
        if (!isActive.value) openFilters();
        return;
    }
    if (isActive.value) closeWithoutApplying();
}

function openFilters() {
    discardDraft();
    isActive.value = true;
    isFiltersOpen.value = true;
}

function closeFilters() {
    isActive.value = false;
    isFiltersOpen.value = false;
}

function handleClick() {
    if (isActive.value) {
        closeWithoutApplying();
    } else {
        openFilters();
    }
}

function closeWithoutApplying() {
    discardDraft();
    closeFilters();
}

function applyAndClose() {
    applyFilters();
    closeFilters();
}

function toggleListValue(list, type, checked) {
    if (checked) {
        if (!list.includes(type)) list.push(type);
        return;
    }
    const index = list.indexOf(type);
    if (index > -1) list.splice(index, 1);
}

function handleAccommodationTypeChange(type, event) {
    toggleListValue(draftFilters.accommodationTypes, type, event.target.checked);
}

function handleFacilityTypeChange(type, event) {
    toggleListValue(draftFilters.facilityTypes, type, event.target.checked);
}

function clearAllFilters() {
    clearAll();
}

watch(isActive, (open) => {
    if (isMobile.value) {
        document.body.style.overflow = '';
        return;
    }
    document.body.style.overflow = open ? 'hidden' : '';
});

onUnmounted(() => {
    document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@use "sass:color";
h2 {
    width: 100%;
    font-weight: $medium;
    font-size: $paragraph;
    text-align: center;
}

h4 {
    font-weight: $medium;
    font-size: $paragraph;
    text-align: left;
    margin-bottom: 4px;
    i {
        font-weight: $medium;
        font-size: inherit;
        color: $grey_40;
    }
}

select.form-select {
    width: 220px;
    margin-top: 8px;
    padding: 8px 12px;
    border: 1px solid $grey_60;
    border-radius: 4px;
    font-size: $paragraph;
    background-color: white;
}

.filters-wrapper {
    position: relative;
    z-index: 20;
}

.filters-btn {
    display: flex;
    align-items: center;
    height: 48px;
    background: white;
    padding: 12px 20px;
    border-radius: calc($border-radius * 8);
    cursor: pointer;
    transition: $smooth;
    border: 2px solid transparent;
    &.active {
        background: gunMetal_60;
        border: 2px solid $gunMetal_20;
        p,
        i {
            color: $gunMetal_20;
        }
    }
    p {
        font-weight: $heavy;
        font-size: $small;
        padding-bottom: 1px;
        transition: $smooth;
        span {
            margin-left: 4px;
        }
    }
    i {
        transition: fill 0.2s ease;
    }
}

.filter-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 10px;
    width: 600px;
    max-width: calc(100vw - 24px);
    max-height: min(80vh, 720px);
    height: auto;
    overflow: hidden;
    background: white;
    border-radius: 8px;
    padding: 0;
    z-index: 9;
    box-shadow: 0 0 10px 0 rgba($gunMetal, 0.1);
    .filter-header {
        flex-shrink: 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0 0;
        background: white;
        z-index: 2;
        h2 {
            padding-bottom: 10px;
        }
        hr {
            flex-basis: 100%;
            margin: 0;
        }
        button.close-btn {
            top: 0;
            left: 20px;
        }
    }
    .filter-body {
        flex: 1 1 auto;
        min-height: 0;
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding: 16px 0 8px;
    }
    .filter-footer {
        flex-shrink: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        background: white;
        z-index: 2;
        padding-bottom: env(safe-area-inset-bottom);
        hr {
            margin: 0;
        }
        &__actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 12px 20px 16px;
        }
        button.default-btn {
            width: 200px !important;
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
        gap: 10px;
        margin-top: 10px;
        background: color.adjust($color: $gunMetal_60, $lightness: 5%);
        border-radius: $border-radius;
        color: $gunMetal;
        overflow: hidden;
        .icon {
            display: flex;
            justify-content: center;
            min-height: 100%;
            width: 100px;
            background: $gunMetal_60;
            i {
                margin: auto 10px;
                font-size: $header;
                color: inherit;
            }
        }
        .message {
            padding: 8px 12px 8px 4px;
            p {
                font-size: $small;
                text-align: left;
                line-height: 1.1rem;
            }
        }
    }
    button.close-btn {
        position: relative;
        top: -10px;
        left: 50px;
        height: 20px;
        width: 20px;
        ;
        i {
            width: 20px;
            height: 20px;
            color: $gunMetal_20;
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

.filter-content--drawer {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 90dvh;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
    box-shadow: none;
}

:deep(.filter-bottom-drawer) {
    width: 100% !important;
    max-height: 90dvh;
}

:deep(.filter-bottom-drawer .v-navigation-drawer__content) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 90dvh;
}

:deep(.filter-bottom-drawer.v-navigation-drawer--bottom) {
    top: auto !important;
    bottom: 0 !important;
    height: auto !important;
    max-height: 90dvh;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
}

@media screen and (max-width: 768px) {
    .filters-btn {
        height: 40px;
        border: $grey_40 1px solid;
    }
}
</style>