import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Button from '../../atoms/Button';
import Loading from './Loading';

export default {
  title: 'Components/Molecules/Loading',
  component: Loading,
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
  <>
    <div style={{ width: '70px', height: '70px' }}>
      <Loading />
    </div>
  </>
);

export const WhithProps = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading);
  };

  return (
    <>
      <Button color="main.500" textColor="white" onClick={handleClick}>Click to change State</Button>
      <br />
      <Loading type="rotate" size="small" loading={loading} color="purple.300" />
      <br />
      <Loading type="rotate" size="medium" loading={loading} color="lime.300" />
      <br />
      <Loading type="rotate" size="big" color="main.300" loading={loading} />
      <br />
      <Loading type="rotate" size="big" color="red.300" className="m--x-big" loading={false} />
    </>
  );
};
