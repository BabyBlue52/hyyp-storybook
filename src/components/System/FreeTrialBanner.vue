<template>
    <div class="trial-banner" role="status">
        <p>{{ headline }}</p>
        <p>This account locks when the trial ends.</p>
        <RouterLink to="/account/subscription">Manage subscription</RouterLink>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    daysLeft: {
        type: Number,
        required: true,
    },
})

const headline = computed(() => {
    if (props.daysLeft === 1) return '1 day left in your free trial.'
    return `${props.daysLeft} days left in your free trial.`
})
</script>

<style scoped lang="scss">
@use '@/assets/variables.scss' as *;

.trial-banner {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 8px 16px;
    width: 100%;
    padding: 10px 16px;
    background: $gunMetal;
    color: white;
    text-align: center;
    font-weight: $heavy;
    p {
        margin: 0;
        color: white;
        font-size: $small;
    }

    a {
        color: white;
        font-size: $small;
        font-weight: $heavy;
        text-decoration: underline;
    }
}
</style>
