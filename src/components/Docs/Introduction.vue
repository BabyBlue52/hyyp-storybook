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
                <small> This page will act as the official document of the most up to date componets within the product known as hyyp</small>
                
                <hr/>
            </blockquote>
    
            <blockquote class="github">
    
                <p>
                    Repo is accessible from
                    <Link :text="'here'" :url="'https://github.com/BabyBlue52/hyyp-storybook'" />
                </p>
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

export default {
    name: 'Intro Page',
    components: { Link },
}
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100vh;
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
        width: inherit;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background: white;
        z-index: 10;
    }
    .content {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        top: 50px;
        flex-direction: column;
        margin: 20px auto;
        padding: 50px;
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