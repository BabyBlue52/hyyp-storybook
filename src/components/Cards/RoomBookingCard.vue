<template>
    <div class="room-booking-card" :class="isComplete ? 'booked' : 'pending'">
        <p class="card-header">{{ isComplete ? 'Room Booked' : 'Request Pending' }}</p>
        <p v-if="timeLabel" class="timestamp">{{ timeLabel }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    booking: {
        type: Object,
        required: true,
    },
});

const isComplete = computed(() => props.booking?.bookingStatus === 'complete');

function formatTime(value) {
    if (!value || typeof value !== 'string') return '';
    // Accept "20:00" or "8:00PM"
    if (/[ap]m/i.test(value)) return value;
    const [hStr, mStr = '00'] = value.split(':');
    let h = Number(hStr);
    if (!Number.isFinite(h)) return value;
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${String(mStr).padStart(2, '0')}${suffix}`;
}

const timeLabel = computed(() => {
    const start = formatTime(props.booking?.startTime);
    const end = formatTime(props.booking?.endTime);
    if (!start && !end) return '';
    if (start && end) return `${start} - ${end}`;
    return start || end;
});
</script>

<style lang="scss" scoped>
.room-booking-card {
    border-radius: $border-radius;
    border: 2px solid $grey_30;
    padding: 10px 20px;
    background: white;
    cursor: pointer;
    p.card-header {
        text-decoration: underline;
    }
    .timestamp {
        margin: 0;
        font-size: $small;
    }
    &.booked {
        border-color: $success;
        p.card-header {
            color: $success_dark;
        }
        &:hover {
            background: rgba($success, 0.08);
        }
    }
    &.pending {
        border-color: $error;
        p.card-header {
            color: $error;
        }
        &:hover {
            background: rgba($error, 0.05);
        }
    }
}
</style>
