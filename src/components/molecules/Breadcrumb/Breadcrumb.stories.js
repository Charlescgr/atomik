import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'Components/Molecules/Breadcrumb',
  component: Breadcrumb,
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
  <Breadcrumb
    items={[
      { to: '/', label: 'Home' },
      { to: '/category/psi', label: 'Psicología' },
      {
        to: '/category/psi/education-and-development',
        label: 'Educativa y desarrollo',
        active: true
      }
    ]}
  />
);
