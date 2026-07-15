<template>
    <div class="image-controller">
        <div v-if="url" class="profile-pic-container">
            <img alt="profile pic" class="profile-pic" :src="url" />
        </div>
        <div v-else class="profile-pic-container initials-container">
            <span class="initials">{{ userInitials }}</span>
        </div>
        <button class="camera-btn">
                <v-tooltip>Edit Mode</v-tooltip>
                <input type="file" ref="file" @change="readFile" accept="image/png,image/jpeg,image/jpg"/>
                <v-icon icon="mdi-camera" color="white" size="20px"></v-icon>
            </button>
        <!-- Error Handling -->
        <div v-if="showError" style="height:10px">
            <span class="error">File size must be under 8MB</span>
        </div>
        <div v-if="displayFormatError" style="height:10px">
            <span class="error">File must be either .PNG or .JPG</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    displayError: {
        type: Boolean,
        default: false
    },
    src: {
        type: String,
        default: null
    },
    userInitials: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['image-changed']);

const file = ref(null);
const url = ref(null);
const displayFormatError = ref(false);
const internalDisplayError = ref(false);

// Convert base64 string to data URL for display
const convertToDataUrl = (src) => {
    if (!src) return null;
    
    // If it's already a data URL or blob URL, return as is
    if (src.startsWith('data:') || src.startsWith('blob:')) {
        return src;
    }
    
    // If it's a base64 string without the data URL prefix, add it
    if (/^[A-Za-z0-9+/=]+$/.test(src)) {
        const mime = src.startsWith('iVBOR') ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${src}`;
    }
    
    // If it's a regular URL, return as is
    return src;
};

// Initialize url from props
if (props.src) {
    url.value = convertToDataUrl(props.src);
}

// Watch for src prop changes
watch(() => props.src, (newSrc) => {
    if (newSrc) {
        url.value = convertToDataUrl(newSrc);
    } else {
        url.value = null;
    }
});

const readFile = async () => {
    const selectedFile = file.value.files[0];
            // Check if a file was selected
    if (!selectedFile) {
                // Handle canceled upload
                return;
            }

    const size = selectedFile.size;
    const maxSize = 64000000; // Limit size to 8MB
    const extn = selectedFile.type.split('/')[1];
    const valid = ["png", "jpg", "jpeg"];

            if (valid.includes(extn) && size < maxSize) {
        url.value = URL.createObjectURL(selectedFile);
        internalDisplayError.value = false;
        displayFormatError.value = false;
        emit('image-changed', url.value, selectedFile);
        console.log(url.value);
            }
    
            if (!valid.includes(extn)) {
        displayFormatError.value = true;
    }
    
    if (size > maxSize) {
        console.log('file too big');
        internalDisplayError.value = true;
            }
};

// Computed property for display error (props or internal)
const showError = computed(() => props.displayError || internalDisplayError.value);
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
div.image-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 80px;
    height: max-content;
    position: relative;
}

button.camera-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    outline: 3px solid white;
    border-radius: 50%;
    background: #37515F;
    position: absolute;
    top: 50px;
    left: 60px;
    cursor: pointer;
    z-index: 99;
}

button.camera-btn:focus,
button.camera-btn:active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50%;
    background: $primary;
    z-index: 99;
    cursor: pointer;
}

input {
    display: flex;
    position: absolute;
    width: 34px;
    height: 38px;
    opacity: 0;
    z-index: 98;
}

.profile-pic-container {
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;
    border-radius: 50%;
    border: 3px solid $primary;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $grey_90;
}

img.profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.initials-container {
    background-color: $grey_90;
}

.initials {
    position: relative;
    top: 2px;
    left: 1px;
    font-size: $header;
    font-weight: $heavy;
    color: $grey_20;
    text-transform: uppercase;
    user-select: none;
}

.v-icon {
    position: relative;
    top: 1px;
}

span.error {
    position: relative;
    top: -20px;
    height: max-content;
    white-space: nowrap;
    padding: 5px 10px 0 20px;
    text-align: center;
    font-size: 0.67rem;
    font-weight: 500;
    color: #FF4D4D;
}
</style>