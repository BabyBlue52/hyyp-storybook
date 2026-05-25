import TagContainer from '@/components/UI/TagContainer.vue';

export default {
    component: TagContainer,
    title: 'System / Tag Container',
};

const Template = (args) => ({
    components: { TagContainer },
    setup() {
        return { args };
    },
    template: '<div style="position: relative; height: 220px;"><TagContainer v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    tags: ['bar', 'outdoors', 'food', 'music', 'dancefloor', 'theater', 'sports'],
    selectedTags: ['outdoors', 'music'],
};
