<template>
    <LoginModal :isOpen="isOpen" @close="isOpen = false" />
    <div class="header-wrapper">
        <div class="left">
            <RouterLink to="/">
                <div class="logo">
    
                    <img src="@/assets/logos/hyyp.svg" />
    
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
            <RouterLink v-if="userAuth" :to="listYourPropertyPath" class="pr-4">
                <Link :text="'List your Property'" />
            </RouterLink>
            <div v-else @click="showPopup">
                
            </div>
            <div v-if="userAuth" class="user-auth" ref="userAuthRef">
                <RouterLink :to="`/account/${user.id}`">
                    <Link :text="'Account'" />
                </RouterLink>
                <div class="avatar-container pl-4" @click="toggleMenu">
                    <Avatar :user="user" />
                </div>
                <div v-if="isMenuOpen" class="dropdown-menu link-bay">
                    <div 
                        v-for="(item, index) in items"
                        :key="index"
                        class="dropdown-item"
                        @click.prevent="handleItemClick(item)"
                    >
                        <a :href="item.url">{{ item.title }}</a>
                    </div>
                    <div role="button" class="dropdown-item logout" @keydown.enter.space.prevent="onLogout" @click="onLogout">
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <div v-else-if="!hiddenComponent" class="login">
                <div @click="showPopup">
                    <Link :text="'Sign In'"/>
                </div>
                <RouterLink to="/signup">
                    <div style="margin-top:2px">
                        <Link :text="'Sign up'"/>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="mobile-header-wrapper">
        <div class="v-col-1" @click="toggleMenu">
            <v-icon v-if="isMenuOpen" class="mdi mdi-close" ></v-icon>
            <v-icon v-else class="mdi mdi-menu"></v-icon>
        </div>
        <div class="v-col-9 d-flex">
            <RouterLink to="/" >
                <div class="logo" @click="isMenuOpen == false">
    
                    <img src="@/assets/logos/hyyp.svg" />
    
                    <div v-if="isPremium === true" class="pro-badge noSelect">
                        <span>Pro</span>
                    </div>
                    <div v-else></div>
    
                </div>
        </RouterLink>
        </div>
        <div v-if="!hiddenComponent" class="v-col-2">
            <RouterLink to="/signin">
                <Link text="Sign In"/>
            </RouterLink>
        </div>
        <div v-if="isMenuOpen" class="dropdown-menu link-bay" @click="handleItemClick">
            <div class="menu">
                <RouterLink to="/map">
                    <div class="dropdown-item">
                        <a>Browse Venues</a>
                    </div>
                </RouterLink>
                <div 
                    v-for="(item, index) in items"
                    :key="index"
                    class="dropdown-item"
                    @click.prevent="handleItemClick(item)"
                >
                    <a :href="item.url">{{ item.title }}</a>
                </div>
            </div>
        </div>
        <div v-if="isMenuOpen" class="locked"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Link from '@/components/UI/Link.vue';
import Avatar from '@/components/UI/Avatar.vue'
import LoginModal from '@/components/Modals/LoginModal.vue';

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const isOpen = ref(false);
const isPremium = ref(false);
const isMenuOpen = ref(false);
const userAuthRef = ref(null);

const showPopup = () => { isOpen.value = true; };

const userAuth = computed(() => userStore.getIsAuthenticated);

const user = computed(() => userStore.getUser);

/** Same resolution order as user store (login / me / registrationData). */
function resolvedVenueId(u) {
    if (!u) return null;
    const id =
        u.venueId ??
        u.registrationData?.venueId ??
        u.registrationData?.venue?.venueId;
    if (id == null || id === '') return null;
    return String(id);
}

const listYourPropertyPath = computed(() => {
    const id = resolvedVenueId(user.value);
    return id ? `/admin/venue/${id}` : '/admin/venue/new';
});

const items = ref([
    { title: 'Give Us Feedback', url: '/feedback' },
    { title: 'Terms of Service', url: '/terms-of-service' },
    { title: 'Privacy Policy', url: '/privacy-policy' },
]);

const hiddenRoutes = ['/signup', '/signin'];
const hiddenComponent = computed(() => hiddenRoutes.includes(route.path));

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const handleItemClick = (item) => {
    isMenuOpen.value = false;
};
const onLogout = async () => {
    isMenuOpen.value = false;
    await userStore.logout();
    await router.push('/');
}
const closeMenuOnClickOutside = (event) => {
    if (userAuthRef.value && !userAuthRef.value.contains(event.target)) {
        isMenuOpen.value = false;
    }
};

onMounted(async () => {
    document.addEventListener('click', closeMenuOnClickOutside);
    if (userStore.getIsAuthenticated && !resolvedVenueId(userStore.getUser)) {
        try {
            await userStore.fetchUserProfile();
        } catch {
            /* /auth/me may omit venueId; link falls back to /admin/venue/new */
        }
    }
});

onUnmounted(() => {
    document.removeEventListener('click', closeMenuOnClickOutside);
});
</script>

<style lang="scss" scoped>
@use "../assets/variables.scss" as *;

div.header-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .5px solid $grey_80;
    width: 100%;
    padding: 5px 20px;
    z-index: 1;
    background: white;
    overflow: visible;
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

.user-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.avatar-container {
    cursor: pointer;
    position: relative;
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
    font-size: $label;
    font-weight: 600;
    text-transform: uppercase;
    background: #f0f0f0;
}
div.mobile-header-wrapper {
    display: none;
}
@media screen and (max-width: 600px) {
    div.header-wrapper {
        display:none;
    }  
    div.mobile-header-wrapper {
        /* Above Silktide #silktide-cookie-icon (z-index: 100000 in silktide-consent-manager.css) */
        position: fixed;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        display: flex;
        align-items: center;
        height:50px;
        background: transparent;
        border-bottom: .5px solid $grey_90;
        padding: 0 20px 5px 0px;
        i {
            color: $gunMetal;
        }
        div.logo {
            width: 100%;
            position: relative; 
            top: 2px;
            left: 5px;
            transform: scale(0.9);
        }
        
        .dropdown-menu {
            z-index: 10;
            position: absolute;
            top: 50px;
            left: -5px;
            min-width: calc(100% + 10px);
            min-height: max-content;
            background: white;
            border: none;
            .dropdown-item {
                border-bottom: 1px solid $grey_90;
                padding: 30px;
            }
            .menu {
                z-index: 2;
            }
        }
        .locked {
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background: rgba($black, 0.5);
        }
    }    
}

</style>