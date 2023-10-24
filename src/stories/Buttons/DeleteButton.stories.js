import DeleteButton from '../../components/Buttons/DeleteButton';

import { action } from '@storybook/addon-actions';

export default {
    component: DeleteButton,
    title: 'Buttons / Delete Button',
};

const Template = args => ({
    components: { DeleteButton },
    setup() {
        return {args};
    },
    template: '<DeleteButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
