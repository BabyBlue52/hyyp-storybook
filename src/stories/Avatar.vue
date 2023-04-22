<template>
    <button class="user-icon">
        <span v-if="userInitials" class=" noSelect">{{ userInitials }}</span>
        <img v-else src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
    </button>
</template>

<script>
 export default {
        title: 'hyypAvatar',
        props: {
            userInitials: String,
        },
        
    }

</script>

<style scoped>
    .user-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 35px;
        width: 35px;
        border-radius: 50%;
        border: none;
        background-color: #f0f0f0;        
    }
    .user-icon > span {
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin: auto 0;
    }   
    .user-icon > img {
        width: inherit;
        height: inherit;
        border-radius: 50%;
    }
</style>