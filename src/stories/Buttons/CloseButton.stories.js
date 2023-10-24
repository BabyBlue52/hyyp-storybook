import CloseButton from '../../components/Buttons/CloseButton';

import { action } from '@storybook/addon-actions';

export default {
    component: CloseButton,
    title: 'Buttons / Close Button',
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
