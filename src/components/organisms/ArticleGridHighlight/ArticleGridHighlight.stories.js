/* eslint-disable camelcase */
import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs, object, text, boolean
} from '@storybook/addon-knobs';

import { latestPosts } from '../../../../mocks/home';

import ArticleGridHighlight from './ArticleGridHighlight';

export default {
  title: 'Components/Organisms/ArticleGridHighlight',
  components: ArticleGridHighlight,
  decorators: [withA11y, withKnobs],
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
  const defaultValue = [...latestPosts.map(({
    id, excerpt, title, featured_media, categories, permalink
  }) => (
    object(`${String(id)}.º post`, {
      id, title, categories, featured_media, excerpt, permalink,
    })
  ))];

  const title = text('title');
  const reverse = boolean('reverse', false);
  const bookmark = boolean('bookmark', false);
  const bigPostsOnMobile = boolean('bigPostsOnMobile', false);

  return <ArticleGridHighlight articles={defaultValue} bigPostsOnMobile={bigPostsOnMobile} bookmark={bookmark} title={title} reverse={reverse} />;
};
