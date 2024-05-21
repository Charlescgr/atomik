import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs, text, object, boolean
} from '@storybook/addon-knobs';

import ArticleShorcuts from './ArticleShorcuts';

import { shortcutsPosts } from '../../../../mocks/home';

export default {
  title: 'Components/Organisms/ArticleShorcuts',
  component: ArticleShorcuts,
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
  const title = text('Title', 'Herramientas de Salud');
  const image = object('Image', {
    src: '../img/storybook_examples/illustration__medic-team.svg',
    alt: 'Icon Comprobador de síntomas',
    width: '288',
    height: '200'
  });

  const messages = object('Messages', {
    viewMore: { label: 'Más herramientas', url: '/single' }
  });

  const hasImage = boolean('Has Image', true);
  const colunmFormat = boolean('Column version/format', false);
  const showLoadingMore = boolean('Show Loading More Button', false);

  return (
    <ArticleShorcuts articles={shortcutsPosts} messages={messages} title={title} figure={hasImage && image} showLoadingMore={showLoadingMore} colunmFormat={colunmFormat} />
  );
};
