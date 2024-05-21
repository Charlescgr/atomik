import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SubscriptionPlans from './SubscriptionPlans';

export default {
  title: 'Components/Molecules/SubscriptionPlans',
  component: SubscriptionPlans,
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
  <SubscriptionPlans
    title="Información garantizada al alcance de tus manos"
    premiumLink="#"
    medicTeamLink="#"
    newsletterLink="#"
    messages={{
      subscriptionButton: {
        simpleText: 'Disfruta sin límites',
        contrastText: 'Hazte Premium'
      },
      contact: {
        simpleText: 'Conoce a nuestro',
        contrastText: 'Equipo médico'
      },
      subscriptionMail: {
        simpleText: 'Suscríbete a nuestro',
        contrastText: 'boletín de noticias'
      }
    }}
  />
);
