import RequestSidebar from './RequestSidebar.vue';
// import { action } from '@storybook/addon-actions';

export default {
  component: RequestSidebar,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Sidebars / Request Sidebar',
}

const Template = args => ({
    components: { RequestSidebar },
    setup() {
        return args
    },
    template: '<RequestSidebar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    // text: 'Sidebar!'
}