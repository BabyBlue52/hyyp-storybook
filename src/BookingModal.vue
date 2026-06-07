<template>
    
     <!-- For debugging purposes/storybook -->
    <!-- <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Modal</v-btn>
    </div> -->
    <!-- Must teleport out of .hyyp-wrapper (z-index: 1) or the overlay can never stack above HyypHeader (z-index 10 / 101). -->
    <Teleport to="body">
        <div v-if="$props.isOpen" class="topLevel">
            <div class="locked" @click="closeModal"></div>
            <div :class="[$props.isOpen ? 'fadeIn' : 'fadeOut']" class="centered" @click.stop>
                <v-container class="modal-container">
                    <button type="button" class="close-btn" @click="closeModal">
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                    </button>
            <div>
                <v-row class="modal-header">
                    <v-col cols="12" class="d-flex center">
                        <h2>{{ displayText }}</h2>
                        <small> Request Booking</small>
                    </v-col>
                </v-row>
                <div class="modal-content">
                    <v-row class="modal-layout">
                        <!-- Modal Inputs -->
                        <v-col cols="12" md="5" class="modal-form-col">
                            <v-row class="row">
                                <h4>Booking Information</h4>
                            </v-row>
                            <RoomSizeDropdown
                                :key="`room-size-${bookingData.roomSize}`"
                                v-model="bookingData.roomSize"
                                :options="dropdownOptions"
                            />
                            <v-row class="row">
                                <div class="hyyp-input w-100">
                                    <label>Select Date</label>
                                    <v-text-field type="date" v-model="bookingData.selectedDate"/>
                                </div>
                            </v-row>
                            <v-row class="row">
                                <v-col cols="6" >
                                    <TimeDropDown label="Start Time" v-model="bookingData.startTime" />
                                </v-col>
                                <v-col cols="6">
                                    <TimeDropDown label="End Time" v-model="bookingData.endTime" />
                                </v-col>
                                <TextArea
                                    label="message"
                                    placeholder="Leave a message for them explaining the nature of your request in detail"
                                    v-model="bookingData.message"
                                />
                                </v-row>
                        </v-col>
                        <v-col cols="12" md="7" class="modal-summary-col">
                                  <v-row class="row">
                                    <div class="modal-summary w-100">
                                        
                                        <div class="contact-header d-flex w-100 align-center">
                                            <AvatarLarge :user="user" />
                                            <div class="contact-details">
                                                <h4>{{ contactName }}</h4>
                                                <p v-if="userEmail">{{ userEmail }}</p>
                                                <p v-if="userPhone" class="phone">{{ userPhone }}</p>
                                                <p v-else-if="isAuthenticated" class="phone">No phone number listed</p>
                                            </div>
                                            
                                        </div>
                                        <hr />
                                        <v-row class="row align-center">
                                            <v-col cols="7">
                                                <div class="d-flex align-center mx-2">
                                                    <input class="checkbox" type="checkbox" v-model="bookingData.usePhone">
                                                    <label v-if="!userPhone" @click="toggleUsePhone">Add Phone Number to request</label>
                                                    <label v-else>Prefer phone to contact</label>
                                                </div>
                                                
                                                    <TextInput
                                                    v-if="bookingData.usePhone && !userPhone"
                                                        class="ml-10 mb-4"
                                                        placeholder="(123)456-7890"
                                                        type="tel"
                                                        v-model="bookingData.phone"
                                                        :maxlength="13"
                                                    />   
                                            
                                            </v-col>
                                        </v-row>
                                        
                                        <div v-if="initialHours || bookingData.roomSize" class="column ">
                                            <v-row class="row" style="margin-left: 20px;">
                                                <v-col cols="6" sm="12">
                                                    <div class=" d-flex text-left column">
                                                        <label>Room size:</label>
                                                        <h4 v-if="bookingData.roomSize" class="info">{{ sizeLabel }}</h4>
                                                        <p v-else>No room selected</p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="6" sm="12">
                                                    <div class="d-flex text-left column">
                                                        <label class="">Duration:</label>
                                                        <h4 v-if="calculatedHours" class=" px-2 text-left info">{{ calculatedHours ? calculatedHours : initialHours }}</h4>                                    
                                                        <p v-else class="px-2 text-left">--</p>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12">
                                                    <div class="d-flex text-left column mt-4">
                                                        <label>Date requested:</label>
                                                        <h4 v-if="formattedDateRequested" class="px-2 text-left info">{{ formattedDateRequested }}</h4>
                                                        <p v-else ></p>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <hr/>
                                            <v-row class="row">
                                                <div class="estimated">
                                                    <p class="w-100"><strong>Estimated Total:</strong></p>
                                                    <h4 v-if="estimatedTotalDisplay" class="d-flex text-right mobile-text-left"><span>$</span>{{ estimatedTotalDisplay }} USD</h4>
                                                    <h4 v-else class="text-center mobile-text-left">--</h4>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                            </v-row>  
                                
                        </v-col>
                    </v-row>
                    <div class="modal-buttons">
                        <p v-if="submitError" class="submit-error">{{ submitError }}</p>
                        <button
                            type="button"
                            class="full-width"
                            :disabled="isSubmitting"
                            @click="submitRequest"
                        >
                            {{ isSubmitting ? 'Submitting…' : 'Submit Request' }}
                        </button>
                        <div class="d-flex justify-center">
                            <button type="button" class="inline-btn" @click="closeModal"><small>Cancel</small></button>
                        </div>
                    </div>
                </div>
            </div>
                </v-container>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import TimeDropDown from '@/components/UI/TimeDropdown.vue';
import TextInput from '@/components/UI/TextInput.vue';
import TextArea from '@/components/UI/TextArea.vue';
import { axiosInstance } from '@/lib/axios';
import { ref, watch, computed, reactive } from 'vue';
import RoomSizeDropdown from '@/components/UI/RoomSizeDropdown.vue';
import Avatar from '@/components/UI/Avatar.vue';
import { useUserStore } from '@/stores/user';
import AvatarLarge from '../UI/AvatarLarge.vue';

const emit = defineEmits(['update:isOpen']);

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: true
    },

    text: {
        type: String,
        default: 'Organization Name'
    },
    venueId: {
        type: [String, Number],
        default: null
    },
    initialHours: {
        type: [String, Number],
        default: 0
    },
    initialSize: {
        type: [String, Number],
        default: null
    },
    pricePerHr: {
        type: [String, Number],
        default: 0
    },
    availableRoomSizeOptions: {
        type: Array,
        default: () => []
    }
});
      
const userStore = useUserStore()
const user = computed(() => userStore.getUser)
const isAuthenticated = computed(() => userStore.getIsAuthenticated)

const localIsOpen = ref(props.isOpen)
const scrollPosition = ref(0)
const bookingData = reactive({
    selectedDate: null,
    startTime: '',
    endTime: '',
    firstName: '',
    lastName: '',
    phone: '',
    usePhone: false,
    roomSize: '',
    estimatedHours: '',
    estimatedTotal: '',
    message: '',
})

const dropdownOptions = computed(() => props.availableRoomSizeOptions ?? [])

const sizeLabel = computed(() => {
    const opt = props.availableRoomSizeOptions?.find((o) => o.value === bookingData.roomSize)
    return opt?.label ?? bookingData.roomSize ?? ''
})

const estimatedTotalDisplay = computed(() => {
    const hours = Number(bookingData.estimatedHours) || Number(props.initialHours) || 0
    const rate = Number(props.pricePerHr) || 0
    if (!rate || !hours) return ''
    return (rate * hours).toFixed(2)
})

const displayText = computed(() => props.text)
const isSubmitting = ref(false)
const submitError = ref(null)

const contactName = computed(() => {
    const u = user.value
    if (!u) return 'Guest'
    const combined = [u.firstName, u.lastName].filter(Boolean).join(' ').trim()
    return combined || u.fullName || 'Guest'
})

const userEmail = computed(() => {
    const u = user.value
    return u?.email || u?.emailId || ''
})

const userPhone = computed(() => user.value?.phone || '')
// *** 
// Converting Date
// ***
const formattedDateRequested = computed(() => {
    if (!bookingData.selectedDate) return '--'

    const datePart = formatBookingDate(bookingData.selectedDate)

    if (bookingData.startTime && bookingData.endTime) {
        const start = formatTimeCompact(bookingData.startTime)
        const end = formatTimeCompact(bookingData.endTime)
        return `${datePart}  ${start} - ${end}`
    }

    return datePart
})
function getOrdinal(day) {
    const suffixes = ['th', 'st', 'nd', 'rd']
    const mod100 = day % 100
    const suffix = suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0]
    return `${day}${suffix}`
}

function formatBookingDate(dateStr) {
    // Noon avoids timezone shifting the calendar day
    const date = new Date(`${dateStr}T12:00:00`)
    if (Number.isNaN(date.getTime())) return dateStr

    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const day = getOrdinal(date.getDate())
    const year = date.getFullYear()

    return `${weekday} ${month} ${day}, ${year}`
}

function formatTimeCompact(time24) {
    if (!time24) return ''
    const [hours, minutes] = time24.split(':').map(Number)
    const hour12 = hours % 12 || 12
    const ampm = hours < 12 ? 'am' : 'pm'

    if (minutes === 0) return `${hour12}${ampm}`
    return `${hour12}:${String(minutes).padStart(2, '0')}${ampm}`
}

// Seeding information from venue
function seedFromVenue() {
    bookingData.roomSize = props.initialSize != null && props.initialSize !== '' ? String(props.initialSize) : ''
    bookingData.estimatedHours = Number(props.initialHours) || 0
    const rate = Number(props.pricePerHr) || 0
    const hours = Number(props.initialHours) || 0
    bookingData.estimatedTotal = rate && hours ? (rate * hours).toFixed(2) : ''
}

function seedFromUser() {
    const u = user.value
    if (!u || !isAuthenticated.value) return

    bookingData.firstName = u.firstName || ''
    bookingData.lastName = u.lastName || ''
}

async function hydrateModalState() {
    if (isAuthenticated.value) {
        try {
            await userStore.fetchUserProfile()
        } catch (err) {
            console.error('Error loading user profile for booking modal:', err)
        }
    }
    seedFromVenue()
    seedFromUser()
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
watch(
    () => props.isOpen,
    async (open) => {
        if (open) {
            await hydrateModalState()
            localIsOpen.value = true
            toggleBodyScroll(true)
        } else {
            localIsOpen.value = false
            toggleBodyScroll(false)
        }
    },
    { immediate: true }
)
    function closeModal() {
        if (!localIsOpen.value) return;
        localIsOpen.value = false;
        toggleBodyScroll(false);
    }

watch(localIsOpen, (newVal) => {
    emit('update:isOpen', newVal)
})

watch(scrollPosition, (newPos) => {
    window.scrollTo(0, newPos)
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
    const toggleUsePhone = () => {
        bookingData.usePhone = !bookingData.usePhone
    }
    // Format phone number to (xxx)xxx-xxxx
    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters and limit to 10 digits
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
    
    function buildRequestPayload() {
    const u = user.value
    const name =
        u && isAuthenticated.value
            ? [u.firstName, u.lastName].filter(Boolean).join(' ').trim() || u.fullName || ''
            : `${bookingData.firstName} ${bookingData.lastName}`.trim()
    const email = userEmail.value.trim()
    const phone = bookingData.usePhone && bookingData.phone ? bookingData.phone : userPhone.value
    const date =
        bookingData.selectedDate && bookingData.startTime && bookingData.endTime
            ? `${bookingData.selectedDate} ${bookingData.startTime} – ${bookingData.endTime}`
            : bookingData.selectedDate || ''

    return {
        sender: name,
        name,
        email,
        phone,
        message: bookingData.message.trim(),
        roomSize: bookingData.roomSize,
        estimateHours: bookingData.estimatedHours,
        estimatedTotal: bookingData.estimatedTotal,
        date,
        src: props.text,
        sent: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }),
        status: '',
        ...(props.venueId != null && props.venueId !== ''
            ? { venueId: props.venueId }
            : {}),
    }
    }

const submitRequest = async () => {
    submitError.value = null

    if (!bookingData.roomSize) {
        submitError.value = 'Please select a room size.'
        return
    }
    if (!bookingData.selectedDate || !bookingData.startTime || !bookingData.endTime) {
        submitError.value = 'Please fill in date, start time, and end time.'
        return
    }

    const payload = buildRequestPayload()

    if (!payload.name || !payload.email || !payload.phone || !payload.message || !payload.date) {
        submitError.value = 'Please fill in date, times, contact details, and message.'
        return
    }

        isSubmitting.value = true
        try {
            await axiosInstance.post('/requests', payload)
            closeModal()
        } catch (err) {
            console.error('Error submitting request:', err)
            submitError.value =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                'Failed to submit request. Please try again.'
        } finally {
            isSubmitting.value = false
        }
    }
</script>

<style scoped lang="scss">
.topLevel {
    position: fixed;
    inset: 0;
    /* Above HyypHeader (10) and mobile bar (101); below Silktide icon (100000) if present */
    z-index: 10000;
    isolation: isolate;
}
h2 {
    margin: 10px 0;
    color: $gunMetal;
    font-weight: $medium;
    font-size: 1.75rem;
}
label,h4, strong {
    white-space: nowrap;
}
small {
    margin-top: -10px;
    padding-bottom: 10px;
}
.phone {
    display: flex;
    justify-content: space-between;
}
.centered {
    top: 50%;
}
.modal-container {
    position: relative;
    z-index: 999;
    width: min(66vw, 900px);

    .modal-layout {
        flex-wrap: nowrap;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        max-height: 70vh;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: auto;

        .modal-layout {
            flex: 1 1 auto;
            min-height: 0;
        }
    }

    .modal-summary {
        background: $offWhite;
        border-radius: $border-radius;
        padding: 20px 20px 40px 30px;
        margin-top: 0;
        input[type=checkbox] {
            margin-top: -7px;
            margin-left: 20px;
            margin-right: 10px;
            cursor: pointer;
        }
        label {
            background: inherit;
        }
        h4.info {
            padding-left: 12px;
            font-size: $paragraph;
        }
        .contact-header {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 12px;
        margin-bottom: 8px;
            div.contact-details {
                margin-left: 10px;
                p {
                    opacity: 0.5;
                    font-size: $small;
                }
            }
        }
        div.estimated {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 0 20px;
        }
    }
    
    .modal-buttons {
        position: relative;
        flex-shrink: 0;
        width: 100%;
        padding-top: 16px;
        margin-top: auto;
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
    border: 1px solid $grey_60;
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

.submit-error {
    position: absolute;
    top: -30px;
    left: 20px;
    margin: 0 auto 12px;
    font-size: $small;
    color: $error;
    text-align: center;
}
@media (max-width: 959px) {
    h2 {
        white-space: wrap;
        flex-wrap: wrap;
    }
    .modal-container {
        width: min(95vw, 900px);
        padding: 20px 5px;

        .modal-header {
            margin-bottom: 20px;
        }

        .modal-layout {
            flex-direction: column;

            > :deep(.v-col) {
                flex: 0 0 100%;
                max-width: 100%;
            }

            > :deep(.modal-form-col) {
                order: 1;
            }

            > :deep(.modal-summary-col) {
                order: 2;
            }
        }

        .modal-content {
            margin-top: -30px;

            .modal-layout {
                flex: none;
                min-height: unset;
            }

            .contact-header {
                flex-direction: column;
            }
        }

        .modal-summary {
            margin-top: 20px;
            padding: 20px;

            .info {
                white-space: wrap;
                flex-wrap: wrap;
            }

            .estimated {
                white-space: wrap;
                flex-wrap: wrap;
            }
        }

        .modal-buttons {
            order: 3;
            margin-top: 0;
        }
    }

    .mobile-text-left {
        justify-content: start;
        text-align: left;
    }
}

</style>