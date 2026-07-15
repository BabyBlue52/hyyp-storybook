<template>
<<<<<<< HEAD
    <button
        type="button"
        class="secondary-btn"
        :class="[disabled ? 'disabled' : '']"
        :disabled="disabled"
        @click="onClick"
    >
        <span>{{ text }}</span>
=======
    <button class="secondary-btn" :class="[disabled ? 'disabled' : '']">
        <span>{{text}}</span>
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
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

<<<<<<< HEAD
const emit = defineEmits(['click'])

=======
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
const iconName = computed(() => {
    if (!props.icon) return ''
    return props.icon.startsWith('mdi-') ? props.icon : `mdi-${props.icon}`
})
<<<<<<< HEAD

function onClick(event) {
    if (props.disabled) return
    emit('click', event)
}
=======
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
</script>
<style lang="scss" scoped>
@use "sass:color";
 
</style>
