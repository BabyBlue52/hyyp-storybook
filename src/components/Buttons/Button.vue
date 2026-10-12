<template>
    <button
        class="default-btn"
        :class="{ disabled: isDisabled, loading }"
        :disabled="isDisabled"
        :aria-busy="loading"
    >
        <LoadingSpinner v-if="loading" :size="14" />
        <slot>{{ text }}</slot>
    </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

defineOptions({
    name: 'PrimaryButton'
});

const props = defineProps({
    text: String,
    disabled: Boolean,
    loading: Boolean,
});

const isDisabled = computed(() => Boolean(props.disabled || props.loading))
</script>
<style lang="scss" scoped>
@use "sass:color";

.default-btn {
    gap: 8px;
}
</style>
