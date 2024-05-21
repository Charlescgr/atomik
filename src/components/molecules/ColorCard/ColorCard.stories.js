import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ColorCard from './ColorCard';

export default {
  title: 'Others/ColorCard',
  component: ColorCard,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'The ColorCard component is an auxiliary component to represent a single color.',
  }
};

export const Default = () => <ColorCard color="#123456" />;
