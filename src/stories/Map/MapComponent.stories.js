import MapComponent from '@/components/Map/MapComponent.vue';

export default {
    component: MapComponent,
    title: 'Map / Map Component',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Requires `VITE_MAPBOX_API_KEY` and `VITE_MAPSTYLE` env vars to render tiles.',
            },
        },
    },
};

const Template = (args) => ({
    components: { MapComponent },
    setup() {
        return { args };
    },
    template: '<div style="height: 70vh; width: 100%;"><MapComponent v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    center: [-97.7431, 30.2672],
    usePopups: true,
    markers: [
        {
            id: 'demo-1',
            venue_name: 'The Roof',
            venue_district: 'Downtown',
            price_per_hr: 250,
            coordinates: [-97.7431, 30.2672],
            imageData: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
            id: 'demo-2',
            venue_name: 'Garden Loft',
            venue_district: 'East Side',
            price_per_hr: 180,
            coordinates: [-97.733, 30.2705],
            imageData: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
    ],
};
