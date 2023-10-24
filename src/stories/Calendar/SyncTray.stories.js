import SyncTray from '../../components/Calendar/SyncTray';
// import { action } from '@storybook/addon-actions';

export default {
    component: SyncTray,
    title: 'Calendar / Sync Button Tray',

};

const Template = args => ({
    components: { SyncTray },
    setup() {
        return {args};
    },
    template: '<SyncTray v-bind="args"/>'
})


export const Default = Template.bind({});
Default.args = {
    
}
