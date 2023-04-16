<template>
    <button class="tag">
        <p> {{ title }}</p>
        <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
    </button>
</template>
<script>
    export default {
        name: 'Tag',
        props: {
            title: String,
        },
    }    
</script>

<style scoped>
    .tag {
        position: relative;
        display: flex;
        width: max-content;
        padding: 2px 20px;
        border-radius: 20px;
        background: rgba(228, 149, 158,0.5);
        cursor: pointer;
    }
    .tag:hover {
        background: rgba(228, 149, 158,1);
    }
    p {
        font-weight: 400;
        margin-right: 10px;
    }
    .tag:hover > p {
        font-weight: 500;
    }
    svg {
        position: absolute;
        right: 2px;
        transform: scale(0.8);
    }
</style>