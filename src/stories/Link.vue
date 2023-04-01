<template>
    <div class="link" @mouseenter="retreat" @mouseleave="reset">
        <a>{{ text }}</a>
        <div :class="[isHover ? 'retreat' : 'static']"></div>
    </div>
</template>

<script>
    export default {
        title: 'hyypLink',
        props: {
            text: String,
        },
        data() {
            return {
                isHover: false
            }
        },
        methods: {
            retreat() {
                this.isHover = true;
            },
            reset() {
                this.isHover = false;
            },
        }
    }
</script>

<style scoped>
    .link {
        display: flex;
        flex-direction: column;
        width: max-content;
        height: max-content;
        margin: 0 10px;
        overflow: hidden;
        display: block;
    }
    .link:focus {
        transform: scale(0.95);
    }
    div.static {
        position: relative;
        height: 2px;
        background: #E4959E;
        animation: static .7s ease-in-out both;
        transform: scaleX(-1);
        width: 100%;
    }
    div.retreat {
        transform: scaleX(-1);
        position: relative;
        height: 2px;
        background: #E4959E;
        animation: retreat .7s ease-in-out both;
    }
    @keyframes retreat {
        from { left: 0;}
        to { left: 100%;}
    }
    @keyframes static {
        from { left: 100%;}
        to { left: 0;}
    }
</style>