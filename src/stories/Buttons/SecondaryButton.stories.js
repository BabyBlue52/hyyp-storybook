import SecondaryButton from '../../components/Buttons/SecondaryButton.vue';

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
    template: '<SecondaryButton v-bind="args" @click="args.onClick" />',
});

export const Default = Template.bind({});
Default.args = {
    text: 'Secondary Button',
    onClick: () => {},
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    text: 'Save calendar',
    icon: 'check',
    onClick: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Secondary Button',
    disabled: true,
    onClick: () => {},
};
