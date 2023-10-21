<template>
    <div class="link" @mouseenter="retreat" @mouseleave="reset">
        <a v-bind:href="url">{{ text }}</a>
        <div :class="[isHover ? 'retreat' : 'static']"></div>
    </div>
</template>

<script>
    export default {
        title: 'hyypLink',
        props: {
            text: String,
            url: String
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
        flex-direction: column;
        width: max-content;
        height: max-content;
        margin: 0 10px;
        overflow: hidden;
        display: inline-flex;
        font-weight: 600;
        text-transform: capitalize;
    }
    .link:focus {
        transform: scale(0.95);
    }
    div.static {
        position: relative;
        height: 2px;
        background: #E4959E;
        animation: static .35s ease-in-out both;
        width: 100%;
    }
    div.retreat {
        position: relative;
        height: 2px;
        background: #E4959E;
        animation: retreat .35s ease-in-out both;
        width: 100%;
    }
    @keyframes retreat {
        from { opacity: 100%;}
        to { opacity: 0%;}
    }
    @keyframes static {
        from { opacity: 0%;}
        to { opacity: 100%;}
    }
</style>