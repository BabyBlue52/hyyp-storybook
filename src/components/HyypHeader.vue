<template>
    <div class="header-wrapper">
        <div class="left">
            <RouterLink to="/">
                <div class="logo">
    
                    <img src="../assets/hyyp.svg" />
    
                    <div v-if="isPremium === true" class="pro-badge noSelect">
                        <span>Pro</span>
                    </div>
                    <div v-else></div>
    
                </div>
            </RouterLink>
            <RouterLink to="/map">
                <Link :text="'Browse Venues'" />
            </RouterLink>
        </div>
        <div class="right">
            <RouterLink to="/admin/venue" class="pr-4"><Link :text="'List your Property'"/></RouterLink>
            <div v-if="userAuth" class="user-auth ">
                <Link :text="'Account'" />
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
                    <v-list-item-title @click="onClick()">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
              

            </div>
            <div v-else class="login">
                <div @click="showPopup">
                    <Link :text="'Sign In'"/>
                </div>
                <RouterLink to="/register">
                    <div style="margin-top:2px">
                        <Link :text="'Sign up'"/>
                    </div>
                </RouterLink>
                <!-- <Modal :isOpen="isPopupVisible" @close="closePopup"/> -->
                
            </div>
        </div>
    </div>
    
</template>

<script  setup>
import { ref } from "vue";
import Link from '@/components/UI/Link.vue';
import Avatar from '@/components/UI/Avatar.vue'
import Modal from '@/components/Modals/Modal.vue'

const isPopupVisible = ref(false);

const showPopup = () => {
    isPopupVisible.value = true;
}
const closePopup = () => {
    isPopupVisible.value = false;
}
</script>

<style lang="scss" scoped>
div.header-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .5px solid #ccc;
    width: 100%;
    padding: 5px 20px;
    z-index: 99;
    background: white;
}

div.right,
div.left {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.login {
    display: flex;
}
div.logo {
    display: flex;
    margin-right: 20px;
}

div.logo>img {
    height: 40px;
}
.user-auth {
    display: flex;
    align-items: center;
    justify-content: center;
}



div.pro-badge {
    clear: none;
    position: relative;
    top: 20px;
    left: 1px;
    width: max-content;
    height: max-content;
    margin-right: -10px;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: .67rem;
    font-weight: 600;
    text-transform: uppercase;
    background: #f0f0f0;
}
</style>