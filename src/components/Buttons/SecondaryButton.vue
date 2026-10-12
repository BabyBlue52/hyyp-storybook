<template>
    <button
        type="button"
        class="secondary-btn"
        :class="{ disabled: isDisabled, loading }"
        :disabled="isDisabled"
        :aria-busy="loading"
        @click="onClick"
    >
        <LoadingSpinner v-if="loading" :size="14" />
        <span>{{ text }}</span>
        <v-icon v-if="icon && !loading" :class="['mdi', iconName]" />
    </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const props = defineProps({
    text: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean,
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => Boolean(props.disabled || props.loading))

const iconName = computed(() => {
    if (!props.icon) return ''
    return props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`
})

function onClick(event) {
    if (isDisabled.value) return
    emit('click', event)
}
</script>
<style lang="scss" scoped>
@use "sass:color";
</style>
