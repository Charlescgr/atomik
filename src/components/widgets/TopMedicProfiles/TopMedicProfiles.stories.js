import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import TopMedicProfiles from './TopMedicProfiles';
import { profiles } from '../../../../mocks/topMedicProfiles';

export default {
  title: 'Components/Widgets/TopMedicProfiles',
  component: TopMedicProfiles,
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
  <TopMedicProfiles
    title="Los Psicólogos más recomendados y reconocidos en España"
    text="Estos son los profesionales expertos en psicoterapia más recomendados a tener en cuenta si vives en España; además, muchos de ellos no solo atienden en sus consultas ubicadas en diferentes ciudades del país, sino que también realizan terapia por videollamada."
    profiles={profiles}
    messages={{
      verifiedProfile: 'Perfil Verificado',
      medicTeam: 'Equipo Médico',
      reviews: 'opiniones',
      contact: 'Contactar',
      call: 'Llamar',
      onlineService: 'Ofrece consultas online',
      costPerSession: 'Consultas desde',
      presentialAssistance: 'Asiste presencialmente',
    }}
  />
);
