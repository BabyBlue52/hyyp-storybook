<template>
    <div class="availability-calendar-wrap">
        <small class="calendar-hint">
                            Select dates when this room should be unavailable for booking. Save to apply.
                        </small>
        <v-card variant="outlined" class="calendar-card mt-2">
            <v-date-picker class="room-availability-picker" :model-value="blockedPickerModel" multiple show-adjacent-months :disabled="loading" @update:model-value="onBlockedPickerUpdate" />
            <div class="calendar-actions">
                <span v-if="blockedDateKeys.length" class="calendar-count">
                                    {{ blockedDateKeys.length }} date(s) blocked
                                </span>
                <span v-else class="calendar-count muted">No blocked dates</span>
                <div class="calendar-buttons">
                    <button type="button" class="calendar-link-btn" :disabled="loading || !blockedDateKeys.length" @click="clearBlockedDates">
                                        Clear all
                                    </button>
                    <SecondaryButton text="Save calendar" :disabled="loading || roomId === 'new' || !roomType" @click="saveBlockedDates" />
                </div>
            </div>
            <p v-if="calendarNotice" class="calendar-notice" :class="{ error: calendarIsError }">
                {{ calendarNotice }}
            </p>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const normalizeAvailable = (data) =>
    data?.available !== undefined && data?.available !== null
        ? Boolean(data.available)
        : true;

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

/** Dates (YYYY-MM-DD) when the room is unavailable; persisted as `blockedDates` on PUT when the API supports it. */
const blockedDateKeys = ref([]);
const calendarNotice = ref('');
const calendarIsError = ref(false);

const blockedPickerModel = computed(() =>
    blockedDateKeys.value.map(keyToLocalDate).filter(Boolean)
);

function onBlockedPickerUpdate(v) {
    const arr = Array.isArray(v) ? v : v != null ? [v] : [];
    blockedDateKeys.value = [...new Set(arr.map(dateToLocalKey).filter(Boolean))].sort();
    calendarNotice.value = '';
}

function clearBlockedDates() {
    blockedDateKeys.value = [];
    calendarNotice.value = '';
}
const saveBlockedDates = async () => {
    if (roomId.value === 'new' || !roomType.value || loading.value) return;
    calendarNotice.value = '';
    calendarIsError.value = false;
    try {
        loading.value = true;
        await putRoom();
        calendarNotice.value = 'Calendar saved.';
    } catch (err) {
        console.error('Error saving blocked dates:', err);
        calendarIsError.value = true;
        calendarNotice.value =
            err.response?.data?.message || err.message || 'Could not save calendar';
    } finally {
        loading.value = false;
    }
}

</script>

<style lang="scss">
@use "@/assets/variables.scss" as *;
.availability-calendar-wrap {
    max-width: 100%;
    .calendar-hint {
        display: block;
        margin-top: 4px;
        color: $grey_40;
        font-size: 0.85rem;
        line-height: 1.35;
        max-width: 520px;
    }
    .calendar-card {
        max-width: 520px;
        background: transparent;
    }
    :deep(.room-availability-picker) {
        width: 100%;
        max-width: 100%;
    }
    .calendar-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px 16px;
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
        font-size: 0.875rem;
        color: $gunMetal_20;
        &.error {
            color: #b00020;
        }
    }
}
</style>