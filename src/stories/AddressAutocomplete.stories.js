import AddressAutocomplete from '@/components/UI/AddressAutocomplete.vue';

export default {
    component: AddressAutocomplete,
    title: 'System / Address Autocomplete',
};

const Template = (args) => ({
    components: { AddressAutocomplete },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 480px"><AddressAutocomplete v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
    label: 'Address',
    placeholder: 'Start typing an address...',
    modelValue: '',
};
