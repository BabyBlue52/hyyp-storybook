import Header from './Header';
import { action } from '@storybook/addon-actions';


export default {
    component: Header, 
    title: 'System / Header',
    decorators: [() => ({ template: '<div style="max-width:95vw;margin: 0 auto;"><story/></div>' })], // Add decorators to component, view full-width items    
};

const Template = args => ({
    components: { Header },
    setup() {
        return {args};
    },
    template: '<Header v-bind="args"/>',
})
export const Basic = Template.bind({
    userAuth: false,
    isPremium: false,
    userInitials: 'DK',
});

export const Premium = Template.bind({
    userAuth: true,
    isPremium: true,
    userInitials: 'DK',
});
