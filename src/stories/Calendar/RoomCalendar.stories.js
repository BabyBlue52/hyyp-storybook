import RoomCalendar from '@/components/Calendar/RoomCalendar.vue';

export default {
    component: RoomCalendar,
    title: 'Calendar / Room Calendar',
};

const Template = (args) => ({
    components: { RoomCalendar },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 560px"><RoomCalendar v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};
