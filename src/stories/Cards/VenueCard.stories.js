import VenueCard from '@/components/Cards/VenueCard.vue';

export default {
    title: 'Card / Venue Room Card',
    component: VenueCard,
};

const Template = (args) => ({
    components: { VenueCard },
    setup() {
        return { args };
    },
    template: '<VenueCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    room: {
        imgUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        size: 'Medium',
        totalRooms: 6,
    },
};

export const Small = Template.bind({});
Small.args = {
    room: {
        imgUrl: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
        size: 'Small',
        totalRooms: 12,
    },
};

export const Large = Template.bind({});
Large.args = {
    room: {
        imgUrl: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=1200',
        size: 'Large',
        totalRooms: 2,
    },
};
