<template>
    <button :class="[disabled ? 'disabled' : 'secondary-btn']">
        <span>{{text}}</span>
    </button>
</template>

<script>
    export default {
        name: 'SecondaryButton',
        props: {
            text: String,
            disabled: Boolean
        },
    }
    
</script>
<style lang="scss" scoped>
@use "sass:color";
 
</style>