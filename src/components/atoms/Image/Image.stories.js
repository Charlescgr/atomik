import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Image from './Image';

export default {
  title: 'Components/Atoms/Image',
  component: Image,
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

/**
 In the Storybook next/image is not rendering the image correctly, the next team
 is working on a fix for this problem. In projects and example, next/image can be used
 without any problem.
*/

export const Default = () => (
  <Image
    src={'/img/example/image__others__01.jpg'}
    alt="Cats"
    width="200"
    height="200"
    nextImage={false}
  />
);

// For responsive image: you must enter width and height
export const NextImageResponsive = () => (
  <Image
    src={'/img/example/image__others__01.jpg'}
    alt="Cats"
    width="200"
    height="200"
    layout="responsive"
  />
);

// For cover image: width and height cannot be entered
export const NextImageCover = () => (
  <Image
    src={'/img/example/image__others__01.jpg'}
    alt="Cats"
    layout="fill"
    objectFit="cover"
  />
);

// For background no loading: the background can be customized with the props style in the
// background, or hide the props to use the default background.
export const NextImageLoadingBackground = () => (
  <Image
    src={'/img/example/image__others__01.jpg'}
    alt="Cats"
    width="200"
    height="200"
    layout="responsive"
    loadingType="background"
    background={{
      style: {
        background: '#edeff4 no-repeat center center',
        height: '100%',
        width: '100%',
      }
    }}
  />
);
