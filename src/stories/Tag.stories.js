import { ref } from 'vue';
import Tag from '@/components/UI/Tag.vue';

export default {
    title: 'System / Tag',
    component: Tag,
    argTypes: {
        isSelected: { control: 'boolean' },
    },
};

export const Default = {
    args: {
      tag: 'tag one',
      isSelected: true,
    },
    template: '<Tag v-bind="args" />',
};