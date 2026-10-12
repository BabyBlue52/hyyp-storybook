import SearchResultCardMini from '@/components/Cards/SearchResultCardMini.vue';

export default {
    component: SearchResultCardMini,
    title: 'Cards / Search Result Card Mini',
    parameters: {
        docs: {
            description: {
                component: 'Compact venue card used in map popups on mobile.',
            },
        },
    },
};

const Template = (args) => ({
    components: { SearchResultCardMini },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 360px; padding: 16px;"><SearchResultCardMini v-bind="args" /></div>',
});

export const WithPrice = Template.bind({});
WithPrice.args = {
    location: {
        id: 12349,
        venue_name: 'Rainey Street Social',
        venue_district: 'Rainey Street',
        price_per_hr: 42,
        imageData: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
};

export const ContactForPricing = Template.bind({});
ContactForPricing.args = {
    location: {
        id: 12350,
        venue_name: 'East Austin Loft',
        venue_district: 'East Side',
        price_per_hr: null,
        imageData: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
};
