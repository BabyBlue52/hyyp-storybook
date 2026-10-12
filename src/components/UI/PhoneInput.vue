<template>
    <div class="hyyp-input phone-input">
        <div class="d-flex column">
            <label v-if="label">{{ label }}</label>
            <v-text-field
                :model-value="modelValue"
                type="tel"
                :placeholder="placeholder"
                :maxlength="12"
                autocomplete="tel"
                @update:model-value="onInput"
                @blur="$emit('blur')"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

/** Format US phone as xxx-xxx-xxxx while typing. */
export function formatPhoneDisplay(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 10);
    if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return digits;
}

export const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

export default defineComponent({
    name: 'PhoneInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'xxx-xxx-xxxx',
        },
    },
    emits: ['update:modelValue', 'blur'],
    setup(props, { emit }) {
        const onInput = (value) => {
            const raw = value != null && typeof value === 'object' && value.target
                ? value.target.value
                : value;
            emit('update:modelValue', formatPhoneDisplay(raw ?? ''));
        };

        return { onInput };
    },
});
</script>
<style scoped lang="scss">
.phone-input {
    width: 100%;
}
</style>
