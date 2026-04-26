<template>
    <div class="card">
        <div class="room-img">
            <img :src="room?.imgUrl" />
        </div>
        <div class="room-info">
            <div class="room-size">
                <h4>{{ room?.size }}</h4>
            </div>
            <div class="_total">
                <small> Availalble: </small>
                <p>{{ room?.totalRooms }}</p>
            </div>
            <hr/>
            <div class="_persons"><small> Recommended for:</small>
                <p v-if="room?.size == 'Small'">10 - 20 people</p>
                <p v-if="room?.size == 'Medium'">20 -50 people</p>
                <p v-if="room?.size == 'Large'">50 or more people</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    room: {
        type: Object,
        default: null,
    },
});
</script>

<style scoped lang="scss">
 @use "../../assets/variables.scss" as *;
 
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid $grey_90;
    border-radius: calc( 2 * $border-radius);
    overflow: hidden;
    background: white;
    .room-img {
        height: 150px;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .room-info {
        border-top: 1px solid $grey_80;
        padding: 10px;
        position: relative;
        height: 100%;
        hr {
            margin-bottom: 10px;
            width: 95%;
        }
        .room-size {
            position: absolute;
            top: -35px;
            right: 5px;
            background: white;
            border-radius: $border-radius;
            padding: 4px 8px;
            h4 {
                font-size: $paragraph;
                margin: 0
            }
        }
        ._total {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;
            small {
                width: 100%;
                text-align: start;
            }
            p {
                max-width: max-content;
                margin: 0;
                padding: 2px 10px;
                border-radius: $border-radius;
                font-weight: 700;
                background: $violet_light;
                color: $violet;
                line-height: 1;
            }
        }   
        ._persons {
            flex-direction: column;
            justify-content: start;
            p {
                min-width: 100%;
                margin-top: -5px;
                font-style: italic;
                font-weight: 400;
                color: $grey_60;
            }
        }
    }
}
</style>
