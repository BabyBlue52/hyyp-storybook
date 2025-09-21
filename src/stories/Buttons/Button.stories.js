import Button from '../../components/Buttons/Button';

import { action } from 'storybook/actions';

export default {
    component: Button,
    title: 'Buttons / Primary Button',
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
