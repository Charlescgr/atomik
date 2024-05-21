/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import TitleCustom from '../TitleCustom';
import CardArticle from '../CardArticle';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function RelatedArticle({ recommendedPost, messages, blogInfo }) {
  const {
    title, figure: { thumb }, description, link
  } = recommendedPost;

  const { cdnPath } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const router = useRouter();
  const colors = {
    mcs: 'blue.400',
    em: 'pink.400',
    ma: 'red.400',
    dep: 'acqua.400',
    md: 'purple.400',
    mv: 'red.400',
    buc: 'orange.400',
    lmem: 'indigo.400',
    vbb: 'blue-sky.4600',
    ms: 'blue.400'
  };

  return (
    <>
      <TitleCustom
        titleIsSpan
        type={isDesktop ? 'h3' : 'h4'}
        textColor="grey-neutral.600"
        lineColor="grey-neutral.200"
        lineType="dashed"
        className={`${
          isDesktop ? 'ta--left' : 'ta--center'
        } pb--normal`}
      >
        {messages.cardTitle}
      </TitleCustom>
      <CardArticle
        responsive
        boxShadow
        titleIsSpan
        titleSize="x-medium"
        relatedCard
        titleColor="grey-neutral.800"
        title={title}
        limitLineDescription={2}
        messages={{ readItIn: messages.readItIn }}
        externalLink
        figure={{
          src: thumb,
          alt: title,
          lazy: true,
          loadingType: 'background',
          objectFit: 'cover',
          layout: 'fill'
        }}
        googleEvent={{
          'data-with-google-events': true,
          'data-google-events': JSON.stringify({
            data: {
              action: 'click',
              category: 'Content',
              label: `Featured ${link}`,
              value: router?.asPath || ''
            }
          })
        }}
        source={{
          color: colors[blogInfo?.theme] || null,
          via: blogInfo?.title,
          logo: `${cdnPath}themes/icon-${blogInfo?.theme}-alpha.svg`,
        }}
        description={description.trim()}
        url={link}
        className="card-related mtb--big"
      />
    </>
  );
}

RelatedArticle.defaultProps = {
  messages: {
    cardTitle: 'Title Card',
    readItIn: 'read in'
  },
};

RelatedArticle.propTypes = {
  recommendedPost: PropTypes.shape({
    title: PropTypes.string,
    figure: PropTypes.shape({
      thumb: PropTypes.string
    }),
    description: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  messages: PropTypes.shape({
    cardTitle: PropTypes.string,
    readItIn: PropTypes.string
  }),
  blogInfo: PropTypes.shape({
    theme: PropTypes.string,
    title: PropTypes.string
  }),
};

export default RelatedArticle;
