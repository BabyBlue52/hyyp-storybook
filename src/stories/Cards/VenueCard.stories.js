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
        imgUrl: 'https://images.pexels.com/photos/5865065/pexels-photo-5865065.jpeg',
        size: 'Small',
        totalRooms: 6,
    },
};

export const Medium = Template.bind({});
Medium.args = {
    room: {
        imgUrl: 'https://images.pexels.com/photos/17206112/pexels-photo-17206112.jpeg',
        size: 'Medium',
        totalRooms: 12,
    },
};

export const Large = Template.bind({});
Large.args = {
    room: {
        imgUrl: 'https://images.pexels.com/photos/17109095/pexels-photo-17109095.jpeg',
        size: 'Large',
        totalRooms: 2,
    },
};
