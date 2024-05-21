import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ProfileAdditionalDetails from './ProfileAdditionalDetails';

import { profile } from '../../../../mocks/profileMedicDirectory';

export default {
  title: 'Components/Organisms/ProfileAdditionalDetails',
  component: ProfileAdditionalDetails,
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
  <ProfileAdditionalDetails
    certifications={profile.certifications}
    additionalDetails={profile.additional_details}
    messages={{
      certifications: 'Formación académica',
    }}
  />
);
