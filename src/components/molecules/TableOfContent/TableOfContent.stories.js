import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import TableOfContent from './TableOfContent';

export default {
  title: 'Components/Molecules/TableOfContent',
  component: TableOfContent,
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
  <TableOfContent
    loadOpen={false}
    title="Contenidos en este artículo"
    items={[
      { label: '1. Asignarles tareas sencillas', to: '#a' },
      { label: '2. Hacer que las tareas sean divertidas', to: '#b' },
      { label: '3. Los progenitores deben ser un ejemplo', to: '#c' },
      { label: '4. Permitirles que puedan tomar decisiones', to: '#d' },
      { label: '5. Responsabilidad sí, pero normas también', to: '#e' }
    ]}
    className="mt--big mb--normal"
  />
);
