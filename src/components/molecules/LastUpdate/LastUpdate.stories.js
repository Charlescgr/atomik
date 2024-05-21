import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import LastUpdate from './LastUpdate';

export default {
  title: 'Components/Molecules/LastUpdate',
  component: LastUpdate,
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

export const Default = () => <LastUpdate date="14 Agosto, 2020" messages={{ lastUpdate: 'Última actualización:' }} />;
