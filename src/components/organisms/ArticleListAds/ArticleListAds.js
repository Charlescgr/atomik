/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import truncate from '@charlescgr/underline/dist/truncate';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, IMAGES_WIDTH } from '../../_settings/Utils';

import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import CardArticle from '../../molecules/CardArticle';
import TitleCustom from '../../molecules/TitleCustom';
import LoadingMore from '../LoadingMore';

function ArticleListAds({
  title: titleBox,
  titleType,
  category,
  boxShadow,
  titleInside,
  titleIsSpan,
  articles,
  messages,
  podcast,
  ads,
  onLoadMoreClick,
  hasMorePosts,
  loading,
  adsCard,
  bigPostsOnMobile,
  adsReadMore,
  imagesSize,
  ...props
}) {
  // -- states
  const [loadedMore, setLoadedMore] = useState(false);
  const [colAdsHeight, setColAdsHeight] = useState('initial');

  // --
  const { isDesktop } = useDeviceScreen();
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  // -- scripts
  useEffect(() => {
    let colHeight = 'initial';
    if (!podcast && isDesktop) {
      const boxComponent = document.querySelector('.list-ads-posts__content');
      colHeight = `${boxComponent.offsetHeight}px`;
    }
    setColAdsHeight(colHeight);
  }, [isDesktop]);

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'category',
    'boxShadow',
    'titleInside',
    'titleIsSpan',
    'articles',
    'messages',
    'podcast',
    'ads',
    'onLoadMoreClick',
    'hasMorePosts',
    'loading',
    'adsCard',
    'adsReadMore',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .ads-column {
        width: 301px;
        ${direction === 'rtl' ? 'margin-right:24px' : 'margin-left:24px'}
      }

      .p--sticky {
        top: 64px;
      }
    }
  `;

  const handleClick = () => {
    onLoadMoreClick();
    setLoadedMore(true);
  };

  const theTitle = () => (
    <>
      {titleBox && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="pb--normal mb--normal">
          {titleBox}
          {category && (
            <strong className="c--secondary-700 ml--normal">{category}</strong>
          )}
        </TitleCustom>
      )}
      {isDesktop && messages?.recommendations && (
        <A to={messages?.recommendations.url} textColor="grey-neutral.500" className={`${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
          {messages?.recommendations.label}
          <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
        </A>
      )}
    </>
  );

  const theCardArticle = (
    id, postTitle, featured_media, permalink, slug, categories, index, excerpt
  ) => (
    <CardArticle
      key={id}
      titleIsSpan
      title={postTitle}
      figure={{
        src: featured_media,
        alt: postTitle,
        lazy: true,
        loadingType: 'background',
        objectFit: 'cover',
        layout: 'fill',
        width: IMAGES_WIDTH[imagesSize] || null
      }}
      url={permalink || `/${slug}/`}
      horizontalSmallImg={isDesktop}
      horizontal={isDesktop}
      boxShadow={boxShadow}
      small={!isDesktop && !bigPostsOnMobile}
      titleSize={isDesktop || bigPostsOnMobile ? 'x-medium' : 'medium'}
      category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
      description={((index === 0 && bigPostsOnMobile) || isDesktop) ? truncate(excerpt, 100) : ''}
      className={`${mediaStyles.className} ${isDesktop ? 'mb--x-big mh--140' : 'mb--big'}`}
    />
  );

  return (
    <Box
      className={`list-ads-posts ${mediaStyles.className} p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {!titleInside && (theTitle())}
      <Row>
        <Col colSize="auto" className="p--relative list-ads-posts__content">
          {titleInside && (theTitle())}
          {articles.map(({
            id, title: postTitle, permalink, slug, featured_media, excerpt, categories
          }, index) => {
            if ((index + 1) % 5 === 0) {
              return (
                <React.Fragment key={id}>
                  {theCardArticle(id, postTitle, featured_media, permalink, slug, categories, index, excerpt)}
                  {adsCard}
                </React.Fragment>
              );
            }
            return (theCardArticle(id, postTitle, featured_media, permalink, slug, categories, index, excerpt));
          })}
          {messages?.loadingMore && hasMorePosts && (
            <LoadingMore className="pt--small" onClick={handleClick} loading={loading}>{messages.loadingMore}</LoadingMore>
          )}
        </Col>
        <Col colSize="fixed" className={`ads-column ${mediaStyles.className}`}>
          <Box
            className={`ads-box__loaded ${mediaStyles.className} p--relative mb--normal`}
            style={{ height: colAdsHeight }}
          >
            {ads}
          </Box>
          {podcast}
          {loadedMore && (
            <Box className={`ads-box__load-more ${mediaStyles.className} p--sticky`}>{adsReadMore}</Box>
          )}
        </Col>
      </Row>

      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
          .list-ads-posts .ads-box {
            margin-left: -16px;
            margin-right: -16px;
          }
          @media only screen and (min-width: ${theme.medias.tablet}){
            .list-ads-posts .ads-box {
              margin-left: 0px;
              margin-right: 0px;
            }

            .list-ads-posts .ads-box__loaded .ads-box {
              position: sticky;
              top: 64px;
            }
          }
        `}
      </style>
    </Box>
  );
}

ArticleListAds.defaultProps = {
  titleInside: false,
  titleType: 'h2',
  titleIsSpan: false,
  boxShadow: false,
  ads: null,
  podcast: null,
  messages: null,
  bigPostsOnMobile: false
};

ArticleListAds.propTypes = {
  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      figure: PropTypes.object,
      description: PropTypes.string
    })
  ).isRequired,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
  * Informs if the component rederize an <hx> or an <span>, for SEO
  */
  titleIsSpan: PropTypes.bool,

  /**
  * The category inside the title
  */
  category: PropTypes.string,

  /**
  * The type of title
  */
  titleType: PropTypes.string,

  /**
   * Informs if the title is inside de articles box
   */
  titleInside: PropTypes.bool,

  /**
   * Informs if this card have box-shadow
   */
  boxShadow: PropTypes.bool,

  /**
  * Informs if this CardPost is on big size on mobile version
  */
  bigPostsOnMobile: PropTypes.bool,

  /**
   * Object Podcast
   */
  podcast: PropTypes.element,

  /**
   * Object ADS
   */
  ads: PropTypes.element,

  /**
   * Object ADS
   */
  adsReadMore: PropTypes.element,

  /**
   * Object ADS that appears between articles card
   */
  adsCard: PropTypes.element,
  /**
   * Text for component
   */
  messages: PropTypes.shape({
    loadingMore: PropTypes.string,
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }),

  /**
   * The load more click event
   */
  onLoadMoreClick: PropTypes.func,

  /**
   * Indicate if has more posts to load
   */
  hasMorePosts: PropTypes.bool,

  /**
   * Indicate if loading posts
   */

  loading: PropTypes.bool,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleListAds;
