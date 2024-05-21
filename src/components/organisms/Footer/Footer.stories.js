import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Footer from './Footer';

const menus = require('../../../../mocks/lmem/menusData');
const sidebars = require('../../../../mocks/lmem/sidebarsData');

const sidebarsFooter = Array.isArray(sidebars.default) && sidebars.default.length ? sidebars.default[0].widgets.slice(0, 2) : [];
const {
  socialLinks = [],
  externalLinks = [],
  versionLinks = [],
  legalLinks = [],
} = menus || {};

export default {
  title: 'Components/Organisms/Footer',
  component: Footer,
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
  <Footer
    socialLinks={[]}
    externalLinks={[]}
    versionLinks={[]}
    legalLinks={[]}
    sidebars={[]}
    honCode="HONConduct127493"
    platformConfig={{
      name: '',
      disclaimer: '',
      description: ''
    }}
  />
);

export const WithVersions = () => (
  <Footer
    socialLinks={socialLinks}
    externalLinks={[]}
    versionLinks={versionLinks}
    legalLinks={[]}
    sidebars={[]}
    platformConfig={{
      name: '',
      disclaimer: '',
      description: ''
    }}
  />
);

export const WithApp = () => (
  <Footer
    showAppsLink
    socialLinks={socialLinks}
    externalLinks={externalLinks}
    versionLinks={versionLinks}
    legalLinks={[]}
    sidebars={[]}
    platformConfig={{
      name: '',
      disclaimer: '',
      description: ''
    }}
  />
);

export const full = () => (
  <Footer
    showAppsLink
    showNewsletter
    socialLinks={socialLinks}
    externalLinks={externalLinks}
    versionLinks={versionLinks}
    legalLinks={legalLinks}
    sidebars={sidebarsFooter}
    honCode="HONConduct127493"
    platformConfig={{
      name: '',
      disclaimer: '',
      description: ''
    }}
  />
);
