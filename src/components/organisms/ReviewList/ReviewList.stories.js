import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ReviewList from './ReviewList';

import { anchors, reviews } from '../../../../mocks/author';

export default {
  title: 'Components/Organisms/ReviewList',
  component: ReviewList,
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
  <div style={{ width: '300px' }}>
    <ReviewList
      titleType="h2"
      reviews={reviews.reviews.results}
      messages={{
        loadingMore: 'Cargar más',
        readMore: 'Leer más',
        readLess: 'Leer menos'
      }}
    />
  </div>
);

export const WithProps = () => (
  <div style={{ width: '300px' }}>
    <ReviewList
      firstLimit={1}
      title={anchors.title05.title}
      titleType="h2"
      reviews={reviews.reviews.results}
      messages={{
        loadingMore: 'Cargar más',
        readMore: 'Leer más',
        readLess: 'Leer menos'
      }}
    />
  </div>
);

export const WithInsertReview = () => (
  <div style={{ width: '600px' }}>
    <ReviewList
      firstLimit={1}
      title="Opiniones"
      titleType="h2"
      reviews={reviews.reviews.results}
      insertReviewButton
      disclaimer="Todas las opiniones son importantes, por este motivo, los especialistas no pueden pagar para modificar o elimitar opiniones. <a href='#'>Saber más</a>."
      messages={{
        loadingMore: 'Cargar más',
        readMore: 'Leer más',
        readLess: 'Leer menos',
        buttonInsert: 'Dejar una opinión'
      }}
    />
  </div>
);
