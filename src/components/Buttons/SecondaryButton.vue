<template>
    <button class="secondary-btn" :class="[disabled ? 'disabled' : '']">
        <span>{{text}}</span>
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

const iconName = computed(() => {
    if (!props.icon) return ''
    return props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`
})
</script>
<style lang="scss" scoped>
@use "sass:color";
 
</style>