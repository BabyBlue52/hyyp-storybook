import SecondaryButton from '../../components/Buttons/SecondaryButton';

import { action } from 'storybook/actions';

export default {
    component: SecondaryButton,
    title: 'Buttons / Secondary Button',
};

const Template = args => ({
    components: { SecondaryButton },
    setup() {
        return {args};
    },
    template: '<SecondaryButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    title: 'Secondary Button',
}
