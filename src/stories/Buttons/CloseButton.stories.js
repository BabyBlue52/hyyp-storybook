import CloseButton from './CloseButton';

import { action } from '@storybook/addon-actions';

export default {
    component: CloseButton,
    title: 'Close Button',
};

const Template = args => ({
    components: { CloseButton },
    setup() {
        return {args};
    },
    template: '<CloseButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
