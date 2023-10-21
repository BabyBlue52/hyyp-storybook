<template>
    <button class="user-icon">
        <span v-if="!src" class=" noSelect">{{ userInitials }}</span>
        <img v-else :src=src />
    </button>
</template>

<script>
 export default {
        title: 'hyypAvatar-lg',
        props: {
            userInitials: String,
            size: String,
            src: String
        }, data() {
            return {
                userInitials: "DK",
                src:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
        }
    }

</script>

<style scoped>
    .user-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 80px;
        width: 80px;
        border-radius: 50%;
        border: none;
        background-color: #f0f0f0;        
    }
    .user-icon > span {
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin: auto 0;
        text-transform: uppercase;
    }   
    .user-icon > img {
        width: inherit;
        height: inherit;
        border-radius: 50%;
    }
</style>