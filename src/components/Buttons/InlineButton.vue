<template>
    <button :class="[disabled ? 'disabled' : 'inline-btn']"  @click="onClick()">
        <p>{{title}}</p>
    </button>
</template>

<script>
    export default {
        name: 'InlineButton',
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
    button.inline-btn {
        width: 200px;
        max-width: 200px;
        height: 48px;
        border-radius: 5px;
        background-color: white;
        border: 2px solid transparent;
        color: #37515F;
    }
    button.inline-btn:hover {
        background: #f6f6f6;
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
