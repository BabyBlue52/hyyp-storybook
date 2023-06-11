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
                    <h3>Share this Calendar</h3>
                    <p>Let the public know about upcoming events.</p>
                    <div class="clipboard">
                        <input v-model="link" ref="link" />
                    </div>
                
                    <div class="d-flex ">
                        <div class="left" >
                            <Button v-if="isCopied" title="Copied!" enabled="true"/>
                            <Button v-else="!isCopied" title="Copy to Clipboard" enabled="true"  @click="copyToClipboard()"/>
                        </div>
                        
                        <div class="right">
                            <InvertedButton title="Close" enabled="true"  @click="handleToggle()"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import  Button from '../Buttons/Button.vue';
    import  InvertedButton from '../Buttons/InvertedButton.vue';

    export default {
        name: 'ShareLinkModal',
        components: { Button, InvertedButton },
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
            copyToClipboard() {
                this.isCopied = !this.isCopied;
                // Use refs and v-model to allow input interaction
                const element = this.$refs.link;
                element.select();
                element.setSelectionRange(0, 99999);
                document.execCommand('copy');
                
            } 
        }
    }
</script>

<style scoped>
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
    }
    .clipboard > p {
        text-transform: none;
        font-weight: medium;
    }
    .left, .right {
        margin:  10px;
    }
    
</style>