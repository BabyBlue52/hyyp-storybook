import SearchResult from './SearchResult';

export default {
    component: SearchResult,
    title: 'System / Search Result',
    decorators: [() => ({ template: '<div><story></div>'})]
}

const Template = args => ({
    components: { SearchResult },
    setup() {
        return {args};
    },
    template: '<SearchResult v-bind="args"/>'
})

export const Default = Template.bind({});
Default.args = {
    
}