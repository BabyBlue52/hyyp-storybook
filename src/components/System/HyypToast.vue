<template>
    <Teleport to="body">
        <div v-if="visible" class="hyyp-notification">
            <div class="hyyp-notification__content error-state">
                <p>{{ message }}</p>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        default: '',
    },
})
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.hyyp-notification {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;
    padding-bottom: $headRoom;
    pointer-events: none;
    overflow: visible;
}

.hyyp-notification__content {
    width: 500px;
    max-width: calc(100% - 20px);
    pointer-events: auto;
    height: auto;
    padding: 1rem 1.5rem;

    p {
        margin: 0;
    }
}
</style>
