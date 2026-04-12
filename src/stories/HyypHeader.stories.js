import HyypHeader from '@/components/HyypHeader.vue';
import { useUserStore, storybookDummyUser } from '@/stores/user';

export default {
    title: 'System / Hyyp Header',
    component: HyypHeader,
};

const resetAuth = (story) => ({
    setup() {
        const userStore = useUserStore();
        userStore.clearStubSession();
        return {};
    },
    template: '<div style="min-height: 56px;"><story /></div>',
});

const withDummyAuth = (story) => ({
    setup() {
        const userStore = useUserStore();
        userStore.setStubSession({ ...storybookDummyUser });
        return {};
    },
    template: '<div style="min-height: 56px;"><story /></div>',
});

export const Default = {
    decorators: [resetAuth],
};

export const Authenticated = {
    decorators: [withDummyAuth],
};
