import { ref } from 'vue';
import HyypToast from '../../components/System/HyypToast.vue';
import SecondaryButton from '../../components/Buttons/SecondaryButton.vue';

export default {
    component: HyypToast,
    title: 'System / Hyyp Toast',
    argTypes: {
        message: { control: 'text' },
        visible: { control: 'boolean' },
    },
};

export const Default = {
    args: {
        message: 'Something went wrong. Please try again.',
        visible: true,
    },
    render: (args) => ({
        components: { HyypToast },
        setup() {
            return { args };
        },
        template: '<HyypToast v-bind="args" />',
    }),
};

export const Triggered = {
    render: () => ({
        components: { HyypToast, SecondaryButton },
        setup() {
            const visible = ref(false);
            const show = () => {
                visible.value = true;
                setTimeout(() => {
                    visible.value = false;
                }, 3000);
            };
            return { visible, show };
        },
        template: `
            <div style="padding: 2rem;">
                <SecondaryButton text="Show toast" @click="show" />
                <HyypToast :visible="visible" message="Profile updated successfully." />
            </div>
        `,
    }),
};
