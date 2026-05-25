import FilterComponent from '@/components/Map/FilterComponent.vue';

export default {
    component: FilterComponent,
    title: 'Map / Filter Component',
};

const Template = (args) => ({
    components: { FilterComponent },
    setup() {
        return { args };
    },
    template: '<div style="position: relative; min-height: 600px;"><FilterComponent v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};
