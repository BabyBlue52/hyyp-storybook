import BookingModal from './BookingModal';

export default {
    component: BookingModal,
    title: 'System / Booking Modal'
}

const Template = args => ({
    components: { BookingModal },
    setup() {
        return {args};
    },
    template: '<BookingModal v-bind="args"/>'
})

export const Default = Template.bind({});
Default.args = {

}