/* eslint-disable no-alert */
import React from 'react';
import InputRangeDouble from './InputRangeDouble';

export default {
  title: 'Components/Molecules/InputRangeDouble',
  component: InputRangeDouble,
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

export const Default = () => <InputRangeDouble />;
