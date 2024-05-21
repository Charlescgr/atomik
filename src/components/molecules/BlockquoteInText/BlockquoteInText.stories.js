import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import BlockquoteInText from './BlockquoteInText';

export default {
  title: 'Components/Molecules/BlockquoteInText',
  component: BlockquoteInText,
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
  <BlockquoteInText
    title="Summary"
    text="¿Cómo podemos diseñar una educación que tenga como resultado niños más responsables? En este artículo compartimos algunas estrategias que aumentan la probabilidad de éxito para este objetivo."
  />
);
