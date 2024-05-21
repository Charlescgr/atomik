import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { withNextRouter } from 'storybook-addon-next-router';

import SearchDiseases from './SearchDiseases';

export default {
  title: 'Components/Molecules/SearchDiseases',
  component: SearchDiseases,
  decorators: [withA11y, withKnobs, withNextRouter],
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

export const Default = () => {
  const title = text('Title', 'Enfermedades A-Z');
  const messages = object('Messages', {
    textIntro: 'Busca enfermedades por su primera letra:',
    recommendations: {
      label: 'Ver todas',
      url: '/single'
    }
  });

  return (
    <div style={{ maxWidth: '1024px' }}>
      <SearchDiseases messages={messages} title={title} />
    </div>
  );
};
