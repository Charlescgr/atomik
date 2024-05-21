import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import WpBar from './WpBar';

export default {
  title: 'Components/Molecules/WpBar',
  component: WpBar,
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
  <WpBar
    wpLoggedIn={{
      isLogged: true,
      id: 1,
      type: 'post'
    }}
  />
);
