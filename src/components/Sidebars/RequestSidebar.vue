<template>
    <div :class="[openSidebar ? '' : 'closed']" class="hyyp-sidebar">
        <div class="sidebar-title">
            <button class="close-btn" @click="handleToggle()">
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146-.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
        </div>
        <div class="status-row">
            <div class="image-container">
                <Avatar :src="userReq.src" alt="profile pic" />
            </div>
            <div class="status-text">
                <div v-if="userReq.status === 'approved'">
                    <p class="approved">approved</p>
                </div>
                <div v-else-if="userReq.status === 'rejected'">
                    <p class="rejected">Denied</p>
                </div>
                <div v-else>
                    <p class="pending">Pending Approval</p>
                </div>
            </div>
        </div>
        <div class="wrapper justify-start column">
    
            <div class="time-slot column align-start">
                <label>Requesting</label>
                <h3><span style="margin-right:10px;">Feb 22, 2026 </span><span>2:00pm</span> - <span>3:00pm</span> </h3>
                <Link text="Export to Calendar" @click="exportToICS" />
            </div>
            <div class="row user-req ">
                <label>Name</label>
                <h4>{{ userReq.name }}</h4>
            </div>
            <div class="row user-req">
                <label>Email</label>
                <h4>{{ userReq.email }}</h4>
            </div>
            <div class="row user-req">
                <label>Phone Number</label>
                <h4>{{ userReq.phone }}</h4>
            </div>
            <div class="row user-req ">
                <label>Message</label>
                <div class="text-area">
                    <p>{{ userReq.message }}</p>
                </div>
            </div>
            <small>sent: {{ userReq.sent }}</small>
        </div>
        <div class="button-row">
            <Button text="Accept" @click="acceptReq" />
            <InlineButton text="Decline" @click="declineReq" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { createEvent } from 'ics'
import { saveAs } from 'file-saver'
import Link from '../UI/Link.vue';
import Button from '../Buttons/Button.vue';
import InlineButton from '../Buttons/InlineButton.vue';
import Avatar from '../UI/Avatar.vue';

const props = defineProps({
    isOpen: Boolean,
    requestData: {
        type: Object,
    },

})
const emit = defineEmits(['toggle-sidebar'])
const openSidebar = ref(props.isOpen)
const userReq = ref({ ...props.requestData })

watch(() => props.isOpen, (newVal) => {
    openSidebar.value = newVal
})
watch(() => props.requestData, (newVal) => {
    userReq.value = { ...newVal }
}, { deep: true })

function handleToggle() {
    openSidebar.value = !openSidebar.value
    // emit event
    emit('toggle-sidebar', openSidebar.value)
}

const acceptReq = () => {
    nextTick(() => {
        userReq.value.status = 'approved';
        emit('request-updated', { ...userReq.value, status: 'approved' });
        window.alert(userReq.value.status);
    });
}


const declineReq = () => {
    nextTick(() => {
        userReq.value.status = 'rejected';
        emit('request-updated', { ...userReq.value, status: 'rejected' });
        window.alert(userReq.value.status);
    });
}

// File Saver Export to ICS
const exportToICS = () => {
    const dateParts = userReq.value.date.split('-').map(Number)
    const event = {
        title: `Request from ${userReq.value.sender}`,
        description: userReq.value.message,
        start: dateParts,
        organizer: { name: userReq.value.sender, email: userReq.value.email }
    }
    createEvent(event, (error, value) => {
        if (error) {
            console.log(error)
            return
        }
        const blob = new Blob([value], { type: 'text/calendar' })
        saveAs(blob, `${event.title}.ics`)
    })
}
// END File Saver
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
.hyyp-sidebar {
    position: absolute;
    top: 0px;
    right: 0;
    width: clamp(10vw, 450px, 40%);
    height: 100%;
    padding: 12px 18px;
    background: white;
    z-index: 99;
    border-left: rgba(#ccc, 0.5) 1px solid;
}

.closed {
    position: absolute;
    right: -450px;
    width: clamp(10vw, 350px, 500px);
    height: 100%;
}

.wrapper {
    overflow-y: scroll;
    padding: 0px 20px 10px 20px;
    min-height: 250px;
    max-height: calc(75% - 10px);
}

label {
    position: relative;
    top: 0px;
    font-size: $small;
    font-weight: 500;
}

.sidebar-title {
    width: 100%;
}

button.close-btn {
    width: max-content;
    min-width: 24px;
    height: max-content;
    min-height: 24px;
    margin: 0;
    padding: 0;
    background: none;
    position: absolute;
    top: 12px;
    left: 24px;
}

.status-row {
    position: relative;
    padding: 10px;
    display: flex;
    align-items: center;
    margin: 40px auto 20px;
    gap:10px;
    width: calc(100% - 20px);
    .image-container {
        margin-right: 10px;
        border-radius: 50%;
        border: 2.5px solid $grey_80;
    }
    .status-text {
        width: 100%;
        justify-content: center;   
    }
    .approved {
        position: relative;
        height: 100%;
        min-width: 100%;
        padding: 10px;
        font-size: $paragraph;
        text-align: center;
        color: #59d96c;
        user-select: none;
        text-transform: capitalize;
        border-radius: $border-radius;
        background: rgba($success, 0.2);
        border: 2px solid transparent;
    }
    .rejected {
        @extend .approved;
        background: rgba($grey_60, 1);
        color: white;
        border: 2px solid transparent;
    }
    .pending {
        @extend .approved;
        color: $grey_60;
        background: $offWhite;
        background: rgba($grey_80, 0.1);
        border: 2px dashed $grey_80;
    }
}

.time-slot {
    display: flex;
    justify-content: space-evenly;
    height: max-content;
    h3 {
        width: 100%;
        margin-bottom: 20px;
        padding: 10px 10px;
        font-size: calc(50% + .5vw);
        background: $grey_90;
        font-family: $poppins, sans-serif;
        font-weight: 600;
        border-radius: $border-radius;
    }
}

.user-req {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    width: 100%;
    h4 {
        width: 100%;
        background: $grey_90;
        padding: 10px;
        font-size: $paragraph;
        text-align: left;
        border-radius: $border-radius;
    }
}

.text-area {
    max-height: max-content;
    min-height: 180px;
    background: $grey_90;
    width: 100%;
    border-radius: $border-radius;
    p {
        font-size: 13px;
        font-family: $openSans;
        padding: 10px;
    }
}

.button-row {
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
    padding: 10px 20px;
}

small {
    display: block;
    position: relative;
    top: 0px;
    width: 100%;
    opacity: 0.5;
    font-family: $openSans;
    text-align: left;
}
</style>