/* eslint-disable no-alert */
import React from 'react';

import { withNextRouter } from 'storybook-addon-next-router';
import SearchResults from './SearchResults';
import AdsBox from '../../molecules/AdsBox';
import Image from '../../atoms/Image';

import { resultsArticles } from '../../../../mocks/search';

const AdsResult = () => (
  <AdsBox
    slim
    ads={{
      desktop: { classSize: 'normal' },
      mobile: { classSize: 'medium' }
    }}
    className="mb--x-big"
  >
    <Image src="../img/storybook_examples/ads__728x90.jpg" alt="Mobile Ads 728x90" width="728" height="110" />
  </AdsBox>
);

export default {
  title: 'Components/Organisms/SearchResults',
  component: SearchResults,
  decorators: [withNextRouter],
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
  // -- components
  const totalResults = 253;

  return (
    <SearchResults
      lazy={false}
      messages={{
        noResults: totalResults === 0 && 'Ningún resultado encontrado',
        loadingMore: 'Cargar más'
      }}
      articles={resultsArticles.items}
      ads={<AdsResult />}
      className="mtb--big"
    />
  );
};
