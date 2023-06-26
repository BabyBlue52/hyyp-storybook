import Sidebar from './Sidebar.vue';
// import { action } from '@storybook/addon-actions';

export default {
  component: Sidebar,
  //👇 Our exports that end in "Data" are not stories.
  title: 'System / Sidebar',
}

const Template = args => ({
    components: { Sidebar },
    setup() {
        return args
    },
    template: '<Sidebar />'
})

export const Default = Template.bind({})
Default.args = {
    // text: 'Sidebar!'
}