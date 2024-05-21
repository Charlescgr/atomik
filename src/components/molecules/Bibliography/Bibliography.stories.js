import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Bibliography from './Bibliography';

export default {
  title: 'Components/Molecules/Bibliography',
  component: Bibliography,
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
  <div style={{ maxWidth: '580px' }}>
    <Bibliography
      items={
        `<a href="#" target="_blank">Behar, J. P. (2001).</a> <em>Educar niños responsables</em>. Rba.
        Clemes, H., & Bean, R. (2000). <em>Cómo enseñar a sus hijos a ser responsables.</em> Debate.
        Gordon, T., & Fors, G. (2006). <em>Técnicas eficaces para padres: TEP: el programa realmente eficaz para educar niños responsables.</em> Medici.
        López, E. M. H. (2016). <em>Las normas, la responsabilidad y la felicidad de los niños. Diálogo: Familia Colegio</em>, (319), 36-43.`
      }
    />
  </div>
);
