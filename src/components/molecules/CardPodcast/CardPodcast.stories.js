import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import CardPodcast from './CardPodcast';

export default {
  title: 'Components/Molecules/CardPodcast',
  component: CardPodcast,
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
  <div style={{ maxWidth: '312px' }}>
    <CardPodcast
      title="Cuáles son los tipos de inteligencia?"
      time={48}
      figure={
        {
          src: '../img/storybook_examples/image__podcast__01.jpg',
          alt: '¿Cómo actuar cuando un niño golpea a su hermano?',
          lazy: false
        }
      }
      url="/single"
      className="m--x-big"
    />
  </div>
);
