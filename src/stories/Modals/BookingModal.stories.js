import BookingModal from '@/components/Modals/BookingModal.vue';

export default {
    component: BookingModal,
    title: 'Modals / Booking Modal',
    argTypes: {
        isOpen: { control: 'boolean' },
        text: { control: 'text' },
        pricePerHr: { control: 'number' },
        initialHours: { control: 'number' },
    },
};

const Template = (args) => ({
    components: { BookingModal },
    setup() {
        return { args };
    },
    template: '<BookingModal v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    text: 'Rainey Street Social',
    venueId: 12349,
    pricePerHr: 42,
    initialHours: 2,
    initialSize: 'MD',
    availableRoomSizeOptions: [
        { value: 'SM', label: 'Small' },
        { value: 'MD', label: 'Medium' },
        { value: 'LG', label: 'Large' },
    ],
};