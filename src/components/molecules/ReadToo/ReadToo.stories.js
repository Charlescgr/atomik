import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import ReadToo from './ReadToo';

export default {
  title: 'Components/Molecules/ReadToo',
  component: ReadToo,
  decorators: [withA11y, withNextRouter],
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
  <ReadToo
    text="Descubre:"
    url="/"
    title="13 ideas para hacer juego con bebés."
    className="ta--center"
  />
);
