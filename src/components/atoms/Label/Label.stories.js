import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Label from './Label';

export default {
  title: 'Components/Atoms/Label',
  component: Label,
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

export const Default = () => <Label inputId="firstName"><FormattedMessage tagName={React.Fragment} {...messages.textLabel} /></Label>;
export const WithClasses = () => <Label inputId="firstName" className="d--inline-block fs--normal ff--sans p--normal m--normal c--orange-300"><FormattedMessage tagName={React.Fragment} {...messages.textLabel} /></Label>;
