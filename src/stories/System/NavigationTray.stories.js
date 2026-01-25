import NavigationTray from '../../components/System/NavigationTray.vue';

export default {
    component: NavigationTray,
    title: 'System / Nav Tray',
}

const Template = args => ({
    components: { NavigationTray },
    setup() {
        return { args };
    },
    template: '<NavigationTray v-bind="args"/>'
})

export const Default = Template.bind({});
Default.args = {}
