import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import KeyTermsContent from './KeyTermsContent';

import { landingPageContent } from '../../../../mocks/landingPage';

export default {
  title: 'Components/Organisms/KeyTermsContent',
  component: KeyTermsContent,
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
  <KeyTermsContent
    terms={landingPageContent.key_terms}
    title="KEY Terms"
    titleIsSpan={false}
    className="mb--x-big"
  />
);
