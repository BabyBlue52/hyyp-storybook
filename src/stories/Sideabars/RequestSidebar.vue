<template>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Sidebar</v-btn>
    </div>
    <div :class="[openSidebar ? '' : 'closed']" class="hyyp-sidebar">
        <div class="sidebar-title">
            <button class="close-btn" @click="handleToggle()">
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
        </div>
        <div class="contact row">
            <AvatarLarge :src=src alt="profile pic" />
            <Link text="Add to Contacts" />
        </div>
        <div class="row wrapper">
            
            <div class="time-slot column">
                <label>Requesting</label>
                <h3><span style="margin-right:10px;">Feb 22, 2023 </span><span>2:00pm</span> - <span>3:00pm</span> </h3>
                <Link text="Show in Calendar" />
            </div>
            <div class="row user-req">
                <label>Name</label>
                <h4>{{ userRequest.name }}</h4>
            </div>
            <div class="row user-req">
                <label>email</label>
                <h4>{{ userRequest.email }}</h4>
            </div>
            <div class="row user-req">
                <label>Phone Number</label>
                <h4>{{ userRequest.phone }}</h4>
            </div>
            <div class="row user-req ">
                <label>Message</label>
                <div class="text-area">
                    <p>{{ userRequest.message }}</p>
                </div>
            </div>
            <small>sent: {{ userRequest.sent }}</small>        
        </div>
        <div class="button-row">
            <Button title="Accept"/>
            <InlineButton title="Decline" />
        </div>
    </div>
</template>

<script>
import TextInput from '../TextInput.vue';
import TextArea from '../TextArea.vue';
import AvatarLarge from '../AvatarLarge.vue';
import Link from '../Link.vue';
import Button from '../Buttons/Button.vue';
import InlineButton from '../Buttons/InlineButton.vue';

export default {
    name: 'Request Sidebar',
    components: { TextInput, Link, TextArea, AvatarLarge, Button, InlineButton },
    props: {

    },
    data() {
        return {
            openSidebar: true,
            userRequest: {
                name: "John Stamos",
                src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                email: "jesseK@fullhouse.com",
                phone: "5128262448",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                sent: "3:10:22 EST, January 9th, 2023 "

            }

        };
    },
    methods: {
        handleToggle() {

            // If user closes sidebar in edit mode reset back to static
            if (this.openSidebar == false) {
                this.editMode == false
                this.openSidebar = !this.openSidebar
            } else {
                this.openSidebar = !this.openSidebar;
            }
        },
        toggleEditMode() {
            this.editMode = !this.editMode
        }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables.scss";
.hyyp-sidebar {
    position: absolute;
    right: 0;
    width: clamp(10vw, 550px, 40%);
    height: 100%;
    padding: 20px 30px;
    -webkit-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    -moz-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
}

.closed {
    position: absolute;
    right: -450px;
    width: clamp(10vw, 350px, 500px);
    height: 100%;
    -webkit-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    -moz-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
}

.wrapper {
    overflow-y: scroll;
    padding: 0px 20px 10px 20px;
    max-height: 58vh; 
}

label {
    font-size: $small;
    font-weight: 500;
}

button.close-btn {
    width: max-content;
    height: max-content;
    margin: 0;
    padding: 0;
    background: none;
    position: absolute;
    left: 50px;
}

.contact {
    position: relative;
    margin-top: 40px;
    padding: 20px;
    display: flex;
    align-items: center;
    max-width: 270px;
    justify-content: space-between;
}

.time-slot {
    display: flex;
    justify-content: space-evenly;
    height: max-content;
    h3 {
        margin-bottom: 20px;
        padding: 5px 10px;
        font-size: calc(50% + 1vw);
        background: $grey;
        font-family: $poppins, sans-serif;
        font-weight: 600;
    }
}

.user-req {
    margin: 20px 0;
    h4 {
        background: $grey;
        padding: 10px;
    }
}

.text-area {
    max-height: max-content;
    min-height: 180px;
    background: $grey;
    p {
        font-size: 13px;
        font-family: $openSans;
        padding: 10px;
    }
}
.button-row {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px;
}
small {
    position: relative;
    top: -10px;
    opacity: 0.5;
    font-family: $openSans;
}
</style>