<template>
    <div class="container">
        <input type="file" @change="readFile" ref="file" />
        <div v-if="url">
            <img :src="url" alt="Uploaded Image"/>
            <p>Header</p>
            <button @click="removeItem"><Link text="Remove Image"/></button>
            <h4>Replace</h4>
        </div>    
        <!-- Placeholder content -->
        <div v-else >
            <svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="200" rx="5" fill="white"/>
                <rect width="500" height="200" rx="5" fill="#DCE6F2"/>
                <rect x="1" y="1" width="498" height="198" rx="4" stroke="#37515F" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="14 14"/>
                <g clip-path="url(#clip0_792_18400)">
                <path d="M262 98H252V88H248V98H238V102H248V112H252V102H262V98Z" fill="#37515F"/>
                </g>
                <defs>
                <clipPath id="clip0_792_18400">
                <rect width="24" height="24" fill="white" transform="translate(238 88)"/>
                </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</template>
<script>
    import Link from '../Link.vue';
    export default {
        name: 'Large Image',
        components: { Link },
        props: {
            displayError: Boolean
        },
        methods: {
            async readFile() {
                const file = this.$refs.file.files[0];
                 // Check if a file was selected
                if (!file) {
                    // Handle canceled upload
                    this.url = this;
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
            },
            removeItem() {
                this.url = ''
            }
        },
        data() {
            return {
                url: null,
                displayError: false,
                displayFormatError: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex; 
        position: relative; 
        height: 200px;
        width: 500px;     
        input {
            border: 2px solid salmon;
            position: absolute;  
            left:0px;
            width: 100%;
            height: calc(100% - 5px);
            cursor: pointer;
            opacity: 0;
            z-index: 3;
        }
        img {
            z-index: 1;
            position: absolute;
            height: 100%;
            width: 100%;
            border-radius: 5px;
            object-fit: cover;
            &:hover {
                opacity: 0.8;
            }
        }
        h4 {
            z-index: 2;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            background: rgba(255,255,255,0.75);
            opacity: 0;
            transform: 200ms ease-in-out all;
            cursor: pointer;
            user-select: none;
        }
        p {
            position: absolute;
            top: -5px;
            left: -5px;
            width: max-content;
            height: 24px;
            padding: 0px 8px;
            border-radius: 5px;
            border: 2px solid white;
            background: #e4959e;
            text-align: center;
            font-weight: 700;
            font-size: 0.8rem;
            line-height: 1.33rem;
            color: #100409;
            user-select: none;
            z-index: 4;
        }
        button {
            position: relative;
            top: 205px;
        }
        &:hover {
            h4 {
                opacity: 0.7;
                transform: 200ms ease-in-out all;
            }
        }
    }
</style>    