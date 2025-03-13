<template>
    <div class="wrapper">
        <div class="header">
            <img src="../../assets/hyyp.svg" />
            <h1>Documentation</h1>
        </div>
        <div class="content">
            <blockquote>
                <h4>
                    Hello Dev Team,
                </h4>
            </blockquote>
            <blockquote>
                <p>
                    This Component Library has been written in Vue3 in order to better integrate with the hyyp back-end architecture.
                </p><br/>
                <small> This page will act as the official document of the most up to date components within the product known as hyyp.</small>
                
                <hr/>
            </blockquote>
    
            <blockquote class="github">
    
                <p>
                    Repo is accessible from
                    <Link :text="'here'" :url="'https://github.com/BabyBlue52/hyyp-storybook/tree/release'" />
                </p>
            </blockquote>
            <blockquote class="npm" @click="copyText">
                <div v-if="isCopied == false">
                    <p>
                    <span>git clone https://github.com/BabyBlue52/hyyp-storybook.git</span>
                    
                    <span><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg></span>
                    </p>
                </div>
                <div v-else>
                    <p><span>Copied!</span></p>
                </div>
            </blockquote>

    
        </div>
    </div>
    <footer>
        <a href="https://www.datflo.io" target="_blank">
                <img class="datflo" src="https://datflo.io/static/d1998000c3793a675427d63dc29ff22a/3ecc7/993598801097cd8d73626c8f1c9c7b51084e452d-617x377.webp "/>
            </a>
    </footer>
</template>

<script>
import Link from "../Link.vue";
const cli = "bun add hyyp-storybook@latest"

export default {
    name: 'Intro Page',
    components: { Link },
    props: {
        isCopied: Boolean
    },
    data() {
        return {
            isCopied: false
        }
    },
    methods: {
        copyText() {
            this.toggleText();
            navigator.clipboard.writeText(cli);
        },
        toggleText() {
            this.isCopied = true
            setTimeout(() => {
                this.isCopied = !this.isCopied
                
            }, 2000);
          
        }
    }
}
</script>

<style scoped lang="scss">
.v-main {
    overflow:hidden;
}
.wrapper {
    display: flex;
    position: fixed;
    left:0;
    top: 0px;
    width: calc(100% - 80px);
    height: 100%;
    padding: 50px;
    h1 {
        position: relative;
        top: 12px;
        margin-left: 5px;
        padding: 1px 10px;
        font-size: 0.8rem;
        background: #37515F;
        color: white;
        border: 2px solid #37515F;
        border-radius: 3px;
    }
    img {
        width: 120px;
    }
    .header {
        display: flex;
        z-index: 2;
        position: fixed;
        top: 10px;
        width: calc(100% - 120px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background: white;
        z-index: 10;
    }
    .content {
        display: flex;
        width: calc(100% + 160px);
        height: 100%;
        position: relative;
        top: 50px;
        flex-direction: column;
        margin: 20px auto;
        padding: 50px;
        padding-top: 100px;
        background: #fbf8f8;
        blockquote {
            width: 500px;
            margin: 20px auto;
        }
        .github {
            padding: 10px;
            background: #f0f0f0;
            text-align: center;
            
        }
        .npm {
            height: 42px;
            padding: 10px;
            color: #fbf8f8;
            background: darken(#37515F, 35%);
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            svg {
                position: relative;
                top: 5px;
                width: 16px;
                height: 16px; 
                margin: 0 10px;
                fill: white;

            }
        }
    }
    hr {
        margin-top: 20px;
    }
}

footer {
    position: fixed;
    position: fixed;
    bottom: 0px;
    background: white;
    width: 100%;
}

img.datflo {
    width: 80px;
    filter: grayscale(1);
    opacity: 0.25;
}
</style>