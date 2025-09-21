import InvertedButton from '../../components/Buttons/InvertedButton';

import { action } from '@storybook/addon-actions';

export default {
    component: InvertedButton,
    title: 'Buttons / Inverted Button',
};

const Template = args => ({
    components: { InvertedButton },
    setup() {
        return {args};
    },
    template: '<InvertedButton v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    title: 'Default Button',
    enabled: true
}

