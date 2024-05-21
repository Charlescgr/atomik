import React from 'react';
import { FormattedMessage } from 'react-intl';
import { allPaletteColors } from '../../_settings/ThemeProvider/ThemeContext';

import messages from './messages';

import A from './A';

export default {
  title: 'Components/Atoms/A (Link)',
  component: A,
  args: {
    title: 'Some Test',
    to: 'https://google.com',
    className: 'd--inline-block ff--sans p--big fs--big m--medium" target="_blank',
    target: '_blank',
    textColor: 'purple.400',
    underlineColor: 'secondary.400'
  }
};

export const Default = (args) => (
  <A {...args}>
    <FormattedMessage tagName={React.Fragment} {...messages.textLink} />
  </A>
);
Default.argTypes = {
  textColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    },
  },
  underlineColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    },
  },
  lineType: {
    control: 'select'
  },
  children: {
    table: {
      disable: true
    }
  }
};
