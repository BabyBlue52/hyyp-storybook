import BackButton from './BackButton';

import { action } from '@storybook/addon-actions';

export default  {
    title: 'Buttons / Back Button',
    component: BackButton,
};

export const Basic = {
    args: {
      title: 'Back to Calendar',
    },
};