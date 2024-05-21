import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import WebstoryItem from './WebstoryItem';

export default {
  title: 'Components/Molecules/WebstoryItem',
  component: WebstoryItem,
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
  <WebstoryItem
    title="Consejos de Salud"
    figure="https://lamenteesmaravillosa.com/wp-content/uploads/2020/08/chica-preocupada-pensando-decisiones-150x100.jpg"
  />
);
