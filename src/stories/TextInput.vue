<template>
    <!-- Work into Group Component -->
    <div class="hyyp-input-sm row">
    <div v-if="hasIcon" class="icon">
        <v-icon :icon= 'icon' ></v-icon>
    </div>
    <div class="d-flex column" style="margin: 0px 10px;">
        <label>{{ label }}</label>
        <v-text-field :disabled="disabled" :placeholder="placeholder"
        ></v-text-field>
    </div>
</div>
</template>
<script>
    export default {
        name: 'TextInput',
        props: {
            label: String,
            hasIcon: Boolean,
            disabled: Boolean,
            placeholder: String
        },
        data() {
        
        }
    }
</script>
<style scoped>
    input {
        position: relative;
        border: 1px solid #666666;
        border-radius: 5px;
        height: max-content;
        min-width: 200px;
        padding: 5px 10px;
        padding-top: 20px;
        background-color: white;  
        font-size: .9rem;
    }
    
    .v-field__input {
        outline: 1px solid #666;
        background: white;
        max-height: 1rem;
        padding: 0 !important;
        margin: 0;
        min-width: 100%;
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