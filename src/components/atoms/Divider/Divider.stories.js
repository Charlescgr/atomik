import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Divider from './Divider';

export default {
  title: 'Components/Atoms/Divider',
  component: Divider,
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
  <Divider className="mtb--normal" color="main.200" />
);

export const Dashed = () => (
  <Divider className="mtb--normal" type="dashed" color="main.200" />
);

export const WithProps = () => (
  <Divider className="mtb--normal" size="big" color="red.200" />
);
