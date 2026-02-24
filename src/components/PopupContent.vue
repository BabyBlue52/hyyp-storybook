<template>
    <div class="popup-content">
        <div class="venue-info">
            <h3>{{ props.venue.venue_name }}</h3>
            <label class="venue-district">{{ venue.venue_district }}</label>
        </div>
    
        <div class="venue-image">
            <img :src="venue.imageData" :alt="venue.venue_name" />
            <h4>${{ venue.price_per_hr }}/hr </h4>
        </div>
    
        <div class="popup-actions">
            <a :href="`${baseUrl}/venues/${venue.id}`" target="_blank">
                <Button :text='"Check Availability"' />
            </a>
        </div>
    </div>
</template>

<script setup>
import Button from '@/components/Buttons/Button.vue';
import { defineProps } from 'vue';
const baseUrl = `${process.env.VUE_APP_BASE_URL}`
// Define props using defineProps
const props = defineProps({
    venue: {
        type: Object,
        required: true
    },
    onClose: {
        type: Function,
        default: () => {}
    }
});
</script>

<style lang="scss" scoped>
.mapboxgl-popup-content {
    max-height: max-content;
    width: max-content;
    padding: 10px 20px;
    border-radius: $border-radius;
    h3,
    h4 {
        margin: 0;
    }
    h3 {
        border-bottom: 2px solid transparent;
    }
    a,
    a:link,
    a:active,
    a:focus {
        text-decoration: none;
        color: $black;
        width: 100%;
        outline: none;
    }
    label {
        position: relative;
        top: -8px;
        font-style: italic;
    }
}

.popup-content {
    min-width: 250px;
    padding: 10px 0 0 0;
    border-radius: $border-radius;
    .venue-info {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
        h3 {
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: $black;
            font-family: $poppins;
            text-align: left;
        }
        .venue-district {
            margin: 0;
            font-size: 12px;
            color: $grey_20;
        }
    }
    .venue-image {
        position: relative;
        margin-bottom: 5px;
        img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
        }
        h4 {
            position: absolute;
            right: 10px;
            bottom: 5px;
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: 500;
            width: max-content;
            padding: 4px 8px;
            background: white;
            border-radius: $border-radius;
        }
    }
    .popup-actions {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
    }
    .venue-tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        .tag {
            padding: 4px 8px;
            background-color: $grey;
            color: $grey_20;
            font-size: 10px;
            border-radius: 12px;
            font-weight: 500;
        }
    }
}
</style>
