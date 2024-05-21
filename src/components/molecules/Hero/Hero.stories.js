import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Hero from './Hero';

export default {
  title: 'Components/Molecules/Hero',
  component: Hero,
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
  <Hero
    title="Bienestar"
    text="Ganar en calidad de vida es aprender a invertir en bienestar. Te proponemos descubrirte, profundizar en tu identidad y en tu potencial como persona."
    image="illustration__bienestar.svg"
  />
);
