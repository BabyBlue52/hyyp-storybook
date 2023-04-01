import EditButton from './EditButton';

import { action } from '@storybook/addon-actions';

export default {
    component: EditButton,
    title: 'Edit Button',
};

const Template = args => ({
    components: { EditButton },
    setup() {
        return {args};
    },
    template: '<EditButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    isActive: false
}
