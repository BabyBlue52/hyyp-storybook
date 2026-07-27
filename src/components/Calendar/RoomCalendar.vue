<template>
    <div class="availability-calendar-wrap">
    
        <!-- Room Calendar Container -->
        <v-container>
            <v-row>
                <v-col cols="8">
                    <h3>Calendar</h3>
                    <div class="divider"></div>
                    <div class="row justify-start">
                        <BlockButton text="Weekends" :blocked="weekendsOn" @toggle="onToggleWeekend" />
                        <BlockButton text="Weekdays" :blocked="weekdaysOn" @toggle="onToggleWeekdays" />
                    </div>
                    <div class="row justify-start flex-wrap">
                        <BlockButton
                            v-for="day in dayButtons"
                            :key="day.index"
                            :text="day.label"
                            :blocked="isDayBlocked(day.index)"
                            @toggle="onToggleDay(day.index)"
                        />
                    </div>
                    
                    <div class="divider"></div>
                    <v-date-picker
                        class="room-availability-picker"
                        :model-value="blockedPickerModel"
                        :events="calendarEvents"
                        :weekday-format="'short'"
                        multiple
                        show-adjacent-months
                        :disabled="loading"
                        v-model:month="calMonth"
                        v-model:year="calYear"
                        hide-header
                        @update:model-value="onBlockedPickerUpdate"
                    >
                        <template #day="{ props: dayProps, item }">
                            <v-btn
                                v-bind="{ ...dayProps, onClick: undefined }"
                                @click="onDayActivate(item, dayProps)"
                            >
                                {{ item.localized }}
                                <div
                                    v-if="dayEventColors(item.isoDate).length"
                                    class="v-date-picker-month__events"
                                >
                                    <v-badge
                                        v-for="(color, i) in dayEventColors(item.isoDate)"
                                        :key="`${item.isoDate}-${i}`"
                                        dot
                                        :color="color"
                                    />
                                </div>
                            </v-btn>
                        </template>
                    </v-date-picker>
                    <div class="calendar-actions">
                        <span v-if="blockedDateKeys.length" class="calendar-count">
                                    {{ blockedDateKeys.length }} date(s) blocked
                                </span>
                        <span v-else class="calendar-count muted">No blocked dates</span>
                        <div class="calendar-buttons">
                            <button type="button" class="calendar-link-btn" :disabled="loading || !blockedDateKeys.length" @click="clearBlockedDates">
                                        Clear all
                                    </button>
                            <SecondaryButton text="Save calendar" :disabled="loading || disabled" @click="saveBlockedDates" />
                        </div>
                    </div>
                    <p v-if="calendarNotice" class="calendar-notice" :class="{ error: calendarIsError }">
                        {{ calendarNotice }}
                    </p>
                </v-col>
                <v-col cols="4">
                    <div class="d-flex space-between align-center">
                    <h3>Bookings</h3>
                    <p v-if="selectedBookingDate" class="bookings-date-label">{{ selectedBookingDateLabel }}</p>
                </div>
                    <div class="divider"></div>
                    <div class="bg">
                        <RoomBookingCard
                            v-for="booking in visibleBookings"
                            :key="booking.id ?? `${booking.date}-${booking.startTime}`"
                            :booking="booking"
                        />
                        <p v-if="!selectedBookingDate" class="bookings-empty">
                            Select a date to view bookings
                        </p>
                        <p v-else-if="!visibleBookings.length" class="bookings-empty">
                            No bookings on this date
                        </p>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
import BlockButton from "../Buttons/BlockButton.vue";
import RoomBookingCard from "../Cards/RoomBookingCard.vue";

type BookingRecord = {
    id?: number | string;
    date?: string;
    bookingStatus?: 'complete' | 'pending' | string;
    startTime?: string;
    endTime?: string;
};

const props = withDefaults(
    defineProps<{
        modelValue?: string[];
        /** Bookings shown as calendar dots (complete = green, pending = red). */
        bookings?: BookingRecord[];
        loading?: boolean;
        disabled?: boolean;
        /** Parent persist fn — awaited so success/error notices are accurate. */
        saveHandler?: (dates: string[]) => Promise<void> | void;
    }>(),
    {
        modelValue: () => [],
        bookings: () => [],
        loading: false,
        disabled: false,
        saveHandler: undefined,
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', v: string[]): void;
    (e: 'save', v: string[]): void;
}>();

const loading = computed(() => Boolean(props.loading));
const disabled = computed(() => Boolean(props.disabled));
const blockedDateKeys = ref<string[]>([]);
const calendarNotice = ref('');
const calendarIsError = ref(false);

const dayButtons = [
  { label: 'Sun', index: 0 },
  { label: 'Mon', index: 1 },
  { label: 'Tue', index: 2 },
  { label: 'Wed', index: 3 },
  { label: 'Thu', index: 4 },
  { label: 'Fri', index: 5 },
  { label: 'Sat', index: 6 },
]
const now = new Date()
const calMonth = ref(now.getMonth())
const calYear = ref(now.getFullYear())
const RANGE_MONTHS = 6

/** complete → green, pending → red (matches RoomBookingCard) */
const BOOKING_STATUS_DOT: Record<string, string> = {
    complete: '#59d96c',
    pending: '#dc3545',
};

/**
 * Localization of Vue Calendar
 */
function dateToLocalKey(input) {
    if (input == null) return null;
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function keyToLocalDate(key) {
    if (typeof key !== 'string') return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(key);
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const d = Number(m[3]);
    if (!y || !mo || !d) return null;
    return new Date(y, mo - 1, d);
}

function normalizeBlockedDates(raw) {
    if (!raw || !Array.isArray(raw)) return [];
    const out = [];
    for (const item of raw) {
        if (typeof item === 'string') {
            const k = item.slice(0, 10);
            if (/^\d{4}-\d{2}-\d{2}$/.test(k)) out.push(k);
        } else {
            const k = dateToLocalKey(item);
            if (k) out.push(k);
        }
    }
    return [...new Set(out)].sort();
}

watch(
    () => props.modelValue,
    (next) => {
        blockedDateKeys.value = normalizeBlockedDates(next);
    }, { immediate: true }
);

/**
 * VDatePicker events map from bookings:
 * { 'YYYY-MM-DD': color | color[] }
 */
const calendarEvents = computed(() => {
    const map: Record<string, string | string[]> = {};
    for (const booking of props.bookings ?? []) {
        const key = typeof booking.date === 'string' ? booking.date.slice(0, 10) : null;
        const color = booking.bookingStatus
            ? BOOKING_STATUS_DOT[booking.bookingStatus]
            : null;
        if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(key) || !color) continue;
        const colors = Array.isArray(map[key]) ? map[key] as string[] : map[key] ? [map[key] as string] : [];
        if (!colors.includes(color)) colors.push(color);
        map[key] = colors.length === 1 ? colors[0] : colors;
    }
    return Object.keys(map).length ? map : null;
});

/** Date key (YYYY-MM-DD) whose bookings are shown in the sidebar. */
const selectedBookingDate = ref<string | null>(null);

const visibleBookings = computed(() => {
    const key = selectedBookingDate.value;
    if (!key) return [];
    return (props.bookings ?? []).filter(
        (b) => typeof b.date === 'string' && b.date.slice(0, 10) === key
    );
});

const selectedBookingDateLabel = computed(() => {
    const d = selectedBookingDate.value ? keyToLocalDate(selectedBookingDate.value) : null;
    if (!d) return '';
    return d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
});

function onDayActivate(item, dayProps) {
    const key = toDateKey(item?.isoDate) ?? dateToLocalKey(item?.date);
    if (key) selectedBookingDate.value = key;
    // Preserve normal blocked-date toggle from VDatePicker
    dayProps?.onClick?.();
}

function toDateKey(value) {
    if (value == null) return null;
    const s = String(value);
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
    return m ? m[1] : null;
}

function dayEventColors(isoDate) {
    const key = toDateKey(isoDate);
    if (!key || !calendarEvents.value) return [];
    const raw = calendarEvents.value[key];
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [raw];
}

/**
 * VDatePicker watches model changes and jumps the visible month to the
 * *last* selected date. Keep dates in the currently viewed month at the
 * end of the array so weekday bulk-updates do not advance 6 months ahead.
 */
const blockedPickerModel = computed(() => {
    const dates = blockedDateKeys.value.map(keyToLocalDate).filter(Boolean);
    const m = calMonth.value;
    const y = calYear.value;
    return [...dates].sort((a, b) => {
        const aInView = a.getMonth() === m && a.getFullYear() === y;
        const bInView = b.getMonth() === m && b.getFullYear() === y;
        if (aInView !== bInView) return aInView ? 1 : -1;
        return a.getTime() - b.getTime();
    });
});

/*
These buttons toggle if weekdays or week ends are blacked on the calendar
*/
const blockedDays = ref(new Set()) // e.g. Set([0, 6])
const WEEKEND = [0, 6]
const WEEKDAYS = [1,2,3,4,5]
function toggleDays(days, on) {
    const next = new Set(blockedDays.value)
    for (const d of days) on ? next.add(d) : next.delete(d)
    blockedDays.value = next
    applyWeekBlocksToCalendar();
}
function isDayBlocked(i) {
  return blockedDays.value.has(i)
}

const weekendsOn = computed(() => WEEKEND.every((d) => blockedDays.value.has(d)))
const weekdaysOn = computed(() => WEEKDAYS.every((d) => blockedDays.value.has(d)))

function onToggleWeekend() {
  toggleDays(WEEKEND, !weekendsOn.value)
}
function onToggleWeekdays() {
  toggleDays(WEEKDAYS, !weekdaysOn.value)
}
function onToggleDay(dayIndex) {
  toggleDays([dayIndex], !blockedDays.value.has(dayIndex))
}

function datesForBlockedDays(weekdaySet, start, end){ 
    const keys = []
    const d = new Date(start)
    d.setHours(0,0,0,0)
    while(d <= end) {
        if(weekdaySet.has(d.getDay())) {
            const k = dateToLocalKey(d)
            if(k) keys.push(k)
        }
    d.setDate(d.getDate() + 1)
    }
    return keys
}

function applyWeekBlocksToCalendar() {
    const keepMonth = calMonth.value
    const keepYear = calYear.value

    const start  = new Date()
    start.setHours(0,0,0,0)
    const end = new Date(start)
    end.setMonth(end.getMonth() + RANGE_MONTHS)

    const outside = blockedDateKeys.value.filter((key) => {
        const d = keyToLocalDate(key)
        return d && (d < start || d > end)
    })

    const fromButtons = datesForBlockedDays(blockedDays.value, start, end)
    blockedDateKeys.value = [...new Set([...outside, ...fromButtons])].sort()
    calendarNotice.value = ''
    emit('update:modelValue', [...blockedDateKeys.value])

    // VDatePicker may still emit update:month/year from its model watch — snap back.
    nextTick(() => {
        nextTick(() => {
            calMonth.value = keepMonth
            calYear.value = keepYear
        })
    })
}
function onBlockedPickerUpdate(v) {
    const arr = Array.isArray(v) ? v : v != null ? [v] : [];
    blockedDateKeys.value = [...new Set(arr.map(dateToLocalKey).filter(Boolean))].sort();
    calendarNotice.value = '';
    emit('update:modelValue', [...blockedDateKeys.value]);
}

function clearBlockedDates() {
    blockedDateKeys.value = [];
    blockedDays.value = new Set()
    emit('update:modelValue', []);
}

/**
 * Persist blocked dates via parent `saveHandler` (preferred) or `save` emit.
 */
const saveBlockedDates = async () => {
    if (loading.value || disabled.value) return;
    calendarNotice.value = '';
    calendarIsError.value = false;
    const dates = [...blockedDateKeys.value];
    try {
        if (props.saveHandler) {
            await props.saveHandler(dates);
        } else {
            emit('save', dates);
        }
        calendarNotice.value = 'Calendar saved!';
    } catch (err: any) {
        console.error('Error saving blocked dates:', err);
        calendarIsError.value = true;
        calendarNotice.value =
            err?.response?.data?.message || err?.message || 'Could not save calendar';
    }
    setTimeout(() => {
        calendarNotice.value = '';
    }, 10000)
}
</script>

<style lang="scss">

.availability-calendar-wrap {
    max-width: 100%;
    .v-container {
        padding: 0;
    }
    .room-availability-picker {
        width: 100%;
        max-width: 500px;
        position: relative;
        left: -10px;
        padding-bottom: 10px;
        .v-picker__body {
            justify-content: flex-start;
            height: 350px;
        }
        .v-date-picker-month,
        .v-date-picker-controls {
            position: relative;
            padding: 0;
            left: 10px;
        }
    }
    .calendar-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 0px 16px;
        border-top: 1px solid $grey_80;
    }
    .calendar-count {
        font-size: $paragraph;
        color: $gunMetal;
        &.muted {
            color: $grey_40;
        }
    }
    .calendar-buttons {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .calendar-link-btn {
        background: none;
        border: none;
        padding: 0;
        font-size: $paragraph;
        color: $gunMetal;
        text-decoration: underline;
        cursor: pointer;
        &:disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }
    }
    .calendar-notice {
        margin: 0 16px 12px;
        font-size: $paragraph;
        color: $gunMetal_20;
        text-align: center;
        &.error {
            color: $error;
        }
    }
}
.bookings-date-label {
    font-size: $small;
    color: $grey_40;
}
.bg {
    height: 100%;
    max-height: 520px;
    overflow: hidden;
    overflow-y: auto;
    background: $offWhite;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}
.bookings-empty {
    margin: 0;
    color: $grey_40;
    font-size: $small;
}
.v-badge--dot {
    transform: scale(0.8);
}
</style>