import Modal from '@/components/Modals/Modal.vue';

export default {
  component: Modal,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Modals / Default Modal',
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
