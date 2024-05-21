import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import NoteBox from './NoteBox';

export default {
  title: 'Components/Molecules/NoteBox',
  component: NoteBox,
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
  <NoteBox
    title="Equipo médico de La Mente es Maravillosa"
    description="La Mente es Maravillosa es un portal web que ofrece información comprensible, confiable y actualizada sobre psicología. Nuestro objetivo es mantener un enfoque humano sobre el contenido de psicología y autoconocimiento."
    figure={{
      src: '../img/storybook_examples/illustration__medic-team.svg',
      alt: 'Equipo médico de La Mente es Maravillosa',
      width: '300',
      height: 'auto'
    }}
    button={{
      label: 'Descubre el equipo médico',
      url: '/single'
    }}
  />
);
