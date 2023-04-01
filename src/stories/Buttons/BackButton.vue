<template>
    <button class="back-btn" @mouseenter="arrowSlide" @mouseleave="reset">
        <div :class="[isHover ? 'slide' : 'static']">
            <svg  xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
        </div>
        <span>{{ title }}</span>
    </button>
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
            title: String,
        },
        data() {
            return {
                isHover: false
            }
        },
        methods: {
            onClick() {
                console.log('clicked');
            },
            arrowSlide() {
                this.isHover = true;
            },
            reset() {
                this.isHover = false;
            },
        }
    }    
</script>

<style scoped>
    button.back-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        min-width: 80px;
        height: 40px;
        border: none;
        background: none;
        color: #37515F;
        fill: #37515F;
    }
    span {
        position:relative;
        top: 2.5px;
        padding-left: 5px;
        font-weight: bold;
        user-select: none;
    }
    div.static {
        position:relative;
        animation: static .82s ease-in-out both;
        right: 0px;
    }   
    svg {
        position:relative;
        top: 2px;
        width: 24px;
        height: 18px;
        margin-right: 5px;
        stroke-width: 2px;
        transform: scale(0.8);
    }
    div.slide {
        position: relative;
        animation: slide .82s ease-in-out both;
    }
    @keyframes slide {
        from { right: 0px;}
        to { right: 10px;}
    }
    @keyframes static {
        from { right: 10px;}
        to { right: 0px;}
    }

</style>