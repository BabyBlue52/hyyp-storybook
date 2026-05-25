import HyypFooter from '@/components/System/HyypFooter.vue';

export default {
    component: HyypFooter,
    title: 'System / Hyyp Footer',
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
