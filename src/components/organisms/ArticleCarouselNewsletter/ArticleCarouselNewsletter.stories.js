import React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { landingPageContent } from '../../../../mocks/landingPage';

import ArticleCarouselNewsletter from './ArticleCarouselNewsletter';

import Container from '../../atoms/Container';

export default {
  title: 'Components/Organisms/ArticleCarouselNewsletter',
  components: ArticleCarouselNewsletter,
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
  const {
    recent_posts
  } = landingPageContent;

  const title = text('Title', 'Quizá de podría interesar...');
  const messages = object('Messages', {
    recommendations: {
      label: 'ver más recomendaciones',
      url: '/single'
    }
  });
  const newsletter = object('Newsletter', {
    title: 'Recibe semanalmente nuestro boletín sobre Desarrollo personal',
    description: 'Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar.'
  });

  return (
    <Container wrap className="plr--big">
      <ArticleCarouselNewsletter
        articles={recent_posts}
        title={title}
        bookmark
        messages={messages}
        newsletter={newsletter}
      />
    </Container>
  );
};
