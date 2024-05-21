import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ContactBox from './ContactBox';

import { anchors, aboutConsults, clinics } from '../../../../mocks/author';
import { profile } from '../../../../mocks/profileMedicDirectory';

export default {
  title: 'Components/Organisms/ContactBox',
  component: ContactBox,
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
  <ContactBox
    title={anchors.title03.title}
    titleType="h2"
    clinics={clinics}
    messages={{
      addressTitle: [
        { title: 'Direción' }
      ],
      call: { label: 'Llamar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' },
      contact: { label: 'Contactar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' },
      correctData: { label: '¿Hay datos incorrectos?', url: '/single' }
    }}
  />
);

export const WithSocial = () => (
  <ContactBox
    title={anchors.title03.title}
    titleType="h2"
    social={aboutConsults.social}
    clinics={clinics}
    messages={{
      addressTitle: [{ title: 'Direción principal' }],
      call: { label: 'Llamar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' },
      contact: { label: 'Contactar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' },
      correctData: { label: '¿Hay datos incorrectos?', url: '/single' }
    }}
    className="mb--normal"
  />
);

export const WithMoreAddresses = () => (
  <ContactBox
    title="Datos de contacto"
    titleType="h2"
    showOpenCloseControl
    showOpenAddress={false}
    clinics={[
      {
        id: 1,
        address: profile.address
      },
      {
        id: 2,
        address: profile.secondary_address
      }
    ]}
    messages={{
      addressTitle: [
        { title: 'Direción principal' },
        { title: 'Direción secundario' }
      ],
      correctData: { label: '¿Hay datos incorrectos?', url: '/single' }
    }}
    className="mb--normal"
  />
);
