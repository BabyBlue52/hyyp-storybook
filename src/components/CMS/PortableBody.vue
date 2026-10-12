<template>
    <div class="portable-body">
        <PortableText v-if="value?.length" :value="value" />
    </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
    value: {
        type: Array,
        default: () => [],
    },
})
</script>

<style lang="scss" scoped>
.portable-body {
    :deep(p) {
        margin: 0 0 1rem;
        line-height: 1.6;
    }
    :deep(h2),
    :deep(h3) {
        margin: 1.75rem 0 0.75rem;
    }
    :deep(ul),
    :deep(ol) {
        margin: 0 0 1rem 1.25rem;
    }
    :deep(a) {
        text-decoration: underline;
    }
}
</style>
