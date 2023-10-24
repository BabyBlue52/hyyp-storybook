import EventBlock from '../../components/Calendar/EventBlock';

export default {
    component: EventBlock,
    title: 'Calendar / Event Block'
}

const Template = args => ({
    components: { EventBlock },
    setup() {
        return {args};
    },
    template: '<EventBlock v-bind="args"/>'
})

export const Default = Template.bind({});
Default.args = {
    event: "empty"
}

export const Populated = Template.bind({});
Populated.args = {
    event: "booked"
}

export const Today = Template.bind({});
Today.args = {
    event: "today"
}

export const Highlighted = Template.bind({});
Highlighted.args = {
    event: "highlighted"
}
