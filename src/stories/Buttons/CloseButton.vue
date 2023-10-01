<template>
    <button class="close-btn" @mouseenter="arrowSlide" @mouseleave="reset">
        <div>
            <v-icon icon="mdi-close" color="#37515F" size="20px"></v-icon>
        </div>
        
    </button>
</template>

<script>
    export default {
        name: 'CloseButton',
        props: {

        },
        methods: {
            onClick() {
                console.log('clicked');
            },
        }
    }    
</script>

<style scoped lang="scss" >
    button.close-btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        min-width: max-content;
        padding: 2px;
        border: none;
        background: none;
        color: #37515F;
        fill: #37515F;
        &:hover {
            background: #f0f0f0;
        }
    }
    span {
        position:relative;
        padding-left: 5px;
        padding-right: 5px;
        font-weight: bold;
        user-select: none;
    }
    
</style>