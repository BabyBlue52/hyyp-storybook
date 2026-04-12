import { defineStore } from 'pinia';

/** Stub store for Storybook / design system; swap for real auth when integrated. */
export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    },
    actions: {
        async logout() {
            this.isAuthenticated = false;
            this.user = null;
        },
        async fetchUserProfile() {
            /* no-op in design system / Storybook */
        },
        /** For Storybook / demos: set auth and user in one call. */
        setStubSession(user) {
            this.isAuthenticated = true;
            this.user = user;
        },
        clearStubSession() {
            this.isAuthenticated = false;
            this.user = null;
        },
    },
});

/** Matches HyypHeader / account links in stories (see preview router). */
export const storybookDummyUser = {
    id: 'demo-user-1',
    venueId: '12346',
};
