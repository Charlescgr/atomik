import React from 'react';

import Iframe from './Iframe';

export default {
  title: 'Components/Atoms/Iframe',
  component: Iframe,
  args: {
    attribs: {
      title: 'Como hacer un marco para fotos de carton. Portaretratos',
      width: '500',
      height: '281',
      src: 'https://www.youtube.com/embed/lGrWKMwB02A?output=embed',
      frameBorder: '0',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: true
    }
  }
};

export const Default = (args) => <Iframe {...args}></Iframe>;
