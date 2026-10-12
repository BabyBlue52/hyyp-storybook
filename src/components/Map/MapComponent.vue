<template>
    <div id="map">
        <div class="float-wrapper">
            <button class="geo-locate" @click="setViewToCurrentLocation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.507 19l-1.507-6-6-1.5 12-4.5-4.493 12z"/></svg>
                </button>
            <FilterComponent/>
        </div>
        <div></div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { createApp } from 'vue';
import mapboxgl from 'mapbox-gl'; // Ensure correct import syntax
import 'mapbox-gl/dist/mapbox-gl.css';
// import { mdiNearMe } from '@mdi/js';
import FilterComponent from '@/components/Map/FilterComponent.vue';

import SearchResultCardMini from '@/components/Cards/SearchResultCardMini.vue';
import { useVenueFilters } from '@/composables/useVenueFilters';

const token = `${import.meta.env.VITE_MAPBOX_API_KEY}`
const map_style = `${import.meta.env.VITE_MAPSTYLE}`
const isMobile = computed(() => matchMedia('(max-width: 768px)').matches);
const defaultZoom = computed(() => (isMobile.value ? 12 : 13) )
const focusZoom = computed(() => (isMobile.value ? 13 : 14));
export default {
    props: {
        markers: {
            type: Array,
            required: true,
        },
        center: {
            type: Array,
            required: true,
        },
        venueId: {
            type: Number,
            required: false,
            default: 0,
        },
        selectedVenue: {
            type: Object,
            required: false,
            default: null,
        },
        usePopups: {
            type: Boolean
        }
    },
    emits: ['venueSelected'],
    components: {
        FilterComponent
    },
    setup(props, { emit }) {
        const map = ref(null);
        const mapContainer = ref(null);
        const coords = ref(null);
        const markers = ref([]);
        const markerPopups = ref(new Map());
        const isPopupOpen = ref(false);
        const { isFiltersOpen } = useVenueFilters();
        // const previousVenue = ref(null);
        let resizeObserver = null;
        let resizeTimeout = null;
        let disposeMarkers = () => {};

        const handleResize = () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                if (map.value) {
                    map.value.resize();
                }
            }, 150);
        };

        const formatPinPrice = (venue) => {
            const raw = venue?.price_per_hr ?? venue?.pricePerHr ?? null;
            if (raw === '' || raw == null) return null;
            const n = Number(raw);
            if (!Number.isFinite(n) || n < 0) return null;
            return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(0)}`;
        };
//Custom pin 
        const createPricePin = (venue) => {
            const el = document.createElement('div');
            const price = formatPinPrice(venue);
            el.className = 'venue-marker-pin';
            const shape = document.createElement('div');
            shape.className = 'venue-marker-pin__shape';
            const label = document.createElement('span');
            label.className = 'venue-marker-pin__label';
            const tip = document.createElement('span');
            tip.className = 'venue-marker-pin__tip';
            label.textContent = price || '--'; // price or empty
            if (!price) el.classList.add('venue-marker-pin--empty');
            shape.appendChild(label);
            el.appendChild(shape);
            el.appendChild(tip);
            return el;
        };

        const createPopupComponent = (markerData) => {
            const container = document.createElement('div');
            container.id = `popup-${markerData.id}`;
            container.className = 'map-popup-mini';

            const popupApp = createApp(SearchResultCardMini, {
                location: markerData,
            });
            popupApp.mount(container);
            container._popupApp = popupApp;

            return container;
        };
       
        // Make sure this is run onload 
        onMounted(() => {
            mapboxgl.accessToken = token;

            if (!window.__hyypBlockMapboxEvents) {
                const originalFetch = window.fetch;
                window.fetch = function (input, init) {
                    const url = typeof input === 'string' ? input : input?.url;
                    if (url && url.includes('events.mapbox.com')) {
                        return Promise.resolve(new Response('', { status: 200 }));
                    }
                    return originalFetch.apply(this, arguments);
                };
                window.__hyypBlockMapboxEvents = true;
            }

            // Get the map container element
            const containerElement = document.getElementById('map');
            mapContainer.value = containerElement;

            map.value = new mapboxgl.Map({
                container: 'map',
                style: map_style,
                center: props.center, // change to coord from rendered call 
                minZoom: 5, 
                zoom: defaultZoom.value,
               
                transformRequest: (url) =>
                    url && url.includes('events.mapbox.com') ? { url: 'about:blank' } : { url }
            });

            setViewToCurrentLocation();

            const clearMarkers = () => {
                markers.value.forEach((marker) => {
                    const content = marker.getPopup()?.getElement()?.querySelector('.map-popup-mini');
                    content?._popupApp?.unmount();
                    marker.remove();
                });
                markers.value = [];
                markerPopups.value.clear();
            };

            const addMarkers = (list) => {
                if (!map.value) return;
                (list || []).forEach((i) => {
                    if (isValidCoordinates(i.coordinates)) {
                        const marker = new mapboxgl.Marker({
                                element: createPricePin(i),
                                className: 'venue-marker',
                                anchor: 'bottom',
                        })
                            .setLngLat(i.coordinates)
                            .addTo(map.value);
                        marker.getElement().addEventListener('click', (e) => {
                            e.stopPropagation();
                            emit('venueSelected', i);
                        });
                        if(props.usePopups) {
                            const popup = new mapboxgl.Popup({
                                offset: 0,
                                closeButton: false,
                                closeOnClick: true,
                                focusAfterOpen: false,
                                maxWidth: 'none',
                                className: 'map-popup-docked',
                                anchor: 'bottom',
                            });
                            popup.on('open', () => {
                                if (!popup.getElement()?.querySelector('.map-popup-mini')) {
                                    popup.setDOMContent(createPopupComponent(i));
                                }
                            });
                            marker.setPopup(popup)
                        }
                        markers.value.push(marker);
                        markerPopups.value.set(i.id, { marker, venueData: i });
                    
                    } else {
                        console.error(`Invalid coordinates for marker: ${i.title}`)
                    }
                });
            };

            const setSelectedMarker = (venueId) => {
                const selectedId = venueId == null ? null : Number(venueId)
                markerPopups.value.forEach(({ marker }, id) => {
                    marker.getElement().classList.toggle('is-selected', Number(id) === selectedId)
                })
            }

            disposeMarkers = clearMarkers;
            addMarkers(props.markers);

            watch(
                () => (props.markers || []).map((marker) => `${marker.id}:${marker.price_per_hr ?? ''}`).join(','),
                () => {
                    clearMarkers();
                    addMarkers(props.markers);
                    if (props.selectedVenue) {
                        setSelectedMarker(props.selectedVenue.id);
                    }
                }
            );

            watch(
                () => props.center,
                (center) => {
                    if (map.value && center?.[0] != null && center?.[1] != null) {
                    map.value.flyTo({ center: [center[0], center[1]], speed: 1.31, zoom: focusZoom.value });
                    }
                },
                { deep: true },
            );
            watch(
                () => props.selectedVenue,
                (venue) => {
                    if (!venue) {
                        setSelectedMarker(null)
                        closeAllPopups();
                        isPopupOpen.value = false;
                        return
                    }
                    if(!map.value || !markerPopups.value.has(venue.id)) return;
                    setSelectedMarker(venue.id)
                    if (props.usePopups) {
                        closeAllPopups();
                        const { marker } = markerPopups.value.get(venue.id);
                        setTimeout(() => marker.togglePopup(), 200);
                        isPopupOpen.value = true;
                    }
                },
            );

            watch(isFiltersOpen, (open) => {
                if (!open) return;
                closeAllPopups();
                setSelectedMarker(null);
                isPopupOpen.value = false;
            });

            window.addEventListener('resize', handleResize);

            // Use ResizeObserver to watch the map container for size changes
            if (mapContainer.value) {
                resizeObserver = new ResizeObserver(() => {
                    handleResize();
                });
                resizeObserver.observe(mapContainer.value);
            }
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
            if (resizeObserver && mapContainer.value) {
                resizeObserver.unobserve(mapContainer.value);
                resizeObserver.disconnect();
            }
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            disposeMarkers();
            if (map.value) {
                map.value.remove();
                map.value = null;
            }
        });

        // GeoLocation of User
        const setViewToCurrentLocation = () => {
            const stored = sessionStorage.getItem("coords");
            if (stored) {
                try {
                    coords.value = JSON.parse(stored);
                    if (map.value && coords.value?.lng != null && coords.value?.lat != null) {
                        map.value.setCenter([coords.value.lng, coords.value.lat]);
                    }
                } catch {
                    sessionStorage.removeItem("coords");
                }
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        map.value.setCenter([longitude, latitude]); // Important: [lng, lat] order
                        map.value.setZoom(defaultZoom.value); // Adjust zoom level as needed

                        const setSessionCoords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        sessionStorage.setItem('coords', JSON.stringify(setSessionCoords));


                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Handle error, e.g., display a message to the user

                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                alert("Your browser does not support geolocation.");
            }
        };

        // Helper function to validate latitude and longitude
        const isValidCoordinates = (coords) => {
            const [lng, lat] = coords;
            return (
                typeof lng === 'number' &&
                typeof lat === 'number' &&
                lng >= -180 &&
                lng <= 180 &&
                lat >= -90 &&
                lat <= 90
            );
        }
        const closeAllPopups = () => {
            markerPopups.value.forEach((value) => {
                value.marker.getPopup()?.remove();
            });
        }
        return {
            map,
            setViewToCurrentLocation,
        }
    }
}
</script>

<style lang="scss">
#map {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
}
#map .mapboxgl-popup.map-popup-docked {
    position: absolute !important;
    top: auto !important;
    bottom: 16px !important;
    left: 12px !important;
    right: 12px !important;
    transform: none !important;
    width: auto !important;
    max-width: none !important;
    z-index: 10;
}
#map .map-popup-docked .mapboxgl-popup-tip {
    display: none;
}
.mapboxgl-popup-content {
    max-height: max-content;
    width: 400px;
    padding: 0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $boxShadow;
    .map-popup-mini,
    .search-result-block {
        width: 100%;
        margin: 0;
        max-height: none;
    }
    .map-popup-mini .search-result-block > a {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 25;
    }
    a,
    a:link,
    a:active {
        text-decoration: none;
        color: $black;
    }
}
#map .map-popup-docked .mapboxgl-popup-content {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
}
.mapboxgl-popup {
    transition-property: opacity;
    transition-duration: 0.2s;
}

.mapboxgl-popup-close-button {
    display: none;
}

.venue-marker-pin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    cursor: pointer;
    transform-origin: bottom center;
    transition: transform 0.15s ease;
    &__shape {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        min-height: 28px;
        padding: 4px 12px;
        background: $gunMetal;
        border-radius: 999px;
        box-shadow: $boxShadow;
        color: $offWhite;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }
    &__label {
        display: block;
        font-family: $poppins;
        font-size: $paragraph;
        font-weight: $medium;
        line-height: 1;
        white-space: nowrap;
    }
    &__tip {
        width: 0;
        height: 0;
        margin-top: -2px;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 9px solid $gunMetal;
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.12));
        transition: border-top-color 0.15s ease;
    }
    &--empty {
        .venue-marker-pin__shape {
            background: $gunMetal
        }
        .venue-marker-pin__tip {
            border-top-color: $gunMetal;
        }
    }
    &:hover,
    &.is-selected {
        .venue-marker-pin__shape {
            background: $gunMetal_60;
            border-color: $gunMetal_60;
            color: $gunMetal;
            transform: scale(1.05);
            filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));
        }
        .venue-marker-pin__tip {
            position: relative;
            top: 0px;
            border-top-color: $gunMetal_60;
        }
        .venue-marker-pin__label {
            font-weight: $heavy;
        }
    }
    &--empty:hover,
    &--empty.is-selected {
        .venue-marker-pin__shape {
            background: $gunMetal_60;
            border-color: $gunMetal_60;
        }
        .venue-marker-pin__tip {
            border-top-color: $gunMetal_60;
        }
    }
}

.float-wrapper {
    position: absolute;
    left: 1%;
    top: 2%;
    z-index: 9;
    max-height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    
}
@media screen and (max-width: 768px) {
    .float-wrapper .filters-wrapper {
        display: none;
    }
    #map .mapboxgl-popup.map-popup-docked {
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
    }
    #map .map-popup-docked .mapboxgl-popup-content {
        max-width: none;
        border-radius: 16px 16px 0 0;
    }
    .venue-marker-pin.is-selected {
        transform: scale(1.18);
        transform-origin: bottom center;
    }
}
</style>