import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import AuthorAndDate from './AuthorAndDate';

export default {
  title: 'Components/Molecules/AuthorAndDate',
  component: AuthorAndDate,
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
  <AuthorAndDate author="Sebastián Castaño" date="14 Agosto, 2020" messages={{ writtenBy: 'Escrito por' }} />
);
