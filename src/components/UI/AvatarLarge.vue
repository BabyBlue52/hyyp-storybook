<template>
    <button class="user-icon">
        <span v-if="showInitials" class=" noSelect">{{ displayInitials }}</span>
        <img v-else :src="displaySrc" :alt="displayInitials" @error="imageLoadFailed = true"/>
    </button>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
            userInitials: {
                type: String,
                default: "DK"
            },
    size: {
        type: String,
        default: "80"
    },
            src: {
                type: String,
                default: ""
            }
});

const imageLoadFailed = ref(false);

// Show initials when there's no valid image, or when the image failed to load
const hasValidSrc = computed(() => {
    const s = typeof props.src === 'string' ? props.src.trim() : '';
    return s.length > 0;
});

// Convert base64 string to data URL for display
const imageToBase64Url = (avatar) => {
    if (!avatar) return null;
    
    // If it's already a data URL or blob URL, return as is
    if (avatar.startsWith('data:') || avatar.startsWith('blob:')) {
        return avatar;
    }
    
    // If it's a base64 string without the data URL prefix, add it
    if (/^[A-Za-z0-9+/=]+$/.test(avatar)) {
        return `data:image/jpeg;base64,${avatar}`;
    }
    
    // If it's a regular URL, return as is
    return avatar;
};

const displaySrc = computed(() => {
    if (!hasValidSrc.value) return null;
    return imageToBase64Url(props.src.trim());
});

const showInitials = computed(() => {
    return !displaySrc.value || imageLoadFailed.value;
});

const displayInitials = computed(() => {
    return (props.userInitials || '').trim() || '?';
});

watch(() => props.src, () => {
    imageLoadFailed.value = false;
});
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
    .user-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        border: 2px solid white;
        background-color: #f0f0f0;      
    }
    .user-icon > span {
        font-size: 1.75rem;
        font-weight: $heavy;
        text-align: center;
        margin: auto 0;
        text-transform: uppercase;
        color: $grey_20;
    }   
    .user-icon > img {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        object-fit: cover;
    }
</style>