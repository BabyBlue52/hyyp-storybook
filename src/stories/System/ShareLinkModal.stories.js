import ShareLinkModal from './ShareLinkModal.vue';
import { action } from '@storybook/addon-actions';

export default {
  component: ShareLinkModal,
  //👇 Our exports that end in "Data" are not stories.
  title: 'System / Sharing Modal',
}

const Template = args => ({
    components: { ShareLinkModal },
    setup() {
        return args
    },
    template: '<ShareLinkModal v-bind="args" />'
})

export const CopyLink = Template.bind({})
CopyLink.args = {
  isOpen: true, 
  isCopied: false,
  link: 'https://youtu.be/cr26C8p8Lfo'
}