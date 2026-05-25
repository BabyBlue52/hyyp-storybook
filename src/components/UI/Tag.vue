<template>
    <button type="button" :class="isSelected ? 'tag selected' : 'tag'" @click="toggleTag">
        <p>{{ props.tag }}</p>
        <v-icon v-if="isSelected" icon="mdi-check" />
    </button>
</template>

<script setup>
const props = defineProps({
    tag: String,
    isSelected: Boolean,
});
const emit = defineEmits(['toggleTag']);
const toggleTag = () => {
    emit('toggleTag', props.tag, props.isSelected);
};


</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
.tag {
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;
    height: 32px;
    padding: 5px 5px 5px 15px;
    border-radius: $border-radius;
    background: $grey_90;
    cursor: pointer;
    &:hover {
        background: $grey_80;
    }
    p {
        position: relative;
        top: 1px;
        text-transform: capitalize;
        font-weight: 400;
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
    }
    i {
       display: none;
    }
}
.selected {
    background: rgba($success, .33);
    i {
        display: block;
        position: relative;
        right: 2px;
        bottom: 1px;
        transform: scale(0.75);
    }
    &:hover {
        background: rgba($success, .66);
    }

}
</style>