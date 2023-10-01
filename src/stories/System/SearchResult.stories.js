import SearchResult from './SearchResult';

export default {
    component: SearchResult,
    title: 'System / Search Result',
    decorators: [() => ({ template: '<div style="max-width:67vw; position: absolute; top: 20%; left: 50%; transform:translate(-50%, -50%)"><story></div>'})]
}

const Template = args => ({
    components: { SearchResult },
    setup() {
        return {args};
    },
    template: '<SearchResult v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
