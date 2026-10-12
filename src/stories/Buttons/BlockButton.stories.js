import BlockButton from '@/components/Buttons/BlockButton.vue';

export default {
    component: BlockButton,
    title: 'Buttons / Block Button',
    argTypes: {
        text: { control: 'text' },
        blocked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        onToggle: { action: 'toggle' },
    },
};

const Template = (args) => ({
    components: { BlockButton },
    setup() {
        return { args };
    },
    template: '<BlockButton v-bind="args" @toggle="args.onToggle" />',
});

export const Available = Template.bind({});
Available.args = {
    text: 'Weekends',
    blocked: false,
};

export const Blocked = Template.bind({});
Blocked.args = {
    text: 'Weekends',
    blocked: true,
};
