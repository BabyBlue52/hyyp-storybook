<template>
    <button :class="[disabled ? 'disabled' : 'default-btn']" >
        <p>{{text}}</p>
    </button>
</template>

<script>
    export default {
        name: 'PrimaryButton',
        props: {
            text: String,
            disabled: Boolean
        },
    }
    
</script>
<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;
    button.default-btn {
        display: flex;
        justify-content: center;
        padding: 10px 30px;
        min-width: max-content;
        width: 100%;
        max-width: 300px;
        max-height: 40px;
        margin: 0px;
        border-radius: 5px;
        background-color: #37515F;
        border: 2px solid transparent;
        color: white;
        
    }
    button.default-btn:hover {
        background: #52798E;
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
        line-height: 1.1rem;
        color: inherit;
        font-size: 0.9rem;
        font-weight: $medium;
    }
</style>
