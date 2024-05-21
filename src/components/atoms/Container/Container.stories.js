import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Container from './Container';

export default {
  title: 'Components/Atoms/Container',
  component: Container,
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
  <Container>
    <FormattedMessage tagName={React.Fragment} {...messages.textContainer} />
  </Container>
);

export const WithProps = () => (
  <Container wrap className="p--big bc--orange-500 c--white" style={{ width: '500px' }}>
    <FormattedMessage tagName={React.Fragment} {...messages.textContainer} />
  </Container>
);
