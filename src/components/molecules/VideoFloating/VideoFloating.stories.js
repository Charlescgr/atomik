import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';
import VideoFloating from './VideoFloating';

export default {
  title: 'Components/Molecules/VideoFloating',
  component: VideoFloating,
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

export const Default = () => (
  <VideoFloating>
    <iframe src="https://www.youtube.com/embed/zaaGv1Lk7GE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  </VideoFloating>
);
