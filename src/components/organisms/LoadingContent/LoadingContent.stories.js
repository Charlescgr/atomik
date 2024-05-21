import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import LoadingContent from './LoadingContent';

export default {
  title: 'Components/Organisms/LoadingContent',
  component: LoadingContent,
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

export const Default = () => <LoadingContent messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />;
export const JustIcons = () => (
  <>
    <LoadingContent iconName="loader-alt" />
    <LoadingContent iconName="loader-circle" />
    <LoadingContent iconName="loader" />
  </>
);
export const Pulsing = () => <LoadingContent dots={false} pulsing messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />;
export const PulsingOtherIcons = () => (
  <>
    <LoadingContent dots={false} pulsing messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />
    <br />
    <LoadingContent iconName="loader-alt" dots={false} pulsing messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />
    <br />
    <LoadingContent iconName="loader-circle" dots={false} pulsing messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />
    <br />
    <LoadingContent iconName="loader" dots={false} pulsing messages={{ loading: <FormattedMessage tagName={React.Fragment} {...messages.textLoading} /> }} />
  </>
);
