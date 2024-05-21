import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import LoadingText from './LoadingText';

export default {
  title: 'Components/Organisms/LoadingText',
  component: LoadingText,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

export const Default = () => <LoadingText />;

export const WithProps = () => <LoadingText color="red.600" />;
