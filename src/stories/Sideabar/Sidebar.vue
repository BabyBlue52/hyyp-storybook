<template>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Sidebar</v-btn>
    </div>
    <div :class="[openSidebar ? '' : 'closed']" class="hyyp-sidebar">
        <div class="sidebar-title">
            <button class="close-btn" @click="handleToggle()">
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
            </button>
            <div class="flex">
                <h4>Timeline</h4>
            </div>
        </div>
        <div v-for="(stage, index) in setList" class="timeline">
            <div :key="index" class="dot"></div>
            <div class="plot-line">
                <p class="stage">{{ stage.title}}</p>
                <p>
                   {{ stage.body }} 
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar',
        props: {
            openSidebar: Boolean,
            body: String
        },
        data() {
            return {
                openSidebar: true,
                setList: [
                    {   title: 'Stage One',
                        body: 'Nam tempora quis ea at cupiditate. Reprehenderit ab quos distinctio aut id. Facere id maxime non amet facilis Dolorem cum molestiae et eius accusantium. Et omnis non maiores illum architecto. Magnam porro consequuntur voluptate natus rem tempore laboriosam. Nihil autem et sequi incidunt omnis dolore est.'
                    },{
                        title: 'Stage Two',
                        body: 'Nam tempora quis ea at cupiditate. Reprehenderit ab quos distinctio aut id. Facere id maxime non amet facilis Dolorem cum molestiae et eius accusantium. Et omnis non maiores illum architecto. Magnam porro consequuntur voluptate natus rem tempore laboriosam. Nihil autem et sequi incidunt omnis dolore est.'
                    }
                ]
            };
        },
        methods: {
            handleToggle() {
                this.openSidebar = !this.openSidebar
            }
        }
    }
</script>
<style scoped>
    .hyyp-sidebar {
        position: absolute;
        right: 0;
        width: clamp(10vw, 350px, 500px);
        height: 95vh;
        padding: 0 20px;
        
        -webkit-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        -moz-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);

    }
    .closed {
        position: absolute;
        right: -450px;
        width: clamp(10vw, 350px, 500px);
        height: 95vh;

        -webkit-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        -moz-box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);
        box-shadow: -9px 3px 14px -1px rgba(0,0,0,0.10);

    }
    h4 {
        margin-top:10px;
        text-align: center;
        font-weight: 600;
        transform: scale(0.8);
    }
    .sidebar-title{
        /* display: flex; */
        z-index: 99;
        margin-bottom: 20px;
    }
    .dot {
        height: 15px;
        width: 15px;
        background: #333;
        border-radius: 50%;
        border: 3px solid white;

    }
    .plot-line {
        position: relative;
        left: 7px;
        height: max-content;
        max-height: 400px;
        border-left: 2px solid #333;
        padding-left: 20px;
        width: 95%;
    }
    .plot-line > p {
        position: relative;
        top: -15px;
        font-family: 'Open Sans', sans-serif;
    }
    p.stage {
        font-weight: bold;
        padding-bottom: 10px;
        font-size: .8rem;
    }
    button.close-btn {
        width: max-content;
        height: max-content;
        margin: 0;
        padding: 0;
        background: none;
        position: absolute;
        right: 0%;
    }
</style>