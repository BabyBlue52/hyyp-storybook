import RoomCalendar from '@/components/Calendar/RoomCalendar.vue';

export default {
    component: RoomCalendar,
    title: 'Calendar / Room Calendar',
};

const sampleBookings = [
    {
        id: 1,
        date: new Date().toISOString().slice(0, 10),
        bookingStatus: 'complete',
        startTime: '10:00',
        endTime: '14:00',
    },
    {
        id: 2,
        date: new Date().toISOString().slice(0, 10),
        bookingStatus: 'pending',
        startTime: '16:00',
        endTime: '20:00',
    },
];

const Template = (args) => ({
    components: { RoomCalendar },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 960px; padding: 24px"><RoomCalendar v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    bookings: sampleBookings,
};
