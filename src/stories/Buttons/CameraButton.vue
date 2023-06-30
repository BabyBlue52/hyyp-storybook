<template>
    <div class="d-flex wrapper">
        <img  
            alt="profile pic" 
            class="profile-pic" 
            :src="image" />
            
        <button class="camera-btn">
            <v-tooltip>Edit Mode</v-tooltip>
            <input type="file" @change="renderFile"/>
            <v-icon icon="mdi-camera" color="white" size="20px"></v-icon>
        </button>
        <span class="edit-mode">Edit Mode</span>
    </div>
</template>

<script>
    let placeholder = "https://plus.unsplash.com/premium_photo-1675034359203-c30acdb21eb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    export default {
        name: 'CameraButton',
        methods: {
            renderFile(e) {
                 // Whenever the file changes, emit the 'input' event with the file data.
                this.image = e.target.files[0]
                console.log(e.target.files[0])
                
            },
            async fileChangeHandler(e) {

                try {
                    if (e.target.files.length) {
                    this.image = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                        resolve(e.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                        window.alert('Image Successfully Uploaded!')
                    });
                    
                    } else {
                    // if user cancel input dialog
                    console.log("user cancel");
                    }
                } catch (error) {
                    console.error("error with file reader", error);
                }
            },
        },
        data() {
            return {
                image: placeholder,
            }
        },
        props: ['source'],
    }    
</script>

<style scoped>
    button.camera-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 50%;
        background:#37515F;
        position: absolute;
        left: 180px;
        top: 110px;
        z-index: 99;
    }
    button.camera-btn:focus, button.camera-btn:active {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: none;
        border-radius: 50%;
        background:#E4959E;
        position: absolute;
        left: 180px;
        top: 110px;
        z-index: 99;
    }
    input {
        display: flex;
        position: absolute;
        width: 34px;
        height: 38px;
        border: 1px solid salmon;
        opacity: 0;
        z-index: 999;
    }
    img.profile-pic {
        min-width: 100px;
        min-height: 100px;
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 5px solid white;
        margin-right: 10px;
        margin-bottom: 20px;
        margin-left: 20px;
        border: 1px solid salmon;
    }
    span.edit-mode {
        position: absolute;
        left: 220px;
        top: 80px;
        clear: none;
        width: max-content;
        height: max-content;
        margin-right: -10px;
        padding: 2px 10px;
        border-radius: 5px;

        font-size: .8rem;
        font-weight: 600;
        text-transform: uppercase;
        background: rgba(228, 149, 158, 0.5);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .v-icon {
        position:relative;
        top: 1px;
    }
    .wrapper {
        justify-content: center;
    }
</style>