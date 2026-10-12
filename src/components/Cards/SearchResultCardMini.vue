<template>
    <div class="search-result-block">
      <a :href="`/venues/${location.id}`"></a>
        <div class="img-container">
            <div class="overlay"></div>
            <img :src="resolveImageUrl(location.imageData)" :alt="location.venue_name" />
            <template v-if="formatPricePerHr(location) !== null">
                <div class="price-per-hr _boxShadow">
                    From <span>$</span>{{ formatPricePerHr(location) }}/hr
                </div>
            </template>
            <template v-else>
                <div class="price-per-hr no-price">
                    <p>Contact for pricing</p>
                </div>
            </template>
            
        </div>
        <div class="description-container">
            <h4>{{ location.venue_name }}</h4>
            <label class="venue-districts text-left mt-1">{{ location.venue_district }}</label>
            <div class="tag-row">
                <div class="tag">pet-friendly</div>
                <div class="tag">drinks available</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { resolveImageUrl } from '@/lib/fallback-image.js';
export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    setup() {
        const formatPricePerHr = (venueLike) => {
            const raw = venueLike?.price_per_hr ?? venueLike?.pricePerHr ?? null;
            if (raw === '' || raw == null) return null;
            const n = Number(raw);
            if (!Number.isFinite(n) || n < 0) return null;
            return Number.isInteger(n) ? n : n.toFixed(2);
        };

        return {
            resolveImageUrl,
            formatPricePerHr,
        };
    }
}
</script>

<style lang="scss" scoped>
@use "sass:color";
.selected {
    .search-result-block {
        border: 2px solid $gunMetal_40;
        transform: scale(1.03);
        box-shadow: 0px 1px 1px rgba($black,0.15);
    }
}
.search-result-block {
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: max-content;
    max-height: 120px;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
    background: white;
    overflow: hidden;
    // a {
    //   display: none;
    // }
    .img-container {
        position: relative;
        margin: 0;
        max-height: 100%;
        width: 100%;
        max-width: 160px;
        height: 120px;
        overflow: hidden;
        background: #DDDFE3;
        img {
            position: relative;
            object-fit: cover;
            min-height: 100%;
            height: 120px;
            width: inherit;
            z-index: 0;
        }
        .overlay {
            position: absolute;
            z-index: 1;
        }
        .price-per-hr {
            position: absolute;
            bottom: 5px;
            right: 5px;
            left: auto;
            padding: 4px 8px;
            border-radius: 5px;
            background: white;
            font-weight: $medium;
            font-size: $paragraph;
            pointer-events: none;
            width: max-content;
            z-index: 2;
            &.no-price {
                left: auto;
                right: 5px;
                background: $grey;
                color: white;
                padding: 2px 12px;
                height: 24px;
                p {
                    font-size: $small;
                    font-weight: $heavy;
                    text-transform: capitalize;
                }
            }
        }
    }
    .description-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        height: 120px;
        padding: 8px 16px;
        h4 {
            font-size: $paragraph;
            text-align: start;
            margin: 0;
        }
        p,label {
            text-align: start;
            font-size: $paragraph;
            color: $grey_40;
            font-style: italic;
            margin: 0;
        }
        .tag-row {
            display: flex;
            gap: 5px 10px;
            flex-wrap: wrap;
            width: 100%;
            margin: 0;
            padding-top: 10px;
            margin-top: auto;
            .tag {
                width: max-content;
                border-radius: calc($border-radius / 2);
                padding: 2px 10px;
                text-transform: capitalize;
                font-size: $label;
                font-weight: $medium;
                background: $success;
                color: $black;
                &:nth-child(2) {
                    background: $violet_light;
                    color: $violet;
                }
            }
        }
    }
}
.search-result-block > a {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 25;
}
@media screen and (max-width:768px) {
  .mobile-selected-card .search-result-block {
    width: 100%;
    margin:0;
    height: 150px;
    box-shadow: $heavyShadow;
  }
}
</style>
