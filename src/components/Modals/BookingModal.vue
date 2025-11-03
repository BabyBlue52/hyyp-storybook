<template>
    <div v-if="$props.isOpen" class="locked"></div>
    <!-- For debugging purposes/storybook -->
    <!-- <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div> -->
    <div :class="[$props.isOpen ? 'fadeIn' : 'fadeOut']" class="centered">
        <div class="modal-container">
            <button class="close-btn" @click="handleToggle()">
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
            <div class="d-flex center">
                <Avatar userInitials="BK" />
                <h1>{{ displayText }}</h1>
                <small>Booking Request</small>
                <div class="modal-content">
                    <div class="row">
                        <TimeDropDown label="Start Time" />
                        <TimeDropDown label="End Time" />
                        
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
</template>

<script>
import Avatar from '@/components/UI/Avatar.vue';
import TimeDropDown from '@/components/UI/TimeDropdown.vue';
import TextInput from '@/components/UI/TextInput.vue';
import TextArea from '@/components/UI/TextArea.vue';
export default {
    name: 'BookingModal',
    components: { Avatar, TimeDropDown, TextInput, TextArea },
    props: {
        isOpen: {
            type: Boolean,
            default: true
        },
        text: {
            type: String,
            default: 'Organization Name'
        }
    },
    data() {
        return {
            localIsOpen: this.isOpen,
            scrollPosition: 0
        };
    },
    computed: {
        displayText() {
            return this.text;
        }
    },
    watch: {
        isOpen(newVal) {
            this.localIsOpen = newVal;
            this.toggleBodyScroll(newVal);
        }
    },
    mounted() {
        if (this.isOpen) {
            this.toggleBodyScroll(true);
        }
    },
    beforeUnmount() {
        this.toggleBodyScroll(false);
    },
    methods: {
        handleToggle() {
            this.localIsOpen = !this.localIsOpen;
            this.toggleBodyScroll(this.localIsOpen);
            this.$emit('update:isOpen', this.localIsOpen);
        },
        toggleBodyScroll(lock) {
            if (lock) {
                // Save current scroll position
                this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                // Prevent scrolling on both html and body
                document.documentElement.style.overflow = 'hidden';
                document.documentElement.style.position = 'fixed';
                document.documentElement.style.top = `-${this.scrollPosition}px`;
                document.documentElement.style.width = '100%';
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${this.scrollPosition}px`;
                document.body.style.width = '100%';
            } else {
                // Restore scroll
                document.documentElement.style.overflow = '';
                document.documentElement.style.position = '';
                document.documentElement.style.top = '';
                document.documentElement.style.width = '';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                // Restore scroll position
                window.scrollTo(0, this.scrollPosition);
            }
        }
    }
}
</script>

<style scoped lang="scss">
@use '@/assets/variables.scss' as *;

small {
    padding-bottom: 10px;
}
.modal-container {
    position: relative;
    z-index: 9999;
}
div.time-input {
    position: relative;
    top: 4px;
    width: 50%;
    height: 32px;
    padding: 0 10px;
    border: 1px solid #666;
    border-radius: $border-radius;
    opacity: 1;
    cursor: not-allowed;
    label {
        position: absolute;
        top: -20px;
        padding: 1px 4px;
        font-size: 0.7rem;
        background: white;
    }
    p {
        position: relative;
        width: 100%;
        padding-top: 8px;
        padding-left: 4px;
        font-size: 0.7rem;
    }
}


</style>