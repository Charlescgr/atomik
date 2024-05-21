import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';
import ShareButtons from './ShareButtons';

export default {
  title: 'Components/Molecules/ShareButtons',
  component: ShareButtons,
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

const post = {
  id: 212453,
  slug: 'que-ha-ocurrido-con-los-eufemismos',
  link:
    'https://beta.lamenteesmaravillosa.com/que-ha-ocurrido-con-los-eufemismos/',
  permalink: '/que-ha-ocurrido-con-los-eufemismos/',
  title: '¿Qué ha ocurrido con los eufemismos?',
  metas: {
    'og:image':
      'https://beta.lamenteesmaravillosa.com/wp-content/uploads/2018/12/palabras-saliendo-libro.jpg',
  },
  excerpt:
    '¿Te has planteado las dificultades que tienen los zurdos en un "mundo para diestros"? En la actualidad, la mayoría de&hellip;',
};

export const Default = () => (
  <div style={{ maxWidth: '300px' }}>
    <ShareButtons post={post} link="/" />
  </div>
);

export const WithProps = () => (
  <div style={{ maxWidth: '50px', margin: '50px' }}>
    <ShareButtons post={post} column link="/" />
  </div>
);
