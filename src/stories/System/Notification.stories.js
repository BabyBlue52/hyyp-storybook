import Notification from '../../components/System/Notification.vue';

export default {
    component: Notification,
    title: 'System / Notification',   
    argTypes: {
        variant: {
            options:['Success','Error','System'],
            control: { type: 'radio' },
        },
            
    },
    
}

const Template = args => ({
    components: { Notification },
    setup() {
        return {args};
    },
    template: '<Notification v-bind="args" />',
})

export const Basic = Template.bind({
    args: {
        variant: 'success',
      },
    status: 'success',
})
