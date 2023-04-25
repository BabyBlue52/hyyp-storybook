import TextArea from './TextArea.vue';
import { action } from '@storybook/addon-actions';

export default {
  component: TextArea,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Text Area',
}

const Template = args => ({
    components: { TextArea },
    setup() {
        return args
    },
    template: '<TextArea v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    label: 'Text Area'
}