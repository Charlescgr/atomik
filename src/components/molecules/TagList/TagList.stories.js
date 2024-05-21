import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import TagList from './TagList';

export default {
  title: 'Components/Molecules/TagList',
  component: TagList,
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
  <TagList
    tags={[
      { to: '/', label: 'Educación Infantil' },
      { to: '/', label: 'Juegos para niños' },
      { to: '/', label: 'Comportamiento' },
      { to: '/', label: 'Psicología Infantil' }
    ]}
    className="m--big"
  />
);
