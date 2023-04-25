<template>
    <!-- Work into Group Component -->
    <div class="d-flex column" style="max-width:500px">
        <label>{{ label }}</label>
        <v-textarea variant="outlined"></v-textarea>
    </div>

</template>
<script>
    export default {
        name: 'TextArea',
        props: {
            label: String,
            hasIcon: Boolean,
        },
        data() {
        
        }
    }
</script>
<style scoped>
    textarea {
        position: relative;
        /* border: 1px solid #666666; */
        border-radius: 5px;
        /* outline: 1px solid #666; */
        width: 100%;
        max-width: 500px;
        padding: 5px 10px;
        padding-top: 20px;
        background-color: white;  
        font-size: .9rem;
    }
    .v-field--variant-filled .v-field__overlay {
        background: none;
    }
    label {
        position: relative;
        z-index: 2;
        top: 10px;
        left: 8px;
        width: max-content;
        padding: 1px 5px;
        background: white;
        font-size: 0.67rem;
        text-align: left;
        text-transform: capitalize;
    }
    .icon {
        margin-right: 10px;
        transform: scale(0.85);
        fill: #999;
    }
    .icon > svg,
    .icon > svg > path{
        fill: inherit
    }
</style>