import AvatarLarge from '@/components/UI/AvatarLarge.vue';

export default {
    component: AvatarLarge,
    title: 'System / Avatar Large',
};

const Template = (args) => ({
    components: { AvatarLarge },
    setup() {
        return { args };
    },
    template: '<AvatarLarge v-bind="args" />',
});

export const WithImage = Template.bind({});
WithImage.args = {
    userInitials: 'DK',
    src: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
};

export const Initials = Template.bind({});
Initials.args = {
    userInitials: 'DK',
    src: '',
};
