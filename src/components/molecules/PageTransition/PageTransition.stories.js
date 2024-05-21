import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import PageTransition from './PageTransition';

export default {
  title: 'Components/Molecules/PageTransition',
  component: PageTransition,
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

export const Default = () => (
  <PageTransition />
);
