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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { createApp } from 'vue';
import mapboxgl from 'mapbox-gl'; // Ensure correct import syntax
import 'mapbox-gl/dist/mapbox-gl.css';
// import { mdiNearMe } from '@mdi/js';
import FilterComponent from '@/components/Map/FilterComponent.vue';

import PopupContent from '@/components/Map/PopupContent.vue';

const token = `${import.meta.env.VITE_MAPBOX_API_KEY}`
const map_style = `${import.meta.env.VITE_MAPSTYLE}`


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
    },
    components: {
        FilterComponent
    },
    setup(props) {
        const map = ref(null);
        const mapContainer = ref(null);
        const coords = ref(null);
        const markers = ref([]);
        const markerPopups = ref(new Map());
        const isPopupOpen = ref(false);
        const previousVenue = ref(null);
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
                minZoom: 12,
                transformRequest: (url) =>
                    url && url.includes('events.mapbox.com') ? { url: 'about:blank' } : { url }
            });

            setViewToCurrentLocation();

            // Loop through array: one marker with popup per venue, store ref for opening from search
            props.markers.forEach((i) => {
                if (isValidCoordinates(i.coordinates)) {
                    const popup = new mapboxgl.Popup({
                        offset: 40,
                        closeButton: true,
                        closeOnClick: true
                    });
                    popup.setDOMContent(createPopupComponent(i));

                    const marker = new mapboxgl.Marker({
                            className: "hoverScale"
                        })
                        .setLngLat(i.coordinates)
                        .setPopup(popup)
                        .addTo(map.value);

                    markers.value.push(marker);
                    markerPopups.value.set(i.id, { marker, venueData: i });
                
                } else {
                    console.error(`Invalid coordinates for marker: ${i.title}`)
                }
            })

            watch(
                () => [props.center],
                ([newCenter]) => {
                    if (map.value) {
                        map.value.flyTo({ center: [newCenter.value[0], newCenter.value[1]], speed: 1.1, zoom: 17 });
                    }
                }, { deep: true },
            );

            watch(
                () => props.selectedVenue,
                (venue) => {
                    closeAllPopups();
                    if (!venue || !map.value || !markerPopups.value.has(venue.id)) return;
                    const { marker } = markerPopups.value.get(venue.id);
                    map.value.flyTo({ center: venue.coordinates, speed: 1.1, zoom: 17 });
                    setTimeout(() => marker.togglePopup(), 200);
                    isPopupOpen.value = true;
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
                        map.value.setZoom(12); // Adjust zoom level as needed

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
                value.marker.getPopup().remove();
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
@use "@/assets/variables.scss" as *;
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
}

.mapboxgl-popup {
    transition-property: opacity;
    transition-duration: 2s;
}

.mapboxgl-popup-close-button {
    display: none;
}

.mapboxgl-marker>svg {
    &:hover {
        width: 60px;
        height: 60px;
        fill: $black;
        filter: hue-rotate(45deg);
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
    .geo-locate {
        height: 100%;
        background: $gunMetal;
        border-radius: 5px;
        padding: 10px 10px 5px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
        svg {
            height: 24px;
            width: 24px;
            fill: white;
            margin: 0;
        }
    }
}

.highlighted {
    border: 2px solid crimson
}
</style>