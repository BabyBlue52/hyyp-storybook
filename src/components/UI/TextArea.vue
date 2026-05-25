<template>
    <div class="d-flex column" style="margin: 0">
        <label>{{ label }}</label>
        <v-textarea
            variant="outlined"
            :model-value="modelValue"
            @update:model-value="onValueUpdate"
            :placeholder="placeholder"
            @blur="$emit('blur')"
        />
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TextArea',
    props: {
        hasIcon: Boolean,
        placeholder: {
            type: String,
            default: 'Enter your text here...'
        },
        modelValue: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        label: String
    },
    emits: ['update:modelValue', 'blur'],
    setup(props, { emit }) {
        // Vuetify 3 emits update:modelValue with the value as payload, not a native event
        const onValueUpdate = (value) => {
            const next = value != null && typeof value === 'object' && value.target
                ? value.target.value
                : value;
            emit('update:modelValue', next ?? '');
        };
        return {
            onValueUpdate
        };
    }
});
</script>
<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
    textarea {
        position: relative;
        border-radius: 5px;
        width: 100%;
        max-width: 500px;
        padding: 5px 10px;
        padding-top: 20px;
        background-color: white;
    }
    .v-field--variant-filled .v-field__overlay {
        background: none;
    }
    label {
        position: relative;
        z-index: 2;
        top: 14px;
        left: 8px;
        width: max-content;
        padding: 1px 5px;
        background: white;
        font-size:$label;
        text-align: left;
        text-transform: capitalize;
        color: $grey_20;
    }
    .icon {
        margin-right: 10px;
        transform: scale(0.85);
        fill: $grey_40;
    }
    .icon > svg,
    .icon > svg > path{
        fill: inherit
    }
</style>