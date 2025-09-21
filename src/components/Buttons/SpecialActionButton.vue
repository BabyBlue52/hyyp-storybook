<template>
    <button class="spac-btn">
            <div v-if="hasIcon === true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/></svg>
            </div>
            <span>{{ text }}</span>
        </button>
</template>

<script>
export default {
    name: 'SpecialActionButton',
    props: {
        text: {
            type: String,
            default: "Add New"
        },
        hasIcon: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
button.spac-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(199, 86, 184);
    background: linear-gradient(60deg, rgba(199, 86, 184, 1), rgba(253, 103, 103, 1));
    color: white;
    height: 28px;
    width: max-content;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    font-weight: bold;
    text-transform: capitalize;
}

svg {
    position: relative;
    top: 2px;
    bottom: 2px;
    height: 20px;
    width: 20px;
    margin-right: 5px;
}

span {
    white-space: nowrap;
    font-size: 0.9rem;
}
</style>