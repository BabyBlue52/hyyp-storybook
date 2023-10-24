import BookingModal from '../../components/System/BookingModal';

export default {
    component: BookingModal,
    title: 'Calendar / Booking Modal'
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