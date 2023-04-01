<template>
    <button class="close-btn" @mouseenter="arrowSlide" @mouseleave="reset">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>
        </div>
        <span>Close</span>
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

<style scoped>
    button.close-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        min-width: 80px;
        border: none;
        background: none;
        color: #37515F;
        fill: #37515F;
    }
    button.close-btn:hover {
        background: #f0f0f0;
    }
    span {
        position:relative;
        /* top: 5px; */
        padding-left: 5px;
        padding-right: 5px;
        font-weight: bold;
        user-select: none;
    }
    svg {
        position:relative;
        width: 24px;
        height: 24px;
        margin-right: 2px;
        stroke-width: 2px;
        transform: scale(0.67);
    }
</style>