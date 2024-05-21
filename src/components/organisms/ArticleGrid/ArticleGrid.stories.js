import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { withNextRouter } from 'storybook-addon-next-router';
import ArticleGrid from './ArticleGrid';
import Container from '../../atoms/Container';

import { dataLastArticles } from './articles.mock';

export default {
  title: 'Components/Organisms/ArticleGrid',
  component: ArticleGrid,
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

export const Default = () => <ArticleGrid lazy={false} articles={dataLastArticles} />;

export const WithColsCount = () => <Container wrap><ArticleGrid lazy={false} articles={dataLastArticles.slice(0, 8)} maxCols={4} /></Container>;

export const WithTitle = () => <div style={{ width: '700px' }}><ArticleGrid articles={dataLastArticles.slice(0, 4)} maxCols={2} title="También te recomendamos" titleType="h3" /></div>;

export const WithSmallCols = () => <div style={{ width: '500px' }}><ArticleGrid articles={dataLastArticles.slice(4, 8)} smallCols maxCols={2} bookmark /></div>;

export const WithLoading = () => <div style={{ width: '1024px' }}><ArticleGrid articles={dataLastArticles.slice(0, 3)} messages={{ loadingMore: 'Cargar más' }} maxCols={3} title="También te recomendamos" /></div>;

export const WithDescription = () => <div style={{ width: '700px' }}><ArticleGrid articles={dataLastArticles.slice(0, 4)} maxCols={2} withDescription={false} /></div>;
