import PopupContent from '@/components/Map/PopupContent.vue';

export default {
    component: PopupContent,
    title: 'Map / Popup Content',
};

const Template = (args) => ({
    components: { PopupContent },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 320px"><PopupContent v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    venue: {
        id: 'demo-venue-1',
        venue_name: 'The Roof',
        venue_district: 'Downtown',
        price_per_hr: 250,
        imageData: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
};

export const ContactForPricing = Template.bind({});
ContactForPricing.args = {
    venue: {
        id: 'demo-venue-2',
        venue_name: 'Garden Loft',
        venue_district: 'East Side',
        price_per_hr: null,
        imageData: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
};
