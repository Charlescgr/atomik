import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import StarsPoints from './StarsPoints';

export default {
  title: 'Components/Molecules/StarsPoints',
  component: StarsPoints,
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

export const Default = () => <StarsPoints stars={3.5} />;

export const WithProps = () => (
  <StarsPoints
    stars={{
      veracity: 3,
      communicatibility: 4,
      punctuality: 5
    }}
    size="small"
  />
);
