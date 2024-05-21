import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs
} from '@storybook/addon-knobs';

import HeadingPageLanding from './HeadingPageLanding';

import { landingPageContent } from '../../../../mocks/landingPage';

export default {
  title: 'Components/Organisms/HeadingPageLanding',
  component: HeadingPageLanding,
  decorators: [withA11y, withKnobs],
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

export const Default = () => {
  const {
    name, description, illustration, reviewed_by, inline_links
  } = landingPageContent;

  return (
    <HeadingPageLanding
      title={name}
      illustration={illustration}
      description={description}
      reviewed={{
        name: reviewed_by.name,
        description: reviewed_by.description,
        picture: reviewed_by.picture
      }}
      messages={{
        role: 'la psicóloga',
        date: '20 junio, 2020',
        in: 'el',
        reviewedApprovedBy: 'Revisado e aprobado por',
      }}
      tags={inline_links}
      className="mt--big"
    />
  );
};
