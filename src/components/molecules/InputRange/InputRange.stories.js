import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import InputRange from './InputRange';

export default {
  title: 'Components/Molecules/InputRange',
  component: InputRange,
  decorators: [withA11y],
  parameters: {
    value: 10
  }
};

export const Default = () => (
  <InputRange
    id="input-range"
    name="input-range"
    value="10"
  />
);
