import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleListInCols from './ArticleListInCols';
import Container from '../../atoms/Container';

import { content } from '../../../../mocks/category2Level';

export default {
  title: 'Components/Organisms/ArticleListInCols',
  component: ArticleListInCols,
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
  <Container wrap>
    <ArticleListInCols
      title="Frases"
      titleType="h2"
      articles={content.subcategories[4].posts}
      maxCols={2}
      messages={{
        recommendations: { label: 'ver más artículos', url: '/single' }
      }}
    />
  </Container>
);
