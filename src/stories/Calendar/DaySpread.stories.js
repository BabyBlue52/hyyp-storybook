import DaySpread from './DaySpread';

export default {
    component: DaySpread,
    title: 'Calendar / Day Spread'
}

const Template = args => ({
    components: { DaySpread },
    setup() {
        return {args};
    },
    template: '<DaySpread v-bind="args"/>'
})

export const Default = Template.bind({});
Default.args = {

}