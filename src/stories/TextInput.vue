<template>
    <!-- Work into Group Component -->
    <div class="hyyp-input-sm row">
    <div v-if="hasIcon" class="icon">
        <v-icon :icon= 'icon' ></v-icon>
    </div>
    <div class="d-flex column">
        <label>{{ label }}</label>
        <v-text-field
        ></v-text-field>
    </div>
</div>
</template>
<script>
import { has } from 'lodash';

    export default {
        name: 'TextInput',
        props: {
            label: String,
            hasIcon: Boolean,
        },
        data() {
        
        }
    }
</script>
<style>
    input {
        position: relative;
        border: 1px solid #666666;
        border-radius: 5px;
        height: max-content;
        width: 100%;
        padding: 5px 10px;
        padding-top: 20px;
        background-color: white;  
    }
    .v-field__input {
        min-height: 0 !important;
        max-height: 2rem;
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