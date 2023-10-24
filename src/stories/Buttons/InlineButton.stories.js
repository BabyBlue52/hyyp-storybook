import InlineButton from '../../components/Buttons/InlineButton';

import { action } from '@storybook/addon-actions';

export default {
    component: InlineButton,
    title: 'Buttons / Secondary Button',
};

const Template = args => ({
    components: { InlineButton },
    setup() {
        return {args};
    },
    template: '<InlineButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    title: 'Default Button',
    enabled: true
}
