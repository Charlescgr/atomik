import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Paragraph from './Paragraph';

export default {
  title: 'Components/Atoms/Paragraph',
  component: Paragraph,
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
  <Paragraph>
    <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
  </Paragraph>
);

export const WithProps = () => (
  <Paragraph textColor="main.600" className="lh--1-2 ff--sans p--x-big m--big">
    <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
  </Paragraph>
);
