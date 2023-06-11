<template>
    <button class="spac-btn"  @click="onClick()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/></svg>
        <span>Add Event</span>
    </button>
    
</template>
<script >
    
    export default {
        name: 'Special Action Button',
        
        methods: {
            onClick() {
                console.log('clicked');
            }

        }
    }    
</script>
<style scoped>
    button.spac-btn {
        display:flex;
        justify-content: center;
        background: rgb(199,86,184);
        background: linear-gradient(60deg, rgba(199,86,184,1), rgba(253,103,103,1));
        color: white;
        height: 28px;
        width: 120px;
        border:none;
        border-radius: 5px;
        padding-right: 10px;
        font-weight: bold;
    }

    svg {
        position: relative;
        top: 3px;
        height: 20px;
        width: 20px;
    }
    span {
        position: relative;
        top: 5px;
        margin-left: 5px;
        font-size: 0.8rem;
    }

</style>