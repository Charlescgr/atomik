import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import TitleCustom from './TitleCustom';

export default {
  title: 'Components/Molecules/TitleCustom',
  component: TitleCustom,
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
  <TitleCustom>
    <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
  </TitleCustom>
);

export const Types = () => (
  <>
    <TitleCustom type="h1">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
    <TitleCustom type="h2">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
    <TitleCustom type="h3">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
    <TitleCustom type="h4">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
    <TitleCustom type="h5">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
    <TitleCustom type="h6">
      <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
    </TitleCustom>
  </>
);

export const TitleIsSpan = () => (
  <TitleCustom
    titleIsSpan
    lineColor="green.400"
    className="mtb--small"
  >
    <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
  </TitleCustom>
);

export const WithProps = () => (
  <TitleCustom
    type="h2"
    size="x-big"
    textColor="red.400"
    lineType="dashed"
    lineColor="green.400"
    className="mtb--small"
  >
    <FormattedMessage tagName={React.Fragment} {...messages.textHeading} />
  </TitleCustom>
);
