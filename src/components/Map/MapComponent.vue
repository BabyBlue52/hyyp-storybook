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

import PopupContent from '@/components/Map/PopupContent.vue';

const token = `${import.meta.env.VITE_MAPBOX_API_KEY}`
const map_style = `${import.meta.env.VITE_MAPSTYLE}`
const isMobile = computed(() =>  matchMedia('(max-width: 768ox)').matches);
const defaultZoom = computed(() => (isMobile.value ? 9 : 11) )
const focusZoom = computed(() => (isMobile.value ? 11 : 12));
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
        // const previousVenue = ref(null);
        let resizeObserver = null;
        let resizeTimeout = null;
        let originalFetch = null;

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

        // Function to create Vue component in popup
        const createPopupComponent = (markerData) => {
            // Create a container div for the Vue component
            const container = document.createElement('div');
            container.id = `popup-${markerData.id}`;

            // Create Vue app instance
            const popupApp = createApp(PopupContent, {
                venue: markerData,
                onClose: () => {
                    // Clean up the Vue app when popup closes
                    popupApp.unmount();
                }
            });

            // Handle events from the popup component
            popupApp.config.globalProperties.$emit = (event, data) => {
                if (event === 'book-venue') {
                    console.log('Booking venue:', data);
                    // Handle booking logic here
                    // You can emit this to the parent component or handle it directly
                }
            };

            // Mount the Vue component to the container
            popupApp.mount(container);

            return container;
        };
       
        // Make sure this is run onload 
        onMounted(() => {
            mapboxgl.accessToken = token;

            // Block Mapbox telemetry so the request (and token) never hits the network – avoids block/CORS errors
            originalFetch = window.fetch;
            window.fetch = function (input, init) {
                const url = typeof input === 'string' ? input : (input && input.url);
                if (url && url.includes('events.mapbox.com')) {
                    return Promise.resolve(new Response('', { status: 200 }));
                }
                return originalFetch.apply(this, arguments);
            };

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
                markers.value.forEach((marker) => marker.remove());
                markers.value = [];
                markerPopups.value.clear();
            };

            const addMarkers = (list) => {
                if (!map.value) return;
                (list || []).forEach((i) => {
                    if (isValidCoordinates(i.coordinates)) {
                        const marker = new mapboxgl.Marker({
                                className: "venue-marker"
                        })
                            .setLngLat(i.coordinates)
                            .addTo(map.value);
                        if(props.usePopups) {
                            const popup = new mapboxgl.Popup({
                                offset: 40,
                                closeButton: true,
                                closeOnClick: true
                            });
                            popup.setDOMContent(createPopupComponent(i));
                            marker.setPopup(popup)
                        } else {
                            // mobile: click → notify parent instead of popup
                            marker.getElement().addEventListener('click', (e) => {
                                e.stopPropagation();
                                emit('venueSelected', i);
                            });
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

            // Loop through array: one marker with popup per venue, store ref for opening from search
            addMarkers(props.markers);

            watch(
                () => (props.markers || []).map((marker) => marker.id).join(','),
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
                        return
                    }
                    if(!map.value || !markerPopups.value.has(venue.id)) return;
                    setSelectedMarker(venue.id)
                    map.value.flyTo({ center: venue.coordinates, speed: 1.31, zoom: focusZoom.value });
                    if (props.usePopups) {
                        closeAllPopups();
                        const { marker } = markerPopups.value.get(venue.id);
                        setTimeout(() => marker.togglePopup(), 200);
                        isPopupOpen.value = true;
                    }
                },
                { deep: true }
            );

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
            if (originalFetch) window.fetch = originalFetch;
            window.removeEventListener('resize', handleResize);
            if (resizeObserver && mapContainer.value) {
                resizeObserver.unobserve(mapContainer.value);
                resizeObserver.disconnect();
            }
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
        });

        // GeoLocation of User
        const setViewToCurrentLocation = () => {
            // Check Session Storage
            if (sessionStorage.getItem("coords")) {
                coords.value = JSON.parse(sessionStorage.getItem("coords"))
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
.mapboxgl-popup-content {
    max-height: max-content;
    width: max-content;
    padding: 10px 20px;
    h3,
    h4 {
        margin: 0;
    }
    h3 {
        border-bottom: 2px solid transparent;
    }
    a,
    a:link,
    a:active {
        text-decoration: none;
        color: $black;
    }
    label {
        position: relative;
        top: -8px;
        font-style: italic;
    }
}
.mapboxgl-popup {
    transition-property: opacity;
    transition-duration: 2s;
}

.mapboxgl-popup-close-button {
    display: none;
}

.mapboxgl-marker {
    svg {
        &:hover {
            width: 60px;
            height: 60px;
            fill: $black;
            filter: hue-rotate(45deg);
        }
    }
    .is-selected > svg {
        width: 48px;   // or transform: scale(1.5)
        height: 48px;
        transform: scale(1.5);
        transform-origin: bottom center;
        transition: transform 0.15s ease;
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
@media  screen and (max-width: 768px) {
    .mapboxgl-marker.is-selected > svg {
        width: 48px;   // or transform: scale(1.5)
        height: 48px;
        transform: scale(1.5);
        transform-origin: bottom center;
        transition: transform 0.15s ease;
        filter: hue-rotate(70deg) saturate(.7) brightness(1.15);
    }
}
</style>