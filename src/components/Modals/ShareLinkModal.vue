<template>
    <div @click="handleToggle()" :class="[isOpen ? 'locked' : '']" ></div>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div>
    <div :class="[isOpen ? 'slideIn' : 'slideOut']" class="centered">
        <div class="modal-container">
            
            <div class="share-header">
                <v-icon icon="mdi-link-variant"></v-icon>
                <div class="content">
                    <h3>Share This Event</h3>
                    <p>Let the public know about these upcoming events.</p>
                    <div class="clipboard">
                        <input v-model="link" ref="link" />
                    </div>
                
                    <div class="d-flex share-buttons">
                        
                            <Button v-if="isCopied" title="Copied!" enabled="true"/>
                            <Button v-else title="Copy to Clipboard" enabled="true"  @click="copyToClipboard()"/>
                            <!-- <InlineButton text="Close" enabled="true"  @click="handleToggle()"/> -->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import  Button from '@/components/Buttons/Button.vue';
    // import  InlineButton from '@/components/Buttons/InlineButton.vue';

    export default {
        name: 'ShareLinkModal',
        components: { Button },
        props: {
            isOpen: Boolean,
            link: String,
            enabled: Boolean,
            isCopied: Boolean
        },
        data() {
         return {
            isOpen: true, 
            isCopied: false,
            link: 'https://youtu.be/cr26C8p8Lfo'
         };
        },
        methods: {
            handleToggle(){
                this.isOpen = !this.isOpen
                this.isCopied = !this.isCopied;
            },
            async copyToClipboard() {
                try {
                    // Copy to clipboard
                    await navigator.clipboard.writeText(this.link);
                    
                    this.isCopied = true;
                    
                    setTimeout(() => {
                        this.isCopied = false;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            } 
        },
        emits: ['link'],
    }
</script>

<style scoped lang="scss">
    @use "../../assets/variables.scss" as *;

    input:focus {
        outline: none;
    }
    .modal-container {
        width: 550px;
        padding: 30px;
    }
    .share-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    .share-header > .v-icon {
        font-size: 3rem;
        margin-bottom: 30px;
        color: #37515F;
    }
    .share-header > .content {
        width: 100%;
        padding: 0 20px;
    }
    .content > h3 {
        text-align: center;
    }
    .content > p {
        text-align: center;
        font-size: 0.8rem;
     
    }
    .clipboard {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        margin: 30px 0;
        background: #f0f0f0;
        border-radius: 5px;
        input {
            width: 80%;
            overflow: auto;
            height: 100%;
            margin: 0 auto;
            border: none;
            outline: none;
            text-align: center;
        }
    }
    .clipboard > p {
        text-transform: none;
        font-weight: medium;
    }
    .share-buttons {  
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    
</style>