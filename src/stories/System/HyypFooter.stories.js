import HyypFooter from '@/components/System/HyypFooter.vue';

export default {
    component: HyypFooter,
    title: 'System / Hyyp Footer',
    parameters: {
        docs: {
            description: {
                component: 'Shows the desktop footer above 768px and the mobile footer at 768px and below. Only one footer is mounted at a time.',
            },
        },
    },
};

const Template = (args) => ({
    components: { HyypFooter },
    setup() {
        return { args };
    },
    template: '<HyypFooter v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
