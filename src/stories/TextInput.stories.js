import TextInput from '@/components/TextInput.vue';
import { action } from '@storybook/addon-actions';

export default {
  component: TextInput,
  //👇 Our exports that end in "Data" are not stories.
  title: 'System / Text Input',
}

const Template = args => ({
    components: { TextInput },
    setup() {
        return args
    },
    template: '<div style="max-width:300px"><TextInput v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
    label: 'Default Label'
}