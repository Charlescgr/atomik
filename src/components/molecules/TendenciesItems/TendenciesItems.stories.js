import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import TendenciesItems from './TendenciesItems';

import { tendencies } from '../../../../mocks/em/menusData';

export default {
  title: 'Components/Molecules/TendenciesItems',
  component: TendenciesItems,
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
  <TendenciesItems
    tendenciesList={tendencies}
    title="Tendências"
  />
);
