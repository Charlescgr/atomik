import React from 'react';
import {
  text, object, boolean
} from '@storybook/addon-knobs';
import css from 'styled-jsx/css';
import { withNextRouter } from 'storybook-addon-next-router';

import ArticleCarouselHighlight from './ArticleCarouselHighlight';
import Box from '../../atoms/Box';

import { highlights } from '../../../../mocks/home';

export default {
  title: 'Components/Molecules/ArticleCarouselHighlight',
  component: ArticleCarouselHighlight,
  decorators: [withNextRouter],
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
  const { className, styles } = css.resolve`
    .container {
      max-width: 376px;
    }
  `;
  const defaultValue = [...highlights.map((item, idx) => (
    object(`${String(idx + 1)}.º post`, {
      ...item
    })
  ))];

  const title = text('Title', 'Destacados');
  const carousel = boolean('carousel', false);

  return (
    <Box className={`${className} container`}>
      <ArticleCarouselHighlight articles={defaultValue} carousel={carousel} title={title} className="mt--x-big" />
      {styles}
    </Box>
  );
};
