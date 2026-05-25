import Link from '@/components/UI/Link.vue';

export default {
    component: Link,
    title: 'System / Link',
};

const Template = (args) => ({
    components: { Link },
    setup() {
        return { args };
    },
    template: '<Link v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    text: 'Browse Venues',
    url: '#',
};
