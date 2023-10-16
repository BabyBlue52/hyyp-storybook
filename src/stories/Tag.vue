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

<style scoped lang="scss">
.tag {
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;
    height: max-content;
    padding: 5px 5px 5px 15px;
    border-radius: 20px;
    background: rgba(228, 149, 158, 0.33);
    cursor: pointer;
    &:hover {
        background: rgba(228, 149, 158, 1);
        p {
            font-weight: 500;
        }
    }
    p {
        font-weight: 400;
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
    }
    svg {
        position: relative;
        right: 2px;
        bottom: 1px;
        transform: scale(0.8);
    }
}
</style>