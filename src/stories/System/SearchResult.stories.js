import SearchResult from '../../components/System/SearchResult';

export default {
    component: SearchResult,
    title: 'System / Search Result',
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