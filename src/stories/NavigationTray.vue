<template>
    <div class="nav-tray-wrapper">
        <div 
            v-for="page in pages" 
            :class="[page.isActive ? 'selected nav-tray-item' : 'nav-tray-item']" 
            @click="$event => page.isActive = !page.isActive"
        >
            <div v-html="page.icon" class="nav-tray-icon"></div>
            <div class="nav-tray-title">
                <a>{{ page.title }}</a>
            </div>
        
        </div>
    </div>
</template>
<script>
    //Check current URL and identify which object to render Vuex
    export default {
        name: 'NavigationTray',   
        
        // Array to map
        data: () => ({
            pages: [
                {title: 'venue',
                isActive: true, 
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2H14V4H16V7.702L23 10.32V23H24V24H0V23H1V12H7V4H9V2H11V0H12V2ZM15 5H8V23H9V21H14V23H15V5ZM13 22H10V23H13V22ZM21 23H22V11.013L16 8.77V23H17V21H21V23ZM7 13H2V23H3V21H6V23H7V13ZM5 22H4V23H5V22ZM20 22H18V23H20V22ZM4 17V19H3V17H4ZM6 17V19H5V17H6ZM11 7V19H10V7H11ZM21 18V19H17V18H21ZM13 7V19H12V7H13ZM21 16V17H17V16H21ZM4 14V16H3V14H4ZM6 14V16H5V14H6ZM21 14V15H17V14H21ZM21 12V13H17V12H21ZM13 3H10V4H13V3Z" fill="black"/>
</svg>
`},
                {title: 'rooms',
                isActive: false,
                icon: `<svg width="20" height="24" viewBox="0 0 20 24" fill: #100409; xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 23H20V24H0V23H2V0H18V23ZM17 1H3V23H17V1ZM7 12V13H4V12H7Z" />
</svg>
`},
                {title: 'calendar',
                isActive: false, 
                icon: `<svg width="31" height="28" viewBox="0 0 31 28" fill: #100409; xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.9092 27.761H0.90918V4.01099H5.90918V0.260986H10.9092V4.01099H20.9092V0.260986H25.9092V4.01099H30.9092V27.761ZM29.6592 9.01099H2.15918V26.511H29.6592V9.01099ZM9.03293 20.0035L10.3229 19.8435C10.5742 21.006 11.1892 21.766 12.3779 21.766C13.5742 21.766 14.5417 20.9085 14.5417 19.7235C14.5417 18.4872 13.4804 17.4872 11.5754 17.9547L11.7192 16.901C12.8567 17.0135 14.0692 16.466 14.0692 15.2785C14.0692 14.436 13.4092 13.7485 12.3492 13.7485C11.3604 13.7485 10.6442 14.3222 10.4517 15.511L9.16168 15.2972C9.48418 13.6485 10.6954 12.761 12.3204 12.761C14.0842 12.761 15.3942 13.8772 15.3942 15.3047C15.3942 16.1122 14.9404 16.861 13.9467 17.2872C15.1879 17.5535 15.9092 18.4297 15.9092 19.6972C15.9092 21.5222 14.2917 22.761 12.3704 22.761C10.4567 22.761 9.19918 21.5797 9.03293 20.0035ZM20.9092 22.761H19.6204V14.9297C18.9717 15.506 17.9279 16.1135 17.1592 16.3785V15.2172C18.8042 14.4972 19.7042 13.4647 20.0792 12.761H20.9092V22.761ZM29.6592 5.26099H2.15918V7.76099H29.6592V5.26099ZM9.65918 1.51099H7.15918V4.01099H9.65918V1.51099ZM24.6592 1.51099H22.1592V4.01099H24.6592V1.51099Z"/>
</svg>
`},
                {title: 'requests', 
                icon: `<svg width="26" height="26" fill: #100409 viewBox="0 0 26 26"  xmlns="http://www.w3.org/2000/svg">
<path d="M22.7842 0.0109863H4.03418L0.90918 13.5527L2.99251 25.011H23.8258L25.9092 13.5527L22.7842 0.0109863ZM5.69147 2.09432H21.1269L23.5311 12.511H18.0967L15.7529 15.636H11.0654L8.72168 12.511H3.2873L5.69147 2.09432ZM4.73105 22.9277L3.21647 14.5943H7.68001L10.0238 17.7193H16.7946L19.1383 14.5943H23.6019L22.0873 22.9277H4.73105Z"/>
</svg>
`},
                {title: 'history', 
                isActive: false,
                icon:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/></svg>
`},
                {title: 'users',
                isActive: false,
                icon:`<svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4012 16.4296C17.4585 15.723 20.3038 15.1043 18.9265 12.5016C14.7305 4.5803 17.8132 0.344299 22.2438 0.344299C26.7612 0.344299 29.7678 4.74297 25.5612 12.503C24.1412 15.1216 27.0932 15.739 30.0852 16.431C32.7318 17.0416 32.9092 18.335 32.9092 20.5736L32.9052 21.6776H31.1332C31.1332 18.8923 31.2438 18.5216 29.4985 18.119C26.9638 17.535 24.5718 16.983 23.6972 15.047C23.3785 14.3403 23.1705 13.1776 23.9985 11.6563C25.8278 8.2803 26.2905 5.35497 25.2638 3.63363C24.0612 1.61097 20.4412 1.62163 19.2478 3.6043C18.2238 5.30163 18.6798 8.24297 20.4958 11.671C21.3052 13.199 21.0918 14.359 20.7705 15.0616C19.8905 16.9883 17.4745 17.5456 14.9172 18.135C13.2478 18.5216 13.3545 18.919 13.3545 21.6776H11.5798C11.5798 18.7496 11.3452 17.1363 14.4012 16.4296ZM0.911846 21.6776H2.68385C2.68385 19.1203 2.43585 19.831 5.11585 19.047C6.46785 18.6536 7.66251 18.083 8.20385 16.8976C8.48651 16.2803 8.67718 15.271 7.98785 13.9683C6.71851 11.571 6.36251 9.46963 7.03851 8.3483C7.76785 7.1363 10.0652 7.13763 10.7972 8.3683C12.0438 10.4576 9.73985 13.6776 9.43718 15.011H11.2985C11.8852 13.6776 12.9065 12.067 12.9065 9.81097C12.9065 7.13097 11.1572 5.67763 8.90918 5.67763C5.58518 5.67763 3.27318 8.85497 6.42118 14.7963C7.45318 16.7483 5.31985 17.2123 3.02785 17.7416C1.04118 18.2016 0.90918 19.171 0.90918 20.8536L0.911846 21.6776Z" fill="black"/>
</svg>
`},
                {title: 'contacts',
                isActive: false,
                icon: `<svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9093 1.76101V13.761L13.9093 10.761L9.90927 13.761V1.76101M1.90927 24.761C1.89677 23.111 3.23427 21.7735 4.88427 21.761C4.89677 21.761 4.89677 21.761 4.90927 21.761H21.9093V1.76101H4.90927C3.25927 1.74851 1.92177 3.08601 1.90927 4.73601C1.90927 4.74851 1.90927 4.74851 1.90927 4.76101V24.761ZM1.90927 24.761V25.761H19.9093" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
</svg>
`},
            ]
        }),
        methods: {
            
        }
    }
</script>
<style scoped>
    .nav-tray-wrapper {
        width: 250px;
        max-width: 33vw;
        height: 100vh;
        background: #FBF8F8;
    }
    .nav-tray-item {
        display: flex;
        height: clamp(50px, 8vh, 100px);
        border-left: 10px solid transparent;
        transition: 500ms ease-in-out all;
    }
    .nav-tray-item:hover {
        background: rgb(228, 149, 158,0.2)
    }
    .nav-tray-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-width: 60px ;
    }
    .nav-tray-title {
        width: 100%;
    }
    a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-transform: capitalize;
        font-weight: 600;
        font-size: .9rem;
    }
    .selected {
        border-left: 10px solid #E4959E;
        transition: 500ms ease-in-out all;
        background: rgb(228, 149, 158,0.2)
    }
</style>