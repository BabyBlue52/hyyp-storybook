import LoginModal from '@/components/Modals/LoginModal.vue';

export default {
  component: LoginModal,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Modals / Login Modal',
}

const Template = args => ({
    components: { LoginModal },
    setup() {
        return args
    },
    template: '<LoginModal v-bind="args" />'
})

export const SignInPrompt = Template.bind({})
SignInPrompt.args = {
    text: 'Login Modal!'
}
