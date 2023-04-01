import Header from './Header';
import { action } from '@storybook/addon-actions';

import logo from './assets/hyyp.svg';

export default {
    component: Header, 
    title: 'System Header',
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
    isPremium: false,
    userInitials: 'DK',
});

  export const Premium = Template.bind({
    isPremium: true,
    userInitials: 'DK',
  });
