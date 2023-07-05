import TimeScale from './TimeScale';
// import { action } from '@storybook/addon-actions';

export default {
    component: TimeScale,
    title: 'Calendar / Time Scale Selector',

};

const Template = args => ({
    components: { TimeScale },
    setup() {
        return {args};
    },
    template: '<TimeScale v-bind="args"/>'
})


export const Default = Template.bind({});
Default.args = {
    
}
