<template>
    <div class="header-wrapper">
        <div class="left">
            <div class="logo">
                <img src="./assets/hyyp.svg"/>
                <div v-if="isPremium" class="pro-badge">
                    <span>Pro</span>
                </div>
            </div>
            
            <Link :text="'Browse Venues'"/>
        </div>
        <div class="right">
            <div v-if="userAuth" class="user-auth ">
                <Link :text="'Account'"/>
                <v-menu>
                <template v-slot:activator="{ props }">
                    <Avatar :userInitials="userInitials" v-bind="props"/>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    :value="index"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
              

            </div>
            <div v-else class="login">
                
                <Link :text="'Sign In'"/>
                <Link :text="'Sign up'"/>
            </div>
        </div>
    </div>
    
</template>

<script>

    import Link from './Link.vue';
    import Avatar from './Avatar.vue'

    export default {
        name: 'Hyyp Header',
        components: { Link, Avatar },
        props: {
            userInitials: String,
            isPremium: Boolean,
            userAuth: Boolean,
        },
        data: () => ({
            items: [
                {title: 'Log Out'}
            ]
        }),
        methods: {
            onClick() {
                console.log('clicked');
            },
            
        }
    }
</script>

<style scoped>
    div.header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .5px solid #ccc;
        max-width: 100%;
        padding: 0 2%;
        padding-bottom: 8px;
    }   
    div.right, div.left {
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .login {
        display: flex;
    }
    .user-auth {
        display: flex;
        align-items: center;
        justify-content: center;  
    }
    div.logo {
        display: flex;
        margin-right: 20px;
    }
    div.logo > img{
        height: 50px;
        
    }
    div.pro-badge {
        clear: none;
        position: relative;
        top: 30px;
        right: 5px;
        width: max-content;
        height: max-content;
        margin-right: -10px;
        padding: 2px 10px;
        border-radius: 5px;

        font-size: .8rem;
        text-transform: uppercase;
        background: #f0f0f0;
    }
</style>