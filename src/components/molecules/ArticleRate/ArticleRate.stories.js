/* eslint-disable no-alert */
import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import ArticleRate from './ArticleRate';

export default {
  title: 'Components/Molecules/ArticleRate',
  component: ArticleRate,
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
  // eslint-disable-next-line no-alert
  <ArticleRate
    messages={{
      success: '¡Gracias por lo feedback!',
      title: '¿Te ha sido útil el artículo?',
      yes: 'Sí',
      no: 'No'
    }}
    onSubmit={(val) => alert(`Votou: ${val}`)}
  />
);
