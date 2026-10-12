<template>
    <img
        class="loading-spinner-img"
        src="@/assets/images/loading.svg"
        alt=""
        :style="{ width: sizePx, height: sizePx }"
    />
</template>
<script>
    export default {
        name: "loadingSpinner",
        props: {
            size: {
                type: [Number, String],
                default: 24,
            },
        },
        computed: {
            sizePx() {
                const n = Number(this.size);
                return `${Number.isFinite(n) ? n : 24}px`;
            },
        },
    }
</script>
<style scoped>
    img, svg {
        display: block;
        flex-shrink: 0;
        fill: #37515f;
        opacity: 0.5;
        animation: spin 750ms ease-in-out infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0);};
        100% { transform: rotate(359deg);}
    }
</style>
