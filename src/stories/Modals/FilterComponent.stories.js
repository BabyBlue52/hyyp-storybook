import FilterComponent from '@/components/Modals/FilterComponent.vue';

export default {
    component: FilterComponent,
    title: 'Modals / Filter Component'
}

const Template = (args) => ({
    components: { FilterComponent },
    setup() {
        return { args };
    },
    template: '<FilterComponent />'
})

export const Default = Template.bind({});
Default.args = {

}