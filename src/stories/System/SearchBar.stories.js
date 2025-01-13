import SearchBar from '../../components/System/SearchBar.vue';

export default {
    component: SearchBar,
    title: 'System / Search Bar',
}

const Template = args => ({
    components: { SearchBar },
    setup() {
        return {args};
    },
    template: '<SearchBar v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
