import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ProfileFullBox from './ProfileFullBox';

import { aboutConsults, aboutConsultsContinuation } from '../../../../mocks/author';

const profile = { ...aboutConsults, ...aboutConsultsContinuation };

export default {
  title: 'Components/Molecules/ProfileFullBox',
  component: ProfileFullBox,
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
  <ProfileFullBox
    firstTitle="Perfil"
    secondTitle="Información adicional"
    profile={profile}
    messages={{
      readMore: 'Leer más',
      readLess: 'Leer menos',
      formation: 'Formación',
      areas: 'Áreas',
      languages: 'Idiomas',
      meets: 'Atiende a'
    }}
  />
);
