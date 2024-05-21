import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import HeadingPageAuthor from './HeadingPageAuthor';

import {
  reviews, aboutConsults, aboutAuthor, clinics
} from '../../../../mocks/author';

export default {
  title: 'Components/Molecules/HeadingPageAuthor',
  component: HeadingPageAuthor,
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
  <HeadingPageAuthor
    about={{
      // eslint-disable-next-line no-underscore-dangle
      id: clinics[0]._id,
      email: clinics[0].email,
      phone: clinics[0].phone_number,
      name: aboutAuthor.name,
      picture: aboutAuthor.picture,
      bio: aboutConsults.user_info.bio,
      expertise: aboutConsults.user_info.expertises[0].name,
      stars: reviews.stars,
      collegiateNumber: 'EX01253',
      totalReviews: 0,
    }}
    messages={{
      verifiedProfile: 'Perfil Verificado',
      medicTeam: 'Equipo Médico',
      collegiate: 'nº Colegiado',
      reviews: 'valoraciones',
      scheduleConsult: { label: 'Pedir Cita', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/pedir-cita/' },
      contact: { label: 'Contactar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' }
    }}
    brandWeek={false}
    lazy={false}
    className="mtb--big"
  />
);

export const WithProps = () => (
  <HeadingPageAuthor
    about={{
      // eslint-disable-next-line no-underscore-dangle
      id: clinics[0]._id,
      email: clinics[0].email,
      phone: clinics[0].phone_number,
      name: aboutAuthor.name,
      picture: aboutAuthor.picture,
      bio: aboutConsults.user_info.bio,
      expertise: aboutConsults.user_info.expertises[0].name,
      stars: reviews.stars,
      collegiateNumber: 'EX01253',
      totalReviews: reviews.reviews.total,
      verifiedProfile: aboutConsults.verified,
      medicTeam: true,
      social_profiles: {
        twitter: 'https://www.twitter.com/gemasc',
        facebook: 'https://www.facebook.com/gema.sanchez.cuevas.psicologa/',
        linkedin: 'https://www.linkedin.com/in/gemasanchezcuevas1/',
        instagram: 'https://www.instagram.com/gemapsy/',
        url: 'https://campsite.bio/gema',
        pinterest: 'https://www.pinterest.com/gemapsy/',
        youtube: 'https://www.youtube.com/gemapsy/'
      },
    }}
    messages={{
      verifiedProfile: 'Perfil Verificado',
      medicTeam: 'Equipo Médico',
      collegiate: 'nº Colegiado',
      reviews: 'valoraciones',
      scheduleConsult: { label: 'Pedir Cita', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/pedir-cita/' },
      contact: { label: 'Contactar', url: 'https://lamenteesmaravillosa.com/consultas/gemasc89/' }
    }}
    brandWeek
    className="mtb--big"
  />
);
