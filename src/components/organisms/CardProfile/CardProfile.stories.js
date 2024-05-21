import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import { profiles } from '../../../../mocks/topMedicProfiles';

import CardProfile from './CardProfile';

export default {
  title: 'Components/Organisms/CardProfile',
  component: CardProfile,
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

export const Default = () => (
  <CardProfile
    index={1}
    cardType="cardContent"
    profile={profiles[0]}
    descriptionLines={4}
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
    className=""
  />
);
