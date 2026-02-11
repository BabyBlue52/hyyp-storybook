<template>
    <div ref="containerRef" class="tag-container">
        <Tag
            v-for="(tag, index) in tags"
            :key="typeof tag === 'string' ? tag : tag?.id ?? index"
            :tag="typeof tag === 'string' ? tag : (tag?.name ?? String(tag))"
            :isSelected="selectedTags && selectedTags.includes(typeof tag === 'string' ? tag : (tag?.name ?? String(tag)))"
            @toggleTag="$emit('toggleTag', $event)"
            @addTag="$emit('addTag', $event)"
            @removeTag="$emit('removeTag', $event)"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Tag from './Tag.vue';

const props = defineProps({
    tags: {
        type: Array,
        required: true
    },
    selectedTags: {
        type: Array,
        default: () => []
    },
    /** Selector for elements that should not close the container when clicked (e.g. search input) */
    ignoreClickSelector: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['toggleTag', 'addTag', 'removeTag', 'close']);

const containerRef = ref(null);

function handleClickOutside(event) {
    if (!containerRef.value?.contains(event.target)) {
        if (props.ignoreClickSelector) {
            const ignore = document.querySelector(props.ignoreClickSelector);
            if (ignore?.contains(event.target)) return;
        }
        emit('close');
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
.tag-container {
    position: absolute;
    top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 410px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    box-shadow: $boxShadow;
    z-index: 10;
}
</style>