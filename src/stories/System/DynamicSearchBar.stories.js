import DynamicSearchBar from '../../components/System/DynamicSearchBar.vue';

export default {
    component: DynamicSearchBar,
    title: 'System / Dynamic Search Bar',
}

const Template = args => ({
    components: { DynamicSearchBar },
    setup() {
        return {args};
    },
    template: '<DynamicSearchBar v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
