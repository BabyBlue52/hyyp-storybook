<template>
    <div :class="[isOpen ? '' : 'locked']"></div>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div>
    <div :class="[isOpen ? 'slideOut' : 'slideIn']" class="centered">
        <div class="modal-container">
            <button class="close-btn" @click="handleToggle()">
                 <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
            </button>
            <h1>{{ text }}</h1>
            <div class="modal-content">
                <p>I write the best placeholder text, and I'm the biggest developer on the web by far...</p>
                <div class="button-section">
                    <button>
                        <span><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20" height="20"><path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"/></svg></span>
                        Continue with Google
                    </button>
                    <button><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></span>
                        Continue with Facebook
                    </button>
                    <button class="email">Continue with Email</button>
                </div>
                <p> By continuing you agree to our <Link :text="'Terms of Service'"/>. <br/>Read our <Link :text="'Privacy Policy.'"/> </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Link from './Link.vue';
    
    export default {
        name: 'Modal',
        components: { Link },
        props: {
            isOpen: Boolean,
            text: String
        },
        data() {
         return {
            isOpen: true, 
            text: 'Hey There'  
         };
        },
        methods: {
            handleToggle(){
                this.isOpen = !this.isOpen
            }   
        }
    }
</script>
<style scoped>
    h1 {
        width: 100%;
        font-size: 2rem;
        font-weight: 900;
        text-align: center;
    }
    p {
        text-align: center;
        font-size: 0.9rem;
    }
    
    div.modal-container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: max-content;
        width: 450px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
    }
    .link {
        margin: 0;
    }
    .slideIn {
        animation: slideIn 300ms ease-in-out;
        opacity: 1;
    }
    .slideOut {
        animation: slideOut 300ms ease-in-out;
        opacity: 0;
    }
    div.modal-content {
        padding: 10px;
    }
    button {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 45px;
        margin: 8px 0;
        padding: 20px 10px;
        background: #FBF8F8;
    }
    button > span {
        position: absolute;
        left: 15px;
        bottom: 3px;
        width: 30px;
        height: 30px;

    }
    button.email {
        background: #37515F;
        color: white;
    }
    button.email:hover {
        background:  #52798E;
    }
    .close-btn {
        height: 20px;
        width: 20px;
        margin: 0;
        padding: 0;
        background: none;
    }
    .close-btn:hover > svg {
        opacity: 0.5;
    }
    .button-section {
        margin: 20px 0;
    }
    @keyframes slideIn {
        from {
            transform: translateY(100%);
            opacity: 0;
        }

        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateY(0%);
            opacity: 1;
        }

        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
</style>