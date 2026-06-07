<template>
    <LoginModal :isOpen="isOpen" @close="isOpen = false" />
    <div class="header-wrapper">
        <div class="left">
            <RouterLink to="/">
                <div class="logo">
    
                    <img src="@/assets/images/hyyp.svg" />
    
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
            <div v-if="!hiddenComponent">
                <RouterLink :to="listYourPropertyPath" class="pr-4">
                    <Link :text="listYourPropertyLabel" />
                </RouterLink>
            </div>
            <div @click="showPopup">
    
            </div>
            <div v-if="userAuth" class="user-auth" ref="userAuthRef">
                <RouterLink :to="`/account/${user.id}`">
                    <Link :text="'Account'" />
                </RouterLink>
                <div class="avatar-container pl-4" @click="toggleMenu">
                    <Avatar :user="user" />
                </div>
                <div v-if="isMenuOpen" class="dropdown-menu link-bay mobile-hidden">
                    <div v-for="(item, index) in items" :key="index" class="dropdown-item" @click.prevent="handleItemClick(item)">
                        <a :href="item.url">{{ item.title }}</a>
                    </div>
                    <div role="button" class="dropdown-item logout" @keydown.enter.space.prevent="onLogout" @click="onLogout">
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <div v-else-if="!hiddenComponent" class="login">
                <div @click="showPopup">
                    <Link :text="'Sign In'" />
                </div>
                <RouterLink to="/signup">
                    <div style="margin-top:2px">
                        <Link :text="'Sign up'" />
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
    <div ref="mobileHeaderRef" class="mobile-header-wrapper">
        <div class="mobile-header-bar">
            <div class="v-col-9 d-flex align-center">
                <div @click.stop="toggleMenu">
                    <v-icon v-if="isMenuOpen" class="mdi mdi-close"></v-icon>
                    <v-icon v-else class="mdi mdi-menu"></v-icon>
                </div>
                <RouterLink to="/">
                    <div class="logo" @click="closeMenu">
    
                        <img src="@/assets/images/hyyp.svg" />
    
                        <div v-if="isPremium === true" class="pro-badge noSelect">
                            <span>Pro</span>
                        </div>
                        <div v-else></div>
    
                    </div>
                </RouterLink>
            </div>
            <div v-if="!hiddenComponent" class="v-col-3 d-flex align-center" style="justify-content: end;">
                <div v-if="userAuth" class="avatar-container pl-4">
                    <Avatar :user="user" @click="toggleMobileLinks" />
                    <div v-if="isMobileAccountOpen" class="link-bay_account">
                        <RouterLink :to="`/account/${user.id}`">
                            <div class="dropdown-item" @click="toggleMobileLinks">
                                <i class="mdi mdi-account-circle"></i>
                                <p>Account</p>
                            </div>
                        </RouterLink>
                        <div role="button" class="dropdown-item logout" @keydown.enter.space.prevent="onLogout" @click="onLogout">
                            <i class="mdi mdi-exit-to-app"></i>
                            <p>Logout</p>
                        </div>
                    </div>
                    <div v-if="isMobileAccountOpen" class="clear-locked" @click="toggleMobileLinks"></div>
                </div>
                <RouterLink v-else to="/signin">
                    <Link text="Sign In" />
                </RouterLink>
            </div>
    
        </div>
        <div v-if="isMenuOpen" class="dropdown-menu  link-bay" @click="handleItemClick">
            <div class="menu">
                <RouterLink to="/map" class="dropdown-item">
                    <span>Browse Venues</span>
                </RouterLink>
                <RouterLink :to="listYourPropertyPath" class="dropdown-item">
                    <span>{{ listYourPropertyLabel }}</span>
                </RouterLink>
                <div v-for="(item, index) in items" :key="index" class="dropdown-item" @click="handleItemClick(item)">
                    <a :href="item.url">{{ item.title }}</a>
                </div>
    
            </div>
        </div>
        <div v-if="isMenuOpen" class="locked" @click="closeMenu"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore, venueIdFromPayload, resolveListYourPropertyPath } from '@/stores/user';
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
const mobileHeaderRef = ref(null);
const isMobileAccountOpen = ref(false);
const showPopup = () => { isOpen.value = true; };

const userAuth = computed(() => userStore.getIsAuthenticated);

const user = computed(() => userStore.getUser);

const listYourPropertyPath = computed(() =>
    resolveListYourPropertyPath(user.value, userAuth.value)
);

/** Guests: marketing copy. Signed-in + venue id: dashboard. Signed-in, no id: onboarding wording. */
const listYourPropertyLabel = computed(() => {
    if (!userAuth.value) return 'List your property';
    return venueIdFromPayload(user.value) ? 'Venue dashboard' : 'Get started as a host';
});

const items = computed(() => [
    { title: 'Give Us Feedback', url: '/feedback' },
    { title: 'Terms of Service', url: '/terms-of-service' },
    { title: 'Privacy Policy', url: '/privacy-policy' },
]);

const hiddenRoutes = ['/signup', '/signin'];
const hiddenComponent = computed(() => hiddenRoutes.includes(route.path));

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
const toggleMobileLinks = () => {
    isMobileAccountOpen.value = !isMobileAccountOpen.value;
}
const closeMenu = () => {
    isMenuOpen.value = false;
};

const handleItemClick = (item) => {
    isMenuOpen.value = false;
};
const onLogout = async () => {
    isMenuOpen.value = false;
    isMobileAccountOpen.value = false;
    await userStore.logout();
    await router.push('/');
}
const closeMenuOnClickOutside = (event) => {
    if (userAuthRef.value?.contains(event.target)) return;
    if (mobileHeaderRef.value?.contains(event.target)) return;
    isMenuOpen.value = false;
};

onMounted(async () => {
    document.addEventListener('click', closeMenuOnClickOutside);
    if (userStore.getIsAuthenticated && !venueIdFromPayload(userStore.getUser)) {
        try {
            await userStore.fetchUserProfile();
        } catch {
            /* /auth/me may omit venueId; mergeVenueIdFromProfileResponse preserves prior id when possible */
        }
    }
});

onUnmounted(() => {
    document.removeEventListener('click', closeMenuOnClickOutside);
});
</script>

<style lang="scss" scoped>
@use "../../assets/variables.scss" as *;
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
    /* Above .hyyp-wrapper (z-index: 1) so dropdowns aren’t covered by the scroll layer; below modals (.centered 9999). */
    z-index: 10;
    background: white;
    overflow: visible;
    isolation: isolate;
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

@media screen and (max-width: 768px) {
    div.header-wrapper {
        display: none;
    }
    div.mobile-header-wrapper {
        /* Above Silktide #silktide-cookie-icon (z-index: 100000 in silktide-consent-manager.css) */
        position: fixed;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background: transparent;
        border-bottom: .5px solid $grey_90;
        padding: 5px 15px 5px;
        box-sizing: border-box;
        background: white;
        .mobile-header-bar {
            position: relative;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 50px;
            box-sizing: border-box;
        }
        .locked,
        .clear-locked {
            top: 50px;
        }
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
    }
    .link-bay_account {
        position: absolute;
        top: 50px;
        right: -8px;
        min-width: 50vw;
        border-radius: $border-radius;
        background: white;
        box-shadow: $boxShadow;
        z-index: 9;
        .dropdown-item {
            display: flex;
            align-items: center;
            padding: 12px 10px;
            gap: 16px;
            i {
                font-size: 1.5rem;
            }
            &.logout {
                background: rgba($primary, 0.5);
            }
        }
    }
}
</style>