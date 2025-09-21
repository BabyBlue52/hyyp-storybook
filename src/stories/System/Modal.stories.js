import Modal from '../../components/System/Modal';
import { action } from 'storybook/actions';

export default {
  component: Modal,
  //👇 Our exports that end in "Data" are not stories.
  title: 'System / Modal',
}

const Template = args => ({
    components: { Modal },
    setup() {
        return args
    },
    template: '<Modal v-bind="args" />'
})

export const SignInPrompt = Template.bind({})
SignInPrompt.args = {
    text: 'Modal!'
}
