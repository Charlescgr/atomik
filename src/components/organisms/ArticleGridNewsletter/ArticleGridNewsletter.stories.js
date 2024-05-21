import React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { relatedPosts } from '../../../../mocks/home';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import ArticleGridNewsletter from './ArticleGridNewsletter';

import Image from '../../atoms/Image';
import Container from '../../atoms/Container';

import AdsBox from '../../molecules/AdsBox';

export default {
  title: 'Components/Organisms/ArticleGridNewsletter',
  components: ArticleGridNewsletter,
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
  const { isDesktop } = useDeviceScreen();
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

  const adsBoxArticleGridNewsletter = () => (
    <AdsBox
      hasBackground
      ads={{
        desktop: { classSize: 'medium' },
        mobile: { classSize: 'medium' }
      }}
      className={`d--flex ai--center ml--normal ${!isDesktop && ('mr--normal')}`}
    >
      <Image src="../img/storybook_examples/ads__300x250_2.jpg" alt="Mobile Ads 300x250" width="320" height="270" />
    </AdsBox>
  );

  return (
    <Container wrap className="plr--big">
      <ArticleGridNewsletter
        articles={relatedPosts}
        title={title}
        messages={messages}
        newsletter={newsletter}
        AdsBox={adsBoxArticleGridNewsletter}
      />
    </Container>
  );
};
