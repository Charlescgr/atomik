import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Heading from './Heading';

export default {
  title: 'Components/Atoms/Heading',
  component: Heading,
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
  <Heading>
    <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
  </Heading>
);

export const Types = () => (
  <>
    <Heading type="h1">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
    <Heading type="h2">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
    <Heading type="h3">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
    <Heading type="h4">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
    <Heading type="h5">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
    <Heading type="h6">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </Heading>
  </>
);

export const WithProps = () => (
  <Heading
    type="h2"
    size="x-big"
    textColor="red.400"
    lineType="dashed"
    lineColor="green.400"
    className="mtb--small"
  >
    <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
  </Heading>
);
