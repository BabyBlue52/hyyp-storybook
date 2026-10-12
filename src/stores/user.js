import { defineStore } from 'pinia';

function normalizeVenueIdString(raw) {
    if (raw == null || raw === '') return null;
    const s = String(raw).trim();
    if (s === 'undefined' || s === 'null' || s === 'NaN') return null;
    if (!/^\d+$/.test(s)) return null;
    const n = parseInt(s, 10);
    return Number.isNaN(n) || n < 1 ? null : s;
}

/** Normalize owned venue id from API / nested registration payloads */
export function venueIdFromPayload(data) {
    if (data == null || typeof data !== 'object') return null;
    const top = normalizeVenueIdString(data.venueId);
    if (top) return top;
    const snake = normalizeVenueIdString(data.venue_id);
    if (snake) return snake;
    return null;
}

export const LIST_PROPERTY_MARKETING_PATH = '/get-started';
export const VENUE_ONBOARDING_ADMIN_PATH = '/admin/venue/new';

export function resolveListYourPropertyPath(user, isAuthenticated) {
    if (!isAuthenticated) return LIST_PROPERTY_MARKETING_PATH;
    const id = venueIdFromPayload(user);
    if (id) return `/admin/venue/${id}`;
    return VENUE_ONBOARDING_ADMIN_PATH;
}

/** Stub store for Storybook / design system; swap for real auth when integrated. */
export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
    }),
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getError: (state) => state.error,
        getLoading: (state) => state.loading,
    },
    actions: {
        clearError() {
            this.error = null;
        },
        async login() {
            this.error = null;
        },
        async loginWithGoogle() {
            this.error = null;
        },
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
    firstName: 'Dana',
    lastName: 'Kim',
    email: 'dana@hyyp.io',
};
