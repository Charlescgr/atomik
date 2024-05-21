import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import CardDefault from './CardDefault';

export default {
  title: 'Components/Molecules/CardDefault',
  component: CardDefault,
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
  <CardDefault
    rounded
    shadow
    borderColor="red.500"
    color="lime.100"
    className="p--x-big"
  >
    test
  </CardDefault>
);
