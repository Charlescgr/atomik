import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Row from './Row';

export default {
  title: 'Components/Atoms/Row',
  component: Row,
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
  <Row>
    <FormattedMessage tagName={React.Fragment} {...messages.textRow} />
  </Row>
);

export const WithClasses = () => (
  <Row className="p--big m--big bc--main-500 c--white">
    <FormattedMessage tagName={React.Fragment} {...messages.textRow} />
  </Row>
);
