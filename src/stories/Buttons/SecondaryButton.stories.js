import SecondaryButton from '../../components/Buttons/SecondaryButton';

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
    template: '<SecondaryButton v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
    text: 'Secondary Button',
    disabled: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    text: 'Edit',
    icon: 'pencil',
    disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Secondary Button',
    disabled: true,
};
