<<<<<<< HEAD
import SecondaryButton from '../../components/Buttons/SecondaryButton.vue';
=======
import SecondaryButton from '../../components/Buttons/SecondaryButton';
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)

export default {
    component: SecondaryButton,
    title: 'Buttons / Secondary Button',
    argTypes: {
        text: { control: 'text' },
        icon: { control: 'text' },
        disabled: { control: 'boolean' },
    },
};

const Template = (args) => ({
    components: { SecondaryButton },
    setup() {
        return { args };
    },
<<<<<<< HEAD
    template: '<SecondaryButton v-bind="args" @click="args.onClick" />',
=======
    template: '<SecondaryButton v-bind="args"/>',
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
});

export const Default = Template.bind({});
Default.args = {
    text: 'Secondary Button',
<<<<<<< HEAD
    onClick: () => {},
=======
    disabled: false,
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
};

export const WithIcon = Template.bind({});
WithIcon.args = {
<<<<<<< HEAD
    text: 'Save calendar',
    icon: 'check',
    onClick: () => {},
=======
    text: 'Edit',
    icon: 'pencil',
    disabled: false,
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Secondary Button',
    disabled: true,
<<<<<<< HEAD
    onClick: () => {},
=======
>>>>>>> 9870d21 (Add additional component styles, sync with clientApp)
};
