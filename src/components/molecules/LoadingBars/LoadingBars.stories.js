import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import LoadingBars from './LoadingBars';

export default {
  title: 'Components/Molecules/LoadingBars',
  component: LoadingBars,
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
  <>
    <div style={{ width: '70px', height: '70px' }}>
      <LoadingBars />
    </div>
  </>
);

export const WhithProps = () => (
  <LoadingBars color="main" />
);
