<template>
    <button :class="[disabled ? 'disabled' : 'default-btn']"  @click="onClick()">
        <p>{{title}}</p>
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            title: String,
            disabled: Boolean
        },
        methods: {
            onClick() {
                console.log('clicked');
            }

        }
    }
    
</script>
<style>
    button.default-btn {
        width: 200px;
        max-width: 200px;
        height: 48px;
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
        line-height: 1rem;
        color: inherit;
    }
</style>
