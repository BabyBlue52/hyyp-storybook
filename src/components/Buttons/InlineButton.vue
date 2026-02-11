<template>
    <button :class="[disabled ? 'disabled' : 'inline-btn']" >
        <p>{{text}}</p>
    </button>
</template>

<script>
    export default {
        name: 'InlineButton',
        props: {
            text: String,
            disabled: Boolean
        },
        
    }
    
</script>
<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;
    button.inline-btn {
        display: flex;
        justify-content: center;
        padding: 10px 30px;
        min-width: max-content;
        width: 100%;
        max-width: max-content;
        max-height: 40px;
        border-radius: 5px;
        background-color: white;
        border: 2px solid transparent;
        color: #37515F;
    }
    button.inline-btn:hover {
        transition: $smooth;
        background: rgba($black, 0.15);
    }
    /* Disabled */
    button.disabled {
        width: 200px;
        max-width: 200px;
        height: 48px;
        border-radius: 5px;
        background-color: #c8c8c8;;
        border: 2px solid transparent;
        color: #666;
    }
    p {
        font-family: 'Poppins', sans-serif;
        line-height: 1rem;
        color: inherit;
        font-size: $paragraph;
        white-space: nowrap;
    }
</style>
