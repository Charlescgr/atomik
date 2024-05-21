import React from 'react';
import Avatar from './Avatar';

export default {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  args: {
    src: '/img/storybook_examples/avatar.png',
    alt: 'Irineu',
    lazy: false
  }
};

export const Default = (args) => <Avatar {...args} />;
