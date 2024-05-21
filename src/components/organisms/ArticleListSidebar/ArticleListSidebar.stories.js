import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleListSidebar from './ArticleListSidebar';
import { tendenciesArticles } from '../../../../mocks/search';

export default {
  title: 'Components/Organisms/ArticleListSidebar',
  component: ArticleListSidebar,
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
  <div style={{ width: '301px' }}>
    <ArticleListSidebar
      lazy={false}
      articles={tendenciesArticles}
    />
  </div>
);

export const WithTitle = () => (
  <div style={{ width: '301px' }}>
    <ArticleListSidebar
      lazy={false}
      title="Tendencias"
      articles={tendenciesArticles}
    />
  </div>
);

export const WithTitleIcon = () => (
  <div style={{ width: '301px' }}>
    <ArticleListSidebar
      lazy={false}
      icon="trending-up"
      title="Tendencias"
      articles={tendenciesArticles}
    />
  </div>
);

export const WithHightlight = () => (
  <div style={{ width: '301px' }}>
    <ArticleListSidebar
      lazy={false}
      withHighlight
      icon="trending-up"
      title="Tendencias"
      articles={tendenciesArticles}
    />
  </div>
);
