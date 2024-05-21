import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import HONCodeBox from './HONCodeBox';

export default {
  title: 'Components/Molecules/HONCodeBox',
  component: HONCodeBox,
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
  <HONCodeBox code="HONConduct127493" messages={{ honCodeAccreditation: 'Esta página cumple con los estándares de calidad informativa' }} />
);
