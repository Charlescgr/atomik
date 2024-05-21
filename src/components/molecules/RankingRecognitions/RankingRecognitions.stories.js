import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import RankingRecognitions from './RankingRecognitions';
import { profile } from '../../../../mocks/profileMedicDirectory';

export default {
  title: 'Components/Molecules/RankingRecognitions',
  component: RankingRecognitions,
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
  <RankingRecognitions
    title="Reconocimentos"
    list={profile.awards}
    showItens={4}
    messages={{
      readMore: 'Leer más',
      readLess: 'Leer menos'
    }}
  />
);
