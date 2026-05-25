<template>
    <button class="user-icon" v-bind="$attrs">
        <span v-if="showInitials" class="noSelect">{{ displayInitials }}</span>
        <img v-else :src="displaySrc" :alt="displayInitials" @error="imageLoadFailed = true" />
    </button>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: null
    },
    userInitials: {
        type: String,
        default: ""
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

// Full name from user (fullName or firstName + lastName)
const userFullName = computed(() => {
    const u = props.user;
    if (!u) return '';
    return (u.fullName || [u.firstName, u.lastName].filter(Boolean).join(' ')).trim() || '';
});

// Initials from user.fullName when user is passed, else from userInitials prop
const computedInitials = computed(() => {
    const fullName = userFullName.value;
    if (fullName) {
        const parts = fullName.split(/\s+/).filter(Boolean);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return fullName.substring(0, 2).toUpperCase();
    }
    if (props.user) return (props.user.email || props.user.username || '').substring(0, 2).toUpperCase() || '?';
    return (props.userInitials || '').trim() || '?';
});

// Prefer src prop, then user.avatar
const effectiveSrc = computed(() => props.src || (props.user?.avatar ?? ''));

// Show initials when there's no valid image, or when the image failed to load
const hasValidSrc = computed(() => {
    const s = typeof effectiveSrc.value === 'string' ? effectiveSrc.value.trim() : '';
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
    return imageToBase64Url(String(effectiveSrc.value).trim());
});

const showInitials = computed(() => {
    return !displaySrc.value || imageLoadFailed.value;
});

const displayInitials = computed(() => computedInitials.value);

watch(() => [props.src, props.user?.avatar], () => {
    imageLoadFailed.value = false;
});
</script>

<style scoped>
    .user-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 35px;
        width: 35px;
        border-radius: 50%;
        border: none;
        background-color: #f0f0f0;        
    }
    .user-icon > span {
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin: auto 0;
        text-transform: uppercase;
    }   
    .user-icon > img {
        width: inherit;
        height: inherit;
        object-fit: cover;
        border-radius: 50%;
    }
</style>