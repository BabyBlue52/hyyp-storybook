import InboxGrid from './InboxGrid';
import { action } from '@storybook/addon-actions';


export default {
    component: InboxGrid, 
    title: 'DataTables / InboxGrid',
    decorators: [() => ({ template: '<div style="max-width:95vw;margin: 0 auto;"><story/></div>' })], // Add decorators to component, view full-width items    
};

const Template = args => ({
    components: { InboxGrid },
    setup() {
        return {args};
    },
    template: '<InboxGrid v-bind="args"/>',
})
export const Default = Template.bind({
    
});