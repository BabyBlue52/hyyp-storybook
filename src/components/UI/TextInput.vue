<template>
    <div class="hyyp-input">
        <div class="d-flex column">
            <label>{{ label }}</label>
            <v-text-field
                :model-value="modelValue"
                @update:model-value="onValueUpdate"
                :type="type"
                :placeholder="placeholder"
                :maxlength="maxlength != null ? maxlength : undefined"
                @blur="$emit('blur')"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TextInput',
    props: {
        modelValue: [String, Number],
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: Number,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Enter your text here...'
        }
    },
    emits: ['update:modelValue', 'blur'],
    setup(props, { emit }) {
        // Vuetify 3 emits update:modelValue with the value (string) as payload, not a native event
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
input {
    position: relative;
    border: 1px solid $grey_20;
    border-radius: 5px;
    height: max-content;
    min-width: 200px;
    padding: 5px 10px;
    padding-top: 20px;
    margin: 5px;
    background-color: white;
    font-size: $paragraph;
}

.v-field__input {
    outline: 1px solid $grey_20;
    background: white;
    max-height: 1rem;
    padding: 0 !important;
    margin: 5px;
    margin-bottom: 10px;
    min-width: 100%;
   
}

.v-field--variant-filled .v-field__overlay {
    background: none;
}

label {
    width: max-content;
    padding: 1px 5px;
    background: white;
    font-size: $label;
    text-align: left;
    text-transform: capitalize;
    color: $grey_20;
}

.icon {
    margin-right: 10px;
    transform: scale(0.85);
    fill: $grey_40;
}

.icon>svg,
.icon>svg>path {
    fill: inherit
}

.column {
    width: 100%;
}
</style>