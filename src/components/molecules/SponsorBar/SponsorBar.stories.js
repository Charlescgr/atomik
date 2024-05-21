import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SponsorBar from './SponsorBar';

export default {
  title: 'Components/Molecules/SponsorBar',
  component: SponsorBar,
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
  <SponsorBar
    onContent
    sponsor={{
      brand: 'Mejor Con Salud',
      logo: 'https://cdn.atomik.vip/themes/mcs/es/logo__mobile--reverse.svg',
      type: 'Especial Publicidad',
      background: 'gray',
      color: 'white'
    }}
  />
);
