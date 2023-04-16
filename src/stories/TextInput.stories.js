import TextInput from './TextInput.vue';
import { action } from '@storybook/addon-actions';

export default {
  component: TextInput,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Text Input',
}

const Template = args => ({
    components: { TextInput },
    setup() {
        return args
    },
    template: '<TextInput v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    label: 'Default Label'
}