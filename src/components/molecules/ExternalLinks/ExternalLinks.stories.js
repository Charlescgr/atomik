import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ExternalLinks from './ExternalLinks';

import { externalLinks } from '../../../../mocks/lmem/menusData';

export default {
  title: 'Components/Molecules/ExternalLinks',
  component: ExternalLinks,
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
  <ExternalLinks links={externalLinks} messages={{ otherSites: 'Other Sites' }} className="pt--big" />
);
