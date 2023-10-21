<template>
    <button :class="[enabled ? 'save-btn' : 'disabled']" @click="onClick">
        <span>Save</span>
    </button>
</template>

<script>
    export default {
        name: 'SaveButton',
        props: {
            enabled: Boolean
        },
        methods: {
            onClick() {
                // window.alert('Are you sure?')
            },
        }
    }    
</script>

<style scoped>
    button.save-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: 30px;
        min-width: 120px;
        padding: 5px 20px;
        border: none;
        background: #59D96C;
        color: #100409;
        line-height: 1rem;
    }
    span {
        position:relative;
        font-weight: 500;
        font-size: 14px;
        user-select: none;
    }
    button.save-btn:hover {
        background: #2AB73F;
    }

    button.disabled {
        height: 30px;
        min-width: 120px;
        padding: 5px 20px;
        border-radius: 5px;
        background-color: #c8c8c8;;
        border: 2px solid transparent;
        color: #666;
    }
</style>