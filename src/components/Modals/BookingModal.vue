<template>
    <div v-if="$props.isOpen" class="locked" @click="handleToggle()"></div>
    <!-- For debugging purposes/storybook -->
    <!-- <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div> -->
    <div :class="[$props.isOpen ? 'fadeIn' : 'fadeOut']" class="centered" @click.stop>
        <div class="modal-container">
            <button class="close-btn" @click="handleToggle()">
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
            </button>
            <div class="d-flex center">
                <h2>{{ displayText }}</h2>
                <small> Request Booking</small>
                
                <div class="modal-content ">
                    <div class="row">
                        <div class="hyyp-input w-100">
                            <label>Select Date</label>
                            <!-- <input type="date" v-model="selectedDate" /> -->
                            <v-text-field type="date" v-model="bookingData.selectedDate" class="phone"/>
                        </div>
                    </div>
                    <div class="row">
                        <TimeDropDown label="Start Time" v-model="bookingData.startTime" />
                        <TimeDropDown label="End Time" v-model="bookingData.endTime" />
                    </div>
                    <div v-if="bookingData.startTime !== '' && bookingData.endTime !== ''" class="row hours-display">
                        <p>Duration: <strong>{{ calculatedHours }}</strong></p>
                    </div>
                    <!-- Spacer -->
                    <hr style="margin-top: 20px;"/>
                    
                    <div class="row">
                        <TextInput label="First name" v-model="bookingData.firstName"/>
                        <TextInput label="last name" v-model="bookingData.lastName"/>
                    </div>
                    <div class="row">
                        <TextInput label="email" type="email" v-model="bookingData.email"/>
                    </div>
                    <div class="row">
                        <TextInput 
                            label="Phone" 
                            placeholder="(123)456-7890" 
                            type="tel" 
                            v-model="bookingData.phone"
                        />
                    </div>
                    <hr style="margin-top: 30px;"/>
                    <div class="d-flex column">
                        <TextArea label="message" placeholder="Leave a message for them explaining the nature of your request in detail" />
                    </div>
                </div>
                  <!-- Static buttons below form -->
                <div class="modal-buttons">
                    <div class="row">
                        <button class="full-width">Submit Request</button>
                    </div>
                    <div class="row justify-center">
                        <button class="inline-btn" @click="handleToggle()"><small>Cancel</small></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import Avatar from '@/components/UI/Avatar.vue';
import TimeDropDown from '@/components/UI/TimeDropdown.vue';
import TextInput from '@/components/UI/TextInput.vue';
import TextArea from '@/components/UI/TextArea.vue';
import { ref, watch, computed, reactive } from 'vue';
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: true
    },
    text: {
        type: String,
        default: 'Organization Name'
    }
});
      
const localIsOpen = ref(props.isOpen)
const scrollPosition = ref(0)
const bookingData = reactive({
    selectedDate: null,
    startTime: '',
    endTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
})
const displayText = computed(() => props.text)

    watch(() => props.isOpen, (newVal) => {
        localIsOpen.value = newVal;
        toggleBodyScroll(newVal);
    })
    const handleToggle = () => {
        localIsOpen.value = !localIsOpen.value;
        toggleBodyScroll(localIsOpen.value);
    }
    const toggleBodyScroll = (lock) => {
        if (lock) {
            // Save current scroll position
            scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop;
                // Prevent scrolling on both html and body
                document.documentElement.style.overflow = 'hidden';
                document.documentElement.style.position = 'fixed';
                document.documentElement.style.top = `-${scrollPosition.value}px`;
                document.documentElement.style.width = '100%';
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollPosition.value}px`;
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
                window.scrollTo(0, scrollPosition.value);
            }
        }
    const emit = defineEmits(['update:isOpen'])

    watch(localIsOpen, (newVal) => {
        emit('update:isOpen', newVal);
    })
    watch(scrollPosition, (newVal) => {
        window.scrollTo(0, newVal);
    })
    watch(() => bookingData.selectedDate, (newVal) => {
        console.log('Selected date:', newVal);
    })
    // Calculate hours between start and end time
    const calculatedHours = computed(() => {
        if (!bookingData.startTime || !bookingData.endTime) {
            return null;
        }
        
        const parseTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes; // Convert to minutes
        };
        
        const startMinutes = parseTime(bookingData.startTime);
        const endMinutes = parseTime(bookingData.endTime);
        
        // Handle case where end time is next day (e.g., 23:00 to 01:00)
        let diffMinutes = endMinutes - startMinutes;
        if (diffMinutes < 0) {
            diffMinutes += 24 * 60; // Add 24 hours
        }
        
        const hours = diffMinutes / 60;
        const roundedHours = Math.round(hours * 100) / 100; // Round to 2 decimal places
        
        if (roundedHours < 0) {
            return null;
        }
        
        // Format hours display
        if (roundedHours % 1 === 0) {
            return `${roundedHours} hour${roundedHours !== 1 ? 's' : ''}`;
        } else {
            const wholeHours = Math.floor(roundedHours);
            const minutes = Math.round((roundedHours - wholeHours) * 60);
            if (wholeHours === 0) {
                return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            } else {
                return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
        }
    });
    
    watch(() => bookingData.startTime, (newVal) => {
        console.log('Start time:', newVal);
    })
    watch(() => bookingData.endTime, (newVal) => {
        console.log('End time:', newVal);
    })
    
    // Format phone number to (xxx)xxx-xxxx
    // Compliant: ES5+ compatible, uses efficient native methods
    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters and limit to 10 digits
        // .slice() is ES5, fully supported, and efficient for small strings
        const numbers = value.replace(/\D/g, '').slice(0, 10);
        
        // Early return for empty input
        if (!numbers) return '';
        
        // Format progressively as user types
        const len = numbers.length;
        if (len <= 3) {
            return `(${numbers}`;
        } else if (len <= 6) {
            return `(${numbers.slice(0, 3)})${numbers.slice(3)}`;
        } else {
            return `(${numbers.slice(0, 3)})${numbers.slice(3, 6)}-${numbers.slice(6)}`;
        }
    }
    
    // Watch phone input and format it
    let isFormatting = false;
    watch(() => bookingData.phone, (newVal) => {
        // Prevent infinite loop
        if (isFormatting) return;
        
        const formatted = formatPhoneNumber(newVal || '');
        if (formatted !== newVal) {
            isFormatting = true;
            bookingData.phone = formatted;
            // Reset flag after Vue updates
            setTimeout(() => {
                isFormatting = false;
            }, 0);
        }
    })
</script>

<style scoped lang="scss">
@use "../../assets/variables.scss" as *;
h2 {
    margin: 20px 0 5px;
    color: $gunMetal;
    font-weight: $heavy;
    font-size: 1.75rem;
}
small {
    padding-bottom: 10px;
}
.phone {
    display: flex;
    justify-content: space-between;
}
.centered {
    top: 66.67%;
}
.modal-container {
    position: relative;
    z-index: 9999;
    // max-height: calc(100% - 100px);
    .modal-content {
        max-height: 50vh;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .modal-buttons {
        width: calc(100% - 60px);
    }
}

.date-picker-wrapper {
    position: relative;
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
.all-day-checkbox {
    display: flex;
    justify-content: start;
    max-height: 20px !important;
    width: max-content;
    position: relative;
    left: 4px;
    font-size: $small;
    
    input[type="checkbox"] {
        position: relative;
        top: -2px;
        &:checked {
            accent-color: $gunMetal_20;
        }
    }
}

.hours-display {
    margin: 10px 0;
    padding: 15px;
    background: rgba($grey_20, 0.25);
    border-radius: $border-radius;
    
    p {
        margin: 0;
        font-size: $paragraph;
        color: $grey_20;
        font-weight: $medium;
        
        strong {
            color: $secondary;
            font-weight: $medium;
        }
    }
}


</style>