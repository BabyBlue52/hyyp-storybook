<template>
    <div class="search-bar">
        <input v-model="searchQuery" class="venue-search-input" type="text" :placeholder="placeholder" @input="search" />
        <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Refine List by typing...'
    }
});

const searchQuery = ref('');

const search = (e) => {
    searchQuery.value = e.target.value;
    emit('search', searchQuery.value);
}
</script>
<style scoped lang="scss">
    @use '../../assets/components/search.scss' as *;
</style>