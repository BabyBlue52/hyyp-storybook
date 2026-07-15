<template>
    <div class="nav-tray-wrapper">
        <!-- Venue Page -->
        <div id="venue">
            <div class="nav-tray-item">
                <div class="nav-tray-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2H14V4H16V7.702L23 10.32V23H24V24H0V23H1V12H7V4H9V2H11V0H12V2ZM15 5H8V23H9V21H14V23H15V5ZM13 22H10V23H13V22ZM21 23H22V11.013L16 8.77V23H17V21H21V23ZM7 13H2V23H3V21H6V23H7V13ZM5 22H4V23H5V22ZM20 22H18V23H20V22ZM4 17V19H3V17H4ZM6 17V19H5V17H6ZM11 7V19H10V7H11ZM21 18V19H17V18H21ZM13 7V19H12V7H13ZM21 16V17H17V16H21ZM4 14V16H3V14H4ZM6 14V16H5V14H6ZM21 14V15H17V14H21ZM21 12V13H17V12H21ZM13 3H10V4H13V3Z" fill="black"/>
                        </svg>
                </div>
                <div class="nav-tray-title">
                    <RouterLink :to="`/admin/venue/${venueId}`"> Venue</RouterLink>
                </div>
            </div>
        </div>
        <!-- Rooms Page -->
        <div id="rooms">
            <div class="nav-tray-item">
                <div class="nav-tray-icon">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="#100409" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 23H20V24H0V23H2V0H18V23ZM17 1H3V23H17V1ZM7 12V13H4V12H7Z" />
                </svg>
                </div>
                <div class="nav-tray-title">
                    <RouterLink :to="`/admin/${venueId}/rooms/`" @click="checkUrl"> Rooms</RouterLink>
                </div>
            </div>
        </div>
        <!--  Requests Page -->
        <div id="requests">
            <div class="nav-tray-item">
                <div class="nav-tray-icon">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-10.014l5.477-9.986h13.069l5.454 9.986v10.014zm-1-9h-22v8h22v-8zm-16.931-10l-4.936 9h21.735l-4.915-9h-11.884zm12.931 6v1h-14v-1h14zm-1-2v1h-12v-1h12zm-1-2v1h-10v-1h10z"/></svg>
                </div>
                <div class="nav-tray-title">
                    <RouterLink :to="`/admin/${venueId}/requests`"> Requests</RouterLink>
                </div>
            </div>
        </div>
        <!--  History Page -->
        <div id="history">
            <div class="nav-tray-item">
                <div class="nav-tray-icon">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"/></svg>

                </div>
                <div class="nav-tray-title">
                    <RouterLink :to="`/admin/${venueId}/history`"> History</RouterLink>
                </div>
            </div>
        </div>
        <!--  Account Page -->
        <div id="account">
            <div class="nav-tray-item">
                <div class="nav-tray-icon">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 13v1h-4v-1h4zm-6.002 1h-10.997l-.001-.914c-.004-1.05-.007-2.136 1.711-2.533.789-.182 1.753-.404 1.892-.709.048-.108-.04-.301-.098-.407-1.103-2.036-1.305-3.838-.567-5.078.514-.863 1.448-1.359 2.562-1.359 1.105 0 2.033.488 2.545 1.339.737 1.224.542 3.033-.548 5.095-.057.106-.144.301-.095.41.14.305 1.118.531 1.83.696 1.779.41 1.773 1.503 1.767 2.56l-.001.9zm-9.998-1h8.999c.003-1.014-.055-1.27-.936-1.473-1.171-.27-2.226-.514-2.57-1.267-.174-.381-.134-.816.119-1.294.921-1.739 1.125-3.199.576-4.111-.332-.551-.931-.855-1.688-.855-.764 0-1.369.31-1.703.871-.542.91-.328 2.401.587 4.09.259.476.303.912.13 1.295-.342.757-1.387.997-2.493 1.252-.966.222-1.022.478-1.021 1.492zm18-3v1h-6v-1h6zm0-3v1h-6v-1h6zm0-3v1h-6v-1h6z"/></svg>
                </div>
                <div class="nav-tray-title">
                    <RouterLink :to="'/account/profile'"> Account</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, watch, computed } from 'vue';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    
    // Get venueId from route params
    const venueId = computed(() => route.params.venueId || '12346'); // fallback for testing
    
    // Check current route path matches
    const checkUrl = () => {
        const venue = document.getElementById('venue');
        const rooms = document.getElementById('rooms');
        const requests = document.getElementById('requests');
        const history = document.getElementById('history');
        const account = document.getElementById('account');
    
        if (!venue || !rooms || !requests || !history || !account) return;
    
        const path = route.path;
    
        // Reset all
        venue.classList.remove('selected');
        rooms.classList.remove('selected');
        requests.classList.remove('selected');
        history.classList.remove('selected');
        account.classList.remove('selected');
    
        // Check which route matches
        if (path.startsWith('/admin/venue')) {
            venue.classList.add('selected');
        } else if (path.includes('/rooms')) {
            rooms.classList.add('selected');
        } else if (path.includes('/requests')) {
            requests.classList.add('selected');
        } else if (path.includes('/history')) {
            history.classList.add('selected');
        } else if (path.startsWith('/account')) {
            account.classList.add('selected');
        }
    };
    
    onMounted(() => {
        checkUrl();
    });
    
    // Watch for route changes
    watch(
        () => route.path,
        () => {
            checkUrl();
        },
        { immediate: true }
    );
    </script>

<style scoped lang="scss">
@use "@/assets/variables.scss" as *;
.nav-tray-wrapper {
    position: fixed;
    width: 180px;
    max-width: 33vw;
    height: 100%;
    background: $grey_90;
}

.nav-tray-item {
    display: flex;
    height: 60px;
    width: 100%;
    border-left: 8px solid transparent;
}

.nav-tray-item:hover {
    background: rgb(51, 51, 51, 0.1)
}

.nav-tray-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 60px;
}

.nav-tray-title {
    width: 100%;
}

a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-transform: capitalize;
    font-weight: 600;
    font-size: $paragraph;
}

.selected {
    border-left: 5px solid $primary;
    transition: 500ms ease-in-out all;
    background: rgb(228, 149, 158, 0.2)
}
</style>