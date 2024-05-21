import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Tabs from './Tabs';
import Box from '../../atoms/Box';

export default {
  title: 'Components/Molecules/Tabs',
  component: Tabs,
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
  <Tabs activeTab={2}>
    <Box label="Tab-1">
      Im the Tab #1
    </Box>
    <Box label="Tab-2">
      Im the Tab #2
    </Box>
    <Box label="Tab-3">
      Im the Tab #3
    </Box>
  </Tabs>
);
