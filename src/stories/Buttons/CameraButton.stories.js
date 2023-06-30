import CameraButton from './CameraButton';
// import { action } from '@storybook/addon-actions';

export default {
    component: CameraButton,
    title: 'Buttons / Choose Image Button',
    argTypes: {
        onToggle: Boolean
    }
};

const Template = args => ({
    components: { CameraButton },
    setup() {
        return {args};
    },
    template: '<CameraButton v-bind="args"/>'
})


export const Default = Template.bind({});
Default.args = {
    isActive: false
}
