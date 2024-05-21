import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Box from './Box';

export default {
  title: 'Components/Atoms/Box',
  component: Box,
  args: {
    className: 'p--big m--big bc--main-500 c--white ff--sans'
  }
};

export const Default = (args) => (
  <Box {...args}>
    <FormattedMessage tagName={React.Fragment} {...messages.textBox} />
  </Box>
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
