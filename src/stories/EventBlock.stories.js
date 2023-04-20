import EventBlock from './EventBlock';

export default {
    component: EventBlock,
    title: 'Calendar Event Block'
}

const Template = args => ({
    components: { EventBlock },
    setup() {
        return {args};
    },
    template: '<EventBlock v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    isBooked: true
}
