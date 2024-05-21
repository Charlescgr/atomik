import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Span from './Span';

export default {
  title: 'Components/Atoms/Span',
  component: Span,
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
  <Span>
    <FormattedMessage tagName={React.Fragment} {...messages.textLink} />
  </Span>
);
