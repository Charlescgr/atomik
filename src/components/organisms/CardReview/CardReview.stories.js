import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import CardReview from './CardReview';

// -- mocks
import { reviews } from '../../../../mocks/author';

export default {
  title: 'Components/Organisms/CardReview',
  component: CardReview,
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
  <div style={{ width: '600px' }}>
    {reviews.reviews.results.slice(0, 1).map(({
      _id, author: { displayName, picture }, body, created, stars
    }) => (
      <CardReview
        key={_id}
        author={{
          name: displayName,
          thumb: picture
        }}
        text={body}
        date={created}
        stars={stars}
        lazy={false}
        messages={{ readMore: 'Leer Más', readLess: 'Leer menos' }}
      />
    ))}
  </div>
);
