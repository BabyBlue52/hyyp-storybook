import Button from './Button';

import { action } from '@storybook/addon-actions';

export default {
    component: Button,
    title: 'Primary Button',
};

const Template = args => ({
    components: { Button },
    setup() {
        return {args};
    },
    template: '<Button v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    title: 'Default Button',
    enabled: true
}
