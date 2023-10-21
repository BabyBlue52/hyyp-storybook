<template>
    <div class="wrapper">
        <form class="search-wrapper">
            <div class="border">
                <div class="location">
                    <div class="icon">
                        <button @click="getCurrentLocation">
                                            <v-icon icon="mdi-map-marker" color="#37515F"></v-icon>
                                        </button>
                    </div>
                    <input type="text" placeholder="Enter Location" id="location" />
                </div>
                <div class="search">
                    <div class="icon">
                        <v-icon icon="mdi-magnify" color="#ccc"></v-icon>
                    </div>
                    <input type="text" placeholder="Try out a few topics" />
                </div>
            </div>
            <Button title="Search" />
            <div class="filters">
                <v-checkbox label="Show All Results"></v-checkbox>
                <v-checkbox label="Events"></v-checkbox>
                <v-checkbox label="Venues"></v-checkbox>
                <v-checkbox label="Organizations"></v-checkbox>
            </div>
        </form>
        <hr/>
    </div>
</template>

<script>
import Button from "../Buttons/Button.vue";
import TextInput from "../TextInput.vue";

export default {
    name: 'Search Bar',
    components: { Button, TextInput },
    methods: {
        getCurrentLocation(event) {
            window.alert('attempting to get current location')
            event.preventDefault()
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("demo").innerHTML =
                    "Geolocation is not supported by this browser.";
            }

            function showPosition(position) {
                document.getElementById("location").innerHTML =
                    "Latitude: " + position.coords.latitude +
                    "Longitude: " + position.coords.longitude;
            }
        },

    }
}
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
    width: max-content;
    height: 48px;
}

.search-wrapper {
    display: flex;
    position: relative;
    width: max-content;
    .border {
        display: flex;
        margin-right: 10px;
        border: 1px solid #999999;
        border-radius: 5px;
        padding-top: 5px;
        height: 50px;
    }
    .location {
        display: flex;
        width: 200px;
        margin-bottom: 10px;
        padding: 0 10px;
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 40px;
           
                position: relative;
                bottom: 1px;
           
        }
        input {
            position: relative;
            top: 2px;
            width: 100%;
            border: none !important;
            border-bottom: 1px solid #100409;
            outline: none;
            margin: 0 !important;
            font-size: 0.85rem;
            &:focus-within,
            &:focus-visible {
                border-bottom: 1px solid #100409;
            }
        }
        input::placeholder {
            color: rgba(#100409, 0.25);
            font-size: 0.75rem;
        }
    }
    .search {
        @extend .location;
        width: 400px;
    }
    .filters {
        display: flex;
        justify-content: flex-start;
        position: absolute;
        left: 0;
        bottom: -50px;
        width: fit-content;
    }
}

hr {
    position: relative;
    width: calc(100% + 120px);
    height: 1px;
    background: #100406;
    top: 50px;
    left: -60px;
    opacity: 0.1;
    border: none;
}
</style>