import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import { profile } from '../../../../mocks/profileMedicDirectory';

import ConsultInfos from './ConsultInfos';

export default {
  title: 'Components/Molecules/ConsultInfos',
  component: ConsultInfos,
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
  <ConsultInfos
    title="Reserva tu consulta"
    titleType="h3"
    email="gema@gemapsicologa.es"
    telephone="+55 (11) 9988556622"
    onlineService={profile.service_details.allow_online_service}
    costPerSession={profile.service_details.cost_per_session}
    presentialAssistance
    messages={{
      contact: 'Contactar',
      call: 'Llamar',
      onlineService: 'Ofrece consultas online',
      costPerSession: 'Consultas desde',
      presentialAssistance: 'Asiste presencialmente',
    }}
  />
);

export const WithProps = () => (
  <ConsultInfos
    hasBackground
    hasBorder={false}
    orientation="horizontal"
    titleType="h3"
    email="gema@gemapsicologa.es"
    telephone={profile.telephone}
    onlineService={profile.service_details.allow_online_service}
    costPerSession={profile.service_details.cost_per_session}
    presentialAssistance
    messages={{
      contact: 'Contactar',
      call: 'Llamar',
      onlineService: 'Ofrece consultas online',
      costPerSession: 'Consultas desde',
      presentialAssistance: 'Asiste presencialmente',
    }}
  />
);
