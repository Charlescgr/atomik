import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import AccordionItem from './AccordionItem';

const accordion = {
  title: '¿Cómo puedo aceptar mis defectos?',
  featured_media: '../img/example/image__accordion.jpg',
  excerpt: 'Snsaciones y sentimientos puedan tener cabida muchos es un tema polémico. Pensar que en nuestro registro de afectos...',
  permalink: '/single',
  slug: ''
};

export default {
  title: 'Components/Molecules/AccordionItem',
  component: AccordionItem,
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
  <AccordionItem
    textColor="main.800"
    accordion={accordion}
    messages={{
      readMore: 'Continuar leyendo'
    }}
  />
);
