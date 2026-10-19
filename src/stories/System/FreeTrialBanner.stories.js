import FreeTrialBanner from '@/components/System/FreeTrialBanner.vue';

export default {
    component: FreeTrialBanner,
    title: 'System / Free Trial Banner',
    argTypes: {
        daysLeft: { control: { type: 'number', min: 1, max: 30 } },
    },
};

const Template = (args) => ({
    components: { FreeTrialBanner },
    setup() {
        return { args };
    },
    template: '<FreeTrialBanner v-bind="args" />',
});

export const TwelveDaysLeft = Template.bind({});
TwelveDaysLeft.args = { daysLeft: 12 };

export const LastDay = Template.bind({});
LastDay.args = { daysLeft: 1 };
