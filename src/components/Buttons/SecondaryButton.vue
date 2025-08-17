<template>
    <button :class="[disabled ? 'disabled' : 'secondary-btn']">
        <p>{{title}}</p>
    </button>
</template>

<script>
    export default {
        name: 'SecondaryButton',
        props: {
            title: String,
            disabled: Boolean
        },
    }
    
</script>
<style lang="scss" scoped>
.secondary-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: lighten(#ccc, 10);
    padding: 10px 30px;
    max-height: 30px;
    margin-right: 10px;
    transition: ease-in-out all 300ms;
    p {
        font-size: .75rem;
    }
    &:hover, &:active {
        background:#52798e;
        color: white;
        transition: ease-in-out all 300ms;
    }
}
</style>