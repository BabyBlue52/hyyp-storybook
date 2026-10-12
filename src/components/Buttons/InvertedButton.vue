<template>
    <button :class="[enabled ? 'inverted-btn' : 'disabled']"  @click="onClick()">
        <p>{{title}}</p>
    </button>
</template>

<script>
    export default {
        name: 'InvertedButton',
        props: {
            title: String,
            enabled: Boolean
        },
        methods: {
            onClick() {
                console.log('clicked');
            }

        }
    }
    
</script>
<style scoped>
    button.inverted-btn {
        width: 200px;
        max-width: 200px;
        height: 40px;
        border-radius: 5px;
        background-color: transparent;
        border: 2px solid #37515F;
        color: #37515F;
    }

    button.inverted-btn:active {
        transform: scale(0.95);
    }
    
    p {
        font-family: 'Poppins', sans-serif;
        line-height: 1rem;
        color: inherit
    }
</style>
