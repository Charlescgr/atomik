import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import LegalItems from './LegalItems';

import { legalLinks } from '../../../../mocks/em/menusData';

export default {
  title: 'Components/Molecules/LegalItems',
  component: LegalItems,
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
  <LegalItems
    legalLinks={legalLinks}
  />
);

export const WithProps = () => (
  <LegalItems
    className="d--flex jc--space-between"
    legalLinks={legalLinks}
    textColor="lime.500"
  />
);
