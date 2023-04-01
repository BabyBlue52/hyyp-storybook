import SpecialActionButton from './SpecialActionButton';

import { action } from '@storybook/addon-actions';

export default {
    component: SpecialActionButton,
    title: 'Special Action Button',
};

const Template = args => ({
    components: { SpecialActionButton },
    setup() {
        return {args};
    },
    template: '<SpecialActionButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    
}
