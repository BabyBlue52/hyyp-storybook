<template>
    <div :class="[isOpen ? 'locked' : '']">
    </div>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div>
    <div :class="[isOpen ? 'slideIn' : 'slideOut']" class="centered">
        <div class="modal-container">
            <button class="close-btn" @click="handleToggle()">
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
            <div class="d-flex center">
                <Avatar userInitials="BK" />
                <h1>{{ text }}</h1>
                <small>Booking Request</small>
                <div class="modal-content">
                    <div class="row">
                        <div class="starting-time"><label>Starting Time</label>
                            <p>{{ startTime }}</p>
                        </div>
                        <TimeDropDown label="ending time" />
                    </div>
                    <div class="row">
                        <TextInput label="First name" />
                        <TextInput label="last name" />
                    </div>
                    <div class="row">
                        <TextInput label="email" type="email"/>
                    </div>
                    <div class="row">
                        <TextInput label="Phone" placeholder="+1" type="phone"/>
                    </div>
                    <div class="row">
                        <TextArea label="message" placeholder="Leave a message for them or just say hi👋 " />
                    </div>

                    <div class="row">
                        <button class="full-width">Submit Request</button>
                    </div>
                </div>
    
    
            </div>
        </div>
    </div>
    <Link/>
</template>

<script>
import Avatar from '../Avatar.vue';
import TimeDropDown from '../TimeDropdown.vue';
import TextInput from '../TextInput.vue';
import TextArea from '../TextArea.vue';
import Button from '../Buttons/Button.vue';
export default {
    name: 'Booking Modal',
    components: { Avatar, TimeDropDown, TextInput, TextArea, Button },
    props: {
        isOpen: Boolean,
        text: String,
        startTime: String
    },
    data() {
        return {
            isOpen: true,
            text: 'Organization Name',
            startTime: "1:00pm"
        };
    },
    methods: {
        handleToggle() {
            this.isOpen = !this.isOpen
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';

small {
    padding-bottom: 10px;
}
.row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
}

div.starting-time {
    user-select: none;
    position: relative;
    top: 4px;
    width: 50%;
    height: 32px;
    margin: 0 10px;
    padding: 0 10px;
    border: 1px solid #666;
    border-radius: 2px;
    opacity: 0.5;
    cursor: not-allowed;
    label {
        position: absolute;
        top: -10px;
        padding: 1px 2px;
        font-size: 0.7rem;
        background: white;
    }
    p {
        position: relative; // top: 5px;
        width: 100%;
        padding-top: 8px;
        padding-left: 4px;
        font-size: 0.7rem;
    }
}
div.spacer {
    position: relative;
    width: 0px;
    margin: 0 5px;
}

</style>