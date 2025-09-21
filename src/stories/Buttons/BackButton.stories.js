import BackButton from '../../components/Buttons/BackButton';

import { action } from 'storybook/actions';

export default  {
    title: 'Buttons / Back Button',
    component: BackButton,
};

export const Basic = {
    args: {
      title: 'Back to Calendar',
    },
};