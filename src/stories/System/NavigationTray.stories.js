import NavigationTray from '../../components/System/NavigationTray';

export default {
    component: NavigationTray,
    title: 'System / Nav Tray'
}

const Template = args => ({
    components: { NavigationTray },
    setup() {
        return {args};
    },
    template: '<NavigationTray v-bind="args"/>'
})
// export const actionsData = {

// }

export const Default = Template.bind({});
Default.args = {
    // title: 'Default Button',
    // enabled: true
}
