import BookingModal from '@/components/Modals/BookingModal.vue';

export default {
    component: BookingModal,
    title: 'Modals / Booking Modal'
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