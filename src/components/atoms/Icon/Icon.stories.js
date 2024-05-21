import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Icon from './Icon';

export default {
  title: 'Components/Atoms/Icon',
  component: Icon,
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

export const Default = () => <Icon color="orange.500" name="bell" />;

export const Types = () => (
  <>
    Regular
    <Icon name="moon" prefix="bx" size="big" color="green.400" inline />
    <br />
    Solid
    <Icon name="moon" prefix="bxs" size="big" color="green.400" inline />
    <br />
    Logo
    <Icon name="instagram" prefix="bxl" size="big" color="green.400" inline />
  </>
);

export const WithProps = () => (
  <>
    <Icon name="cookie" size="small" animation="burst" color="purple.400" inline />
    <Icon name="atom" size="normal" animation="spin" color="main.200" inline />
    <Icon name="analyse" prefix="bxs" animation="tada" size="medium" color="grey-cold.400" />
    <Icon name="twitter" prefix="bxl" rotate="90" size="big" color="red.400" />
  </>
);
