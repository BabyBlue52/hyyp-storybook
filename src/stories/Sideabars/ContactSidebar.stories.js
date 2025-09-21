import ContactSidebar from '../../components/Sidebars/ContactSidebar.vue';
// import { action } from '@storybook/addon-actions';

export default {
  component: ContactSidebar,
  //👇 Our exports that end in "Data" are not stories.
  title: 'Sidebars / Contact Sidebar',
}

const Template = args => ({
    components: { ContactSidebar },
    setup() {
        return args
    },
    template: '<ContactSidebar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    // text: 'Sidebar!'
}

export const EditMode = Template.bind({})
EditMode.args = {
    editMode: true
}