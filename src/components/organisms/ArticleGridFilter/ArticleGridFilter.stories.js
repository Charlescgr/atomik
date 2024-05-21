import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleGridFilter from './ArticleGridFilter';

import { landingPageContent } from '../../../../mocks/landingPage';

export default {
  title: 'Components/Organisms/ArticleGridFilter',
  component: ArticleGridFilter,
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
  <ArticleGridFilter
    bookmark
    articles={landingPageContent.subcategories}
    maxCols={4}
    title="Más sobre Diabetes tipo 2"
    titleType="h3"
    titleIsSpan
    utm={{
      source: 'Mejor con salud',
      medium: 'mc_network',
      campaign: 'home_related'
    }}
    messages={{
      allPosts: 'Todos'
    }}
    className="mtb--x-big"
  />
);
