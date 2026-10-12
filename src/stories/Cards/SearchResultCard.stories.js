import SearchResultCard from '@/components/Cards/SearchResultCard.vue';

export default {
    component: SearchResultCard,
    title: 'Cards / Search Result Card',
    parameters: {
        docs: {
            description: {
                component:
                    'Map list card. Shows starting hourly price when `price_per_hr` is set; otherwise “Contact for pricing”.',
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

export const Selected = Template.bind({});
Selected.args = {
    ...WithPrice.args,
};
Selected.decorators = [
    () => ({
        template: '<div class="selected" style="max-width: 480px; padding: 16px;"><story /></div>',
    }),
];
