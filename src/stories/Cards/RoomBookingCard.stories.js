import RoomBookingCard from '@/components/Cards/RoomBookingCard.vue';

export default {
    component: RoomBookingCard,
    title: 'Cards / Room Booking Card',
};

const Template = (args) => ({
    components: { RoomBookingCard },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 320px; padding: 24px"><RoomBookingCard v-bind="args" /></div>',
});

export const Booked = Template.bind({});
Booked.args = {
    booking: {
        id: 1,
        date: '2026-07-26',
        bookingStatus: 'complete',
        startTime: '10:00',
        endTime: '14:00',
    },
};

export const Pending = Template.bind({});
Pending.args = {
    booking: {
        id: 2,
        date: '2026-07-26',
        bookingStatus: 'pending',
        startTime: '16:00',
        endTime: '20:00',
    },
};
