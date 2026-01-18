<template>
    <button class="delete-btn" @click="onClick">
        <span>{{ text }}</span>
    </button>
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
            text: String,
            hasIcon: Boolean,
        },
        data() {
            return {
                isHover: false
            }
        },
        methods: {
            // onClick() {
            //     window.alert('Are you sure?')
            // },
        }
    }    
</script>

<style scoped lang="scss">
    button.delete-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: 30px;
        padding: 5px 20px;
        border: 2px solid #FF4D4D;
        border-radius: 5px;
        background: none;
        color: #FF4D4D;
        line-height: 1rem;
        font-size: .9rem;
    }
    span {
        position:relative;
        font-weight: bold;
        user-select: none;
    }

</style>