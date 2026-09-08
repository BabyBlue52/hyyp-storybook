import FilterComponent from '@/components/Map/FilterComponent.vue';

export default {
    component: FilterComponent,
    title: 'Map / Filter Component',
    parameters: {
        docs: {
            description: {
                component:
                    'Draft filters stay local until Apply. Overlay/close discards the draft. Clear All resets applied filters. Room sizes use SM/MD/LG.',
            },
        },
    },
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
