<template>
    <div>
        <img src="https://img.icons8.com/?size=100&id=5gQEqHavGCc4&format=png&color=000000"/>
    </div>
</template>
<script>
    export default {
        name: "loadingSpinner",
    }
</script>
<style scoped>
    img {
        height: 60px;
        width: 60px;
        animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0);};
        100% { transform: rotate(359);}
    }
</style>