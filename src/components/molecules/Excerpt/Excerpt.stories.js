import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Excerpt from './Excerpt';

export default {
  title: 'Components/Molecules/Excerpt',
  component: Excerpt,
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
  <Excerpt
    color="main.400"
    content="<p>¿Cómo podemos diseñar una educación que tenga como resultado niños más responsables?&nbsp;<strong>En este artículo compartimos</strong>
        &nbsp;algunas&nbsp;<a href='#' title='...'>estrategias que aumentan la probabilidad de</a>&nbsp;éxito para este objetivo. Sin embargo, para lograrlo
        es importante comenzar poco a poco. Las siguientes propuestas, pueden ser muy útiles para conseguirlo.</p>"
  />
);
