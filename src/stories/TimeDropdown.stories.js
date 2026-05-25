import TimeDropdown from '@/components/UI/TimeDropdown.vue';

export default {
    component: TimeDropdown,
    title: 'System / Time Dropdown',
};

const Template = (args) => ({
    components: { TimeDropdown },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 240px"><TimeDropdown v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    label: 'Start time',
    modelValue: '09:00',
};
