<template>
    <div class="image-controller">
        <img alt="profile pic" class="profile-pic" :src="[ url === null ? placeholder : url]" />
        <button class="camera-btn">
                <v-tooltip>Edit Mode</v-tooltip>
                <input type="file" ref="file" @change="readFile"/>
                <v-icon icon="mdi-camera" color="white" size="20px"></v-icon>
            </button>
        <!-- Error Handling -->
        <div v-if="displayError" style="height:10px">
            <span class="error">File size must be under 8MB</span>
        </div>
        <div v-if="displayFormatError" style="height:10px">
            <span class="error">File must be either .PNG of .JPG</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CameraButton',
    props: {
        placeholder: String,
        displayError: Boolean,
    },
    methods: {
        async readFile() {
            const file = this.$refs.file.files[0];
            // Check if a file was selected
            if (!file) {
                // Handle canceled upload
                this.url = this.url;
                return;
            }

            let size = file.size
            let maxSize = 64000000; // Limit size to 8MB
            let extn = file.type.split('/')[1];
            let valid = ["png", "jpg", "jpeg"];
           

            if (valid.includes(extn) && size < maxSize) {
                this.url = URL.createObjectURL(file);
                this.displayError = false;
                this.displayFormatError = false;
                this.$emit('image-changed', this.url)
                console.log(this.url)
            }
            if (!valid.includes(extn)) {
                this.displayFormatError = true;

            } if (size > maxSize) {
                console.log('file too big')
                this.displayError = true
            }
        }

    },
    data() {
        return {
            placeholder: "https://plus.unsplash.com/premium_photo-1675034359203-c30acdb21eb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            url: null,
            displayError: false,
            displayFormatError: false
        }
    },
    emit: ['image-changed']
}
</script>

<style scoped>
div.image-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 180px;
    height: max-content;
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
    position: relative;
    top: -30px;
    left: 50px;
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
    background: #E4959E;
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

img.profile-pic {
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #E4959E;
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