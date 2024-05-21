import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SocialLinks from './SocialLinks';

import { socialLinks } from '../../../../mocks/em/menusData';

export default {
  title: 'Components/Molecules/SocialLinks',
  component: SocialLinks,
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
  <SocialLinks
    links={socialLinks}
  />
);

export const WithProps = () => (
  <SocialLinks
    links={socialLinks}
    iconColor="orange.300"
    className="d--flex jc--center"
  />
);
