<template>
    <button :class="[isActive ? 'active' :'edit-btn']" @click="$event => isActive = !isActive" v-tooltip="'Edit Mode'">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
        <div v-if="isActive == true"> 
            <v-tooltip activator="parent" location="right">Edit Mode Enabled</v-tooltip>
        </div>
        <div v-else>
            <v-tooltip activator="parent" location="right">Edit Mode</v-tooltip>
        </div>
    </button>

</template>

<script>

    export default {
        name: 'EditButton',
        props: {
            isActive: Boolean
        },
        
        emits: ['toggle-button'],
    }    
</script>

<style scoped>
    button.edit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 50%;
        background:#37515F;
    }
    button.edit-btn > svg {
        position:relative;
        top: 1px;
        width: 20px;
        height: 20px;
        stroke-width: 2px;
        fill: white;
    }
    button.active {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 50%;
        background:#E4959E;
    }
    button.active > svg {
        position:relative;
        top: 1px;
        width: 22px;
        height: 22px;
        stroke-width: 2px;
        fill: #100409;
    }
</style>