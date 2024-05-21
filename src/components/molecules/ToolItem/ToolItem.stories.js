import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import ToolItem from './ToolItem';

export default {
  title: 'Components/Molecules/ToolItem',
  component: ToolItem,
  decorators: [withA11y, withNextRouter],
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

export const Default = () => {
  const image = {
    src: '../img/storybook_examples/icon__medicine.svg',
    label: 'Icon Comprobador de síntomas',
    url: '/single'
  };
  return (
    <ToolItem
      imgPath={image.src}
      label={image.label}
      url={image.url}
    />
  );
};
