import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleListAds from './ArticleListAds';
import Image from '../../atoms/Image';

import AdsBox from '../../molecules/AdsBox';
import CardPodcast from '../../molecules/CardPodcast';

import { readMore, podcast } from '../../../../mocks/home';

export default {
  title: 'Components/Organisms/ArticleListAds',
  component: ArticleListAds,
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

// -- components
const Ads = () => (
  <AdsBox
    ads={{
      desktop: { classSize: 'big' },
      mobile: { classSize: 'big' }
    }}
  >
    <Image src="../img/storybook_examples/ads__300x600_02.jpg" alt="Mobile Ads 320x600" width="300" height="620" />
  </AdsBox>
);

export const Default = () => (
  <ArticleListAds
    articles={readMore}
    title="También puedes leer"
    ads={<Ads />}
    messages={{
      loadingMore: 'Cargar más',
      recommendations: { label: 'ver más recomendaciones', url: '/single' }
    }}
  />
);

export const WithPropsTitleInsideCol = () => (
  <ArticleListAds
    titleInside
    articles={readMore}
    title="También puedes leer"
    ads={<Ads />}
    messages={{
      loadingMore: 'Cargar más',
      recommendations: { label: 'ver más recomendaciones', url: '/single' }
    }}
  />
);

export const WithBigPostsOnMobile = () => (
  <ArticleListAds
    titleInside
    bigPostsOnMobile
    articles={readMore}
    title="También puedes leer"
    ads={<Ads />}
    messages={{
      loadingMore: 'Cargar más',
      recommendations: { label: 'ver más recomendaciones', url: '/single' }
    }}
  />
);

export const WithPropsPodcast = () => {
  const Podcast = () => (
    <CardPodcast
      title={podcast.title}
      time={podcast.time}
      figure={podcast.figure}
      url={podcast.url}
      className="mtb--x-big"
    />
  );
  return (
    <ArticleListAds
      articles={readMore}
      title="También puedes leer"
      ads={<Ads />}
      podcast={<Podcast />}
      messages={{
        loadingMore: 'Cargar más',
        recommendations: { label: 'ver más recomendaciones', url: '/single' }
      }}
    />
  );
};
