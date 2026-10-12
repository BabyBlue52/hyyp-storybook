<template>
    <div class="search-result-block">
      <a :href="`/venues/${location.id}`"></a>
      <div class="description-container">
        <div class="price-row"> 
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
            <a
                :href="`/venues/${location.id}`"
                target="_blank"
                rel="nopener noreferrer"
                @click.stop
            >
                <button class="new-tab-btn-inline">        
                        <v-icon icon="mdi-open-in-new"></v-icon>
                </button>
            </a>
        </div>
            <h4>{{ location.venue_name }}</h4>
            <label class="venue-districts text-left mt-1">{{ location.venue_district }}</label>
            <div class="tag-row">
                <div class="tag">pet-friendly</div>
                <div class="tag">drinks available</div>
            </div>
        </div>
        
        <div class="overlay-gradient"></div>
        <div class="img-container">
            <img :src="resolveImageUrl(location.imageData)" :alt="location.venue_name" />
            
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
        border: 5px solid $primary;
        transform: scale(1.03);
        box-shadow: 0px 5px 10px rgba($black,0.25);
    }
}

.search-result-block {
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: $cardWidth;
    height: $cardWidth;
    margin-left: 4px;
    margin-bottom: 20px;
    border: .5px $grey_80 solid;
    border-radius: calc($border-radius * 4);
    cursor: pointer;
    background: white;
    overflow: hidden;
    // a {
    //   display: none;
    // }
    .img-container {
        position: relative;
        margin: 0;
        min-width: 100%;
        min-height: $cardWidth;
        overflow: hidden;
        background: #DDDFE3;
        img {
            position: relative;
            object-fit: cover;
            min-height: inherit;
            max-height: 100%;
            width: inherit;
        }
    }

    .description-container {
        position: absolute;
        top: 8px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        height: calc(100% - 32px);
        width: calc(100% - 32px);
        padding: 0;
        margin: 8px 16px;
        z-index: 2;
        h4 {
            font-size: $subhead;
            text-align: start;
            margin: 0;
            color: white;
        }
        p, label {
            background: none;
            text-align: start;
            color: $offWhite;
            font-size: $paragraph;
            margin: 0;
        }
        .price-row {
            position: relative;
            top: 0;
            display: flex;
            justify-content: space-between;
            height: max-content;
            width: 100%;
            margin-bottom: auto;
        }
        .price-per-hr {
            left: auto;
            padding: 2px 8px;
            border-radius: 5px;
            background: rgba(white, 0.85);
            font-weight: $heavy;
            font-size: $small;
            pointer-events: none;
            width: max-content;
            height: max-content;
            &.no-price {
                left: auto;
                right: 5px;
                background: rgba($grey, 0.85);
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
        .tag-row {
            display: flex;
            gap: 5px 10px;
            flex-wrap: wrap;
            width: 100%;
            margin: 0;
            padding-top: 4px;

            .tag {
                width: max-content;
                border-radius: calc($border-radius / 2);
                padding: 2px 10px;
                text-transform: capitalize;
                font-size: 0.7rem;
                font-weight: bold;
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

@media screen and (max-width:768px) {
    .mobile-selected-card .search-result-block {
        width: 100%;
        margin:0;
        height: 150px;
        box-shadow: $heavyShadow;
    }
    .search-result-block {
        margin: 0 auto;
        position: relative;
        a {
            display: block;
            position: absolute;
            right: 0;
            width: 100%;
            min-height: 100%;
            z-index: 25;
        }
        .description-container {
            a {display: none;}
        }
    }   
}
</style>
