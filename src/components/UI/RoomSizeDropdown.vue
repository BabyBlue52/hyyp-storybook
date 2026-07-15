<template>
    <div class="position-relative" ref="rootRef">
        <div class="dropdown" @click.prevent="toggleDropdown">
            <label v-if="label">{{ label }}</label>
            <p>{{ displayLabel }}</p>
            <v-icon icon="mdi-chevron-down" :class="{ 'flipped': isOpen }" color="#999"></v-icon>
        </div>
        <Transition name="dropdown">
            <div v-show="isOpen" class="dropdown-menu">
                <div
                    v-for="option in options"
                    :key="option.value"
                    class="dropdown-item"
                    @click="selectOption(option)"
                >
                    <p>{{ option.label }}</p>
                    <small>{{ option.description }}</small>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import roomSizeOptions from '@/composables/roomSizeLibrary.json';

export type RoomSizeOption = { value: string; label: string; description: string };

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        label?: string;
        invalid?: boolean;
        options?: RoomSizeOption[];
    }>(),
    { modelValue: '', label: 'Room Size' }
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const options = computed(() =>
  props.options?.length ? props.options : roomSizeOptions
)

const isOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const selectedOption = computed(() =>
  options.value.find((o) => o.value === props.modelValue)
)

const displayLabel = computed(() =>
    selectedOption.value ? selectedOption.value.label : 'Select Room Size'
);

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectOption(option: RoomSizeOption) {
    emit('update:modelValue', option.value);
    isOpen.value = false;
}

function onDocumentClick(e: MouseEvent) {
    if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick);
});
onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick);
});
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;

label {
    font-size: $label;
    background: white;
    position: absolute;
    top: -8px;
    left: 4px;
    padding: 0 8px;
}
.dropdown--error {
    border: 1px solid $error;
}
</style>
