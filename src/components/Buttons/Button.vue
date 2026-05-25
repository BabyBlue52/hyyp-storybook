<template>
    <button :class="[disabled ? 'disabled' : 'default-btn']" :disabled="disabled">
        <p>{{text}}</p>
    </button>
</template>

<script setup>
    defineOptions({
        name: 'PrimaryButton'
    });
    defineProps({
        text: String,
        disabled: Boolean
    });
    
</script>
<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;
    button.default-btn {
        display: flex;
        justify-content: center;
        padding: 7.5px 30px;
        min-width: max-content;
        width: 100%;
        cursor: pointer;
        height: 40px;
        border-radius: 5px;
        background-color: $gunMetal;
        border: 2px solid transparent;
        color: white;
        &:hover {
            background: $gunMetal_20;
        }
        p {
            font-family: 'Poppins', sans-serif;
            color: inherit;
            font-size: 0.9rem;
            font-weight: $medium;
        }
    }
   
    /* Disabled */
    button.disabled {
        @extend .default-btn;
        background-color: $grey_80;
        border: 2px solid transparent;
        color: $grey;
        opacity: 0.33;
        cursor: not-allowed;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        &:hover {
            background: $grey_80;
        }
        &:active {
            transform: scale(1);
        }
    }
   
</style>
