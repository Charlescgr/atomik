import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import ArticleGridAds from './ArticleGridAds';

import Image from '../../atoms/Image';
import Container from '../../atoms/Container';
import AdsBox from '../../molecules/AdsBox';

import { popularPosts } from '../../../../mocks/home';

export default {
  title: 'Components/Organisms/ArticleGridAds',
  component: ArticleGridAds,
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
  const title = text('Title', 'Artículos Populares');

  const defaultValue = [...popularPosts.map((item) => (
    object(`${String(item.ID)}.º post`, {
      ...item
    })
  ))];

  const adsBoxPopularPosts = () => (
    <AdsBox
      slim
      hasBackground
      ads={{
        desktop: { classSize: 'big' },
        mobile: { classSize: 'big' }
      }}
      className="mt--x-big"
    >
      <Image src="../img/storybook_examples/ads__300x600_02.jpg" alt="Mobile Ads 320x600" width="300" height="620" />
    </AdsBox>
  );

  return (<Container wrap className="plr--big"><ArticleGridAds articles={defaultValue} title={title} AdsBox={adsBoxPopularPosts} /></Container>);
};
