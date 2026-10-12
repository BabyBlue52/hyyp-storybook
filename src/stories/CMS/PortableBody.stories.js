import PortableBody from '@/components/CMS/PortableBody.vue';

export default {
    component: PortableBody,
    title: 'CMS / Portable Body',
};

const Template = (args) => ({
    components: { PortableBody },
    setup() {
        return { args };
    },
    template: '<PortableBody v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    value: [
        {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: 'intro-span',
                    text: 'These terms are a placeholder. Publish a Legal page in Sanity to replace this copy.',
                    marks: [],
                },
            ],
        },
        {
            _type: 'block',
            _key: 'heading',
            style: 'h2',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: 'heading-span',
                    text: 'Using the site',
                    marks: [],
                },
            ],
        },
        {
            _type: 'block',
            _key: 'body',
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: 'body-span',
                    text: 'Studio editors can change headings, lists, and links here without a deploy.',
                    marks: [],
                },
            ],
        },
    ],
};
