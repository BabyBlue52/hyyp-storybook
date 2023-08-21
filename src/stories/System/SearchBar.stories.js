import SearchBar from './SearchBar';

export default {
    component: SearchBar,
    title: 'System / Search Bar',
    decorators: [() => ({ template: '<div style="max-width:67vw; position: absolute; top: 20%; left: 50%; transform:translate(-50%, -50%)"><story></div>'})]
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
