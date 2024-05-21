import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Revision from './Revision';

export default {
  title: 'Components/Molecules/Revision',
  component: Revision,
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
  <div style={{ maxWidth: '300px' }}>
    <Revision
      from={{
        avatar: '',
        name: 'Raquel Lemos Rodríguez',
        role: 'la psicóloga',
        date: '20 junio, 2020'
      }}
      messages={{
        writtenBy: 'Escrito por',
        in: 'el',
        makeAppointmentOnline: 'Pedir Cita Online',
        reviewedApprovedBy: 'Revisado e aprobado por'
      }}
      lazy={false}
    />
  </div>
);

export const WithConsult = () => (
  <div style={{ maxWidth: '300px' }}>
    <Revision
      from={{
        name: 'Raquel Lemos Rodríguez',
        avatar:
          '../img/storybook_examples/avatar.png',
        role: 'la psicóloga',
        date: '20 junio, 2020'
      }}
      sessionLink=""
      messages={{
        writtenBy: 'Escrito por',
        in: 'el',
        makeAppointmentOnline: 'Pedir Cita Online',
        reviewedApprovedBy: 'Revisado e aprobado por'
      }}
    />
  </div>
);
