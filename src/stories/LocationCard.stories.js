import SearchResultCard from '@/components/Cards/SearchResultCard.vue';

/** @deprecated Use Cards / Search Result Card. Kept so existing links still resolve. */
export default {
    title: 'System / Location Card',
    component: SearchResultCard,
    parameters: {
        docs: {
            description: {
                component: 'Alias of Cards / Search Result Card (replaces the old LocationCard).',
            },
        },
    },
};

const Template = (args) => ({
    components: { SearchResultCard },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 480px; padding: 16px;"><SearchResultCard v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    location: {
        id: 12349,
        venue_name: 'Rainey Street Social',
        venue_district: 'Rainey Street',
        price_per_hr: 42,
        imageData: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
};