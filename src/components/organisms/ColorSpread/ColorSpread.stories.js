import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ColorSpread from './ColorSpread';

export default {
  title: 'Others/ColorSpread',
  component: ColorSpread,
  decorators: [withA11y],
  parameters: {
    notes: 'The ColorSpread component is an auxiliary component to calculate all 10 colors variations from a spread.',
  }
};

export const Default = () => <ColorSpread color="#123456" />;
// export const Rounded = () => <Button rounded onClick={action('clicked')}><FormattedMessage {...messages.buttonLabel} /></Button>;
// export const Color = () => <Button color="red" onClick={action('clicked')}><FormattedMessage {...messages.buttonLabel} /></Button>;
