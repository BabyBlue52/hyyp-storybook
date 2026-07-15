<template>
    <img src="@/assets/images/loading.svg" />
</template>
<script>
    export default {
        name: "loadingSpinner",
    }
</script>
<style scoped>
    img, svg {
        height: 30px;
        width: 30px;
        fill: #37515f;
        opacity: 0.33;
        animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0);};
        100% { transform: rotate(359deg);}
    }
</style>