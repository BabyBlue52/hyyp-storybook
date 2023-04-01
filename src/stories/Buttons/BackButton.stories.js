import BackButton from './BackButton';

import { action } from '@storybook/addon-actions';

export default {
    component: BackButton,
    title: 'Back Button',
};

const Template = args => ({
    components: { BackButton },
    setup() {
        return {args};
    },
    template: '<BackButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    title: 'Back to Calendar',
    // enabled: true
}
