<template>
    <form class="category-and-tags-form" style="max-width: 650px; margin-top: 10px;" @submit.prevent>
        <div class="row mt-0">
            <div
                v-for="option in venueTypeOptions"
                :key="option.value"
                @click="selectVenueType(option.value)"
                :class="['hyyp-card', { selected: venueType === option.value }]"
            >
                <v-icon :icon="option.icon" size="32" class="card-icon" />
                <p>{{ option.label }}</p>
                <v-icon v-if="venueType === option.value" icon="mdi-check-circle" size="18" class="icon-check"/>
            </div>
        </div>
        <div class="spacer"></div>
        <!-- <div class="row mt-0">
            <TextArea label="Business Policy" v-model="businessPolicy" @update:modelValue="emitPolicy" />
        </div> -->
        <h3> Choose the amenities that are available at your venue.</h3>
        <div class="inline-tags">
            <Tag
                v-for="tag in catalog"
                :key="tag.value"
                :tag="tag.name"
                :value="tag.value"
                :isSelected="selectedTags.includes(tag.value)"
                @toggleTag="toggleTag(tag.value)"
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type PropType } from 'vue';
import TextArea from '@/components/UI/TextArea.vue';
import Tag from '@/components/UI/Tag.vue';
import { fetchSearchTags, FALLBACK_TAGS } from '@/lib/tags';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Record<string, unknown>>,
        default: () => ({})
    },
    // Trigger to batch the form data to the parent component
    flushTrigger: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['update:modelValue', 'flushed']);

const venueTypeOptions = [
    { value: 'bar-restaurant', label: 'Bar/Restaurant', icon: 'mdi-food-fork-drink' },
    { value: 'event-space', label: 'Event Space', icon: 'mdi-seat' },
    { value: 'residence', label: 'Residence', icon: 'mdi-home' },
];

const venueType = ref<string>((props.modelValue?.venueDetails as { venueType?: string })?.venueType ?? '');
const businessPolicy = ref<string>((props.modelValue?.venue as { business_policy?: string })?.business_policy ?? '');
const catalog = ref(FALLBACK_TAGS);
const selectedTags = ref<string[]>((props.modelValue?.venueDetails as { searchTags?: string[] })?.searchTags ?? []);

onMounted(async () => {
    catalog.value = await fetchSearchTags();
    const vd = props.modelValue?.venueDetails as { venueType?: string; searchTags?: string[] } | undefined;
    if (vd?.venueType) venueType.value = vd.venueType;
    if (vd?.searchTags) selectedTags.value = [...vd.searchTags];
});

watch(
    () => props.modelValue,
    (val) => {
        const vd = val?.venueDetails as { venueType?: string; searchTags?: string[] } | undefined;
        const v = val?.venue as { business_policy?: string } | undefined;
        if (vd?.venueType !== undefined) venueType.value = vd.venueType;
        if (v?.business_policy !== undefined) businessPolicy.value = v.business_policy;
        if (vd?.searchTags) selectedTags.value = [...vd.searchTags];
    },
    { deep: true }
);

watch(
    () => props.flushTrigger,
    () => {
        const venueDetails = {
            ...(props.modelValue?.venueDetails as object || {}),
            venueType: venueType.value,
            searchTags: [...selectedTags.value],
        };
        emit('update:modelValue', { ...props.modelValue, venueDetails });
        emit('flushed');
    }
);

function emitVenueDetails() {
    const venueDetails = {
        ...(props.modelValue?.venueDetails as object || {}),
        venueType: venueType.value,
        searchTags: [...selectedTags.value],
    };
    emit('update:modelValue', { ...props.modelValue, venueDetails });
}

function selectVenueType(value: string) {
    venueType.value = value;
    emitVenueDetails();
}

function toggleTag(tag: string) {
    const idx = selectedTags.value.indexOf(tag);
    if (idx >= 0) {
        selectedTags.value = selectedTags.value.filter((t) => t !== tag);
    } else {
        selectedTags.value = [...selectedTags.value, tag];
    }
    emitVenueDetails();
}
</script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;

.hyyp-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc((100% - 20px) / 3);
    min-width: 120px;
    height: 100px;
    border-radius: $border-radius * 2;
    cursor: pointer;
    border: 2px solid $grey_80;
    padding: 10px;
    position: relative;
    p {
        position: absolute;
        white-space: nowrap;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: $medium;
        font-size: $paragraph;
        color: $grey_40;
    }
    .card-icon {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: $grey_40;
    }
    &.selected {
        border: $gunMetal_40 solid 3px;
        transform: scale(1.05);
        p, .card-icon, .v-icon {
            color: $gunMetal_20;
        }
        .icon-check {
            position: absolute;
            bottom: 2px;
            right: 2px;
        }
    }
}
h3 {
    color: $grey_40;
    padding-bottom: 10px;
}
.inline-tags {
    display: flex;
    flex-wrap: wrap;
    .tag {
        margin: 5px;
    }
}
.spacer {
    height: 40px;
}
</style>
