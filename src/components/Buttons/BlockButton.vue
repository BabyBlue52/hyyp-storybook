<template>
    <button :class="[blocked?'block-btn':'check-btn', {disabled: disabled}]"  :disabled="disabled"  @click="emit('toggle')">
        <v-icon v-if="blocked" icon="mdi-cancel"></v-icon>
        <v-icon v-else icon="mdi-check"></v-icon>
        <p>{{ text }}</p>
    </button>
</template>
<script setup>
    // import { ref } from 'vue'; 
    const props = defineProps({
        text: String,
        disabled: Boolean,
        blocked: Boolean,
    })
    const emit = defineEmits(['toggle'])

</script>
<style lang="scss" scoped>
    button {
        display: flex;
        gap: 4px;
        padding: 5px 8px;
        i {
            font-size: .9rem;
            margin:0;
        }
        p {
            font-weight:$medium;
        }
        &.block-btn {
            background: $black;
            color: $offWhite;
        }
        &.check-btn {
            background: transparent;
            color: $black;
        }
    }

</style>