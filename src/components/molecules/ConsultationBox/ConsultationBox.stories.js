import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ConsultationBox from './ConsultationBox';

export default {
  title: 'Components/Molecules/ConsultationBox',
  component: ConsultationBox,
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
  <div style={{ maxWidth: '400px' }}>
    <ConsultationBox
      title="¿Necesitas ayuda?"
      figure={{
        src: '../img/storybook_examples/illustration__01.png',
        alt: '...',
        height: 176,
        width: 300,
      }}
      messages={{
        professional: 'Gema Sanches',
        description: 'es psicóloga y ofrece consultas online.',
        consult: { label: 'Pedir Cita', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89?modal=appointments' },
        info: { label: '+ info', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89' },
      }}
    />
  </div>
);
