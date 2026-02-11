<template>
    <div class="city-dropdown" ref="rootRef">
        <button
            type="button"
            class="city-dropdown__trigger"
            :class="{ 'city-dropdown__trigger--open': isOpen }"
            @click="toggle"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
            aria-label="Select city"
        >
            <span class="city-dropdown__value">{{ modelValue || placeholder }}</span>
            <v-icon icon="mdi-chevron-down" :class="{ 'flipped': isOpen }"color="#999"></v-icon>
        </button>
        <Transition name="dropdown">
            <ul
                v-show="isOpen"
                class="city-dropdown__list"
                role="listbox"
                @mousedown.prevent
            >
            <!-- Rework logic to account for city not found -->
                <li
                    v-if="item !== 'Use Current location'"
                    v-for="item in items"
                    :key="item"
                    class="city-dropdown__item"
                    role="option"
                    :aria-selected="modelValue === item"
                    @click="select(item)"
                >
                    <v-icon v-if="item !== 'Use Current location'" icon="mdi-city" color="#37515F"></v-icon>
                    <p v-if="item !== 'Use Current location'">{{ item }}</p>
                    <small v-else>Use Current Location</small>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: { type: String, default: '' },
    items: { type: Array, required: true },
    placeholder: { type: String, default: 'Select city' },
    locationOption: { type: String, default: 'Use Current Location' },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const rootRef = ref(null);

function toggle() {
    isOpen.value = !isOpen.value;
}

function select(value) {
    emit('update:modelValue', value);
    isOpen.value = false;
}

function onOutsideClick(e) {
    if (rootRef.value && !rootRef.value.contains(e.target)) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', onOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', onOutsideClick);
});
</script>

<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;

.city-dropdown {
    position: relative;
    top: -1px;
    flex: 1;
}

.city-dropdown__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 32px;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    font-size: 0.85rem;
    color: $black;
    cursor: pointer;
    text-align: left;
    span {
        opacity: 0.5;
        font-size: $small;
    }
    &:focus {
        outline: none;
        border-bottom-color: $black;
    }
}

.city-dropdown__value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.city-dropdown__chevron {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-left: 4px;
    fill: currentColor;
    transition: transform 0.2s;
}

.city-dropdown__trigger--open .city-dropdown__chevron {
    transform: rotate(180deg);
}

.city-dropdown__list {
    position: absolute;
    top: calc(100% + 5px);
    left: -50px;
    right: 0;
    z-index: 10;
    width: 200px;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-height: 300px;
    overflow-y: auto;
}

.city-dropdown__item {
    display: flex;
    padding: 18px 12px;
    font-size: 0.85rem;
    color: $black;
    cursor: pointer;
    font-weight: $medium;
    font-size: $paragraph;
    align-items: center;
    i {
        opacity: 0.5;
        margin-right: 10px;
    }
    p {
        position: relative;
        top: 2px;
    }
    small {
        display: flex;
        align-items: center;
        justify-content: center;
        // height: 40px;
        width: 100%;
        text-align: center;
        color:$gunMetal_20;
    }
    &:hover {
        background: $offWhite_hover;
    }
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
