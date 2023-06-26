import Wysiwyg from './Wysiwyg';

export default {
    component: Wysiwyg,
    title: 'System / Hyyp Editor',   
    decorators: [() => ({ template: '<div style="max-width:67vw;margin: 0"><story/></div>' })],
}

const Template = args => ({
    components: { Wysiwyg },
    setup() {
        return {args};
    },
    template: '<Wysiwyg v-bind="args" />',
})

export const Default = Template.bind({
    
})
