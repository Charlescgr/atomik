import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import LoadingMore from './LoadingMore';

export default {
  title: 'Components/Organisms/LoadingMore',
  component: LoadingMore,
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

export const Default = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading);
  };
  return (
    <LoadingMore onClick={handleClick} loading={loading}>
      Cargar Más
    </LoadingMore>
  );
};

export const WhithProps = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading);
  };
  return (
    <LoadingMore color="red.400" textColor="black" onClick={handleClick} loading={loading}>
      Cargar Más
    </LoadingMore>
  );
};
