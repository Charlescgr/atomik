import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Navigation from './Navigation';

const menusOneLevel = require('../../../../mocks/vbb/menusData');
const menusTwoLevel = require('../../../../mocks/lmem/menusData');
const menusThreeLevel = require('../../../../mocks/em/menusData');

const messages = {
  anchorsTitle: 'En este artículo',
  labelFilterButton: 'Filtrar',
  menuButtonAriaLabel: 'Menú de Navegación',
  result: 'resultado',
  results: 'resultados',
  darkModeButtonAriaLabel: 'Modo oscuro',
  searchButtonAriaLabel: 'Búsqueda',
  seeLess: 'Ver menos',
  seeMore: 'Ver más',
  userButtonAriaLabel: 'Usuario'
};

export default {
  title: 'Components/Organisms/Navigation',
  component: Navigation,
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

export const DefaultOneLevel = () => {
  const {
    main = [],
    socialLinks = [],
    legalLinks = [],
    lastPostsCategory
  } = menusOneLevel || {};
  const categories = main.filter((item) => item.type !== 'post_type');
  const extraLinks = main.filter((item) => item.type === 'post_type');
  return (
    <Navigation
      menus={{ categories, extraLinks, lastPostsCategory }}
      messages={messages}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
    />
  );
};
export const DefaultTwoLevel = () => {
  const {
    main = [],
    socialLinks = [],
    legalLinks = [],
  } = menusTwoLevel || {};
  const categories = main.filter((item) => item.type !== 'post_type');
  const extraLinks = main.filter((item) => item.type === 'post_type');
  return (
    <Navigation
      menus={{ categories, extraLinks }}
      messages={messages}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
    />
  );
};
export const DefaultThreeLevel = () => {
  const {
    main = [],
    socialLinks = [],
    legalLinks = [],
  } = menusThreeLevel || {};
  const categories = main.filter((item) => item.type !== 'post_type');
  const extraLinks = main.filter((item) => item.type === 'post_type');
  return (
    <Navigation
      menus={{ categories, extraLinks }}
      messages={messages}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
    />
  );
};
