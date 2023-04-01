import SaveButton from './SaveButton';

import { action } from '@storybook/addon-actions';

export default {
    component: SaveButton,
    title: 'Save Button',
};

const Template = args => ({
    components: { SaveButton },
    setup() {
        return {args};
    },
    template: '<SaveButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    enabled: true
}
