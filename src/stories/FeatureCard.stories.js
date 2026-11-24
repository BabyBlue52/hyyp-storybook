import FeatureCard from '../components/Cards/FeatureCard.vue';

export default {
    title: 'Cards / Feature Card',
    component: FeatureCard,
};

export const Default = {
    render: () => ({
        components: { FeatureCard },
        template: `
            <FeatureCard>
                <template #image>
                    <img src="https://pub-a50337465ffb44ff984808fdb4ff4ea7.r2.dev/static/email_8216525.png" alt="Contact icon" />
                </template>
                <template #text>
                    <h4>Contact venue owners directly</h4>
                    <p>Get in touch with venue owners directly through our platform.</p>
                </template>
            </FeatureCard>
        `,
    }),
};
