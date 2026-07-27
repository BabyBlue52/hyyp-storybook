<template>
    <button
        type="button"
        class="secondary-btn"
        :class="[disabled ? 'disabled' : '']"
        :disabled="disabled"
        @click="onClick"
    >
        <span>{{ text }}</span>
        <v-icon v-if="icon" :class="['mdi', iconName]" />
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    text: String,
    icon: String,
    disabled: Boolean,
})

const emit = defineEmits(['click'])

const iconName = computed(() => {
    if (!props.icon) return ''
    return props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`
})

function onClick(event) {
    if (props.disabled) return
    emit('click', event)
}
</script>
<style lang="scss" scoped>
@use "sass:color";
 
</style>
