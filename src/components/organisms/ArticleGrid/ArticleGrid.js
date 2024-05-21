/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import chunk from '@extra-object/chunk.min';
import omit from 'object.omit';
import { v4 as uuid } from 'uuid';
import { useAmp } from 'next/amp';

import css from 'styled-jsx/css';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, IMAGES_WIDTH } from '../../_settings/Utils';

import Box from '../../atoms/Box';

import TitleCustom from '../../molecules/TitleCustom';
import CardArticle from '../../molecules/CardArticle';

import LoadingMore from '../LoadingMore';

function ArticleGrid({
  title: titleBox,
  titleIsSpan,
  titleColor,
  boxShadow,
  category,
  titleType,
  articles = [],
  maxCols,
  withDescription,
  messages,
  bookmark,
  onBookmarked,
  smallCols,
  fnLoadMore,
  loading,
  hasMorePosts,
  lazy,
  externalLink,
  utm,
  segregateLinkTitle,
  AdsBox,
  adsEveryAds,
  imagesSize,
  ...props
}) {
  // -- theme
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  // -- Hook render
  const { isDesktop } = useDeviceScreen();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'titleColor',
    'boxShadow',
    'articles',
    'category',
    'titleIsSpan',
    'maxCols',
    'bookmark',
    'smallCols',
    'className',
    'hasMorePosts',
    'messages',
    'withDescription',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClick = () => {
    if (fnLoadMore) {
      fnLoadMore();
    }
  };
  const handleBookmarked = (id, bookmarked) => {
    onBookmarked(id, bookmarked);
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .basic-grid-posts__list {
        display: flex;
        flex-flow: row wrap;
      }
      .basic-grid-posts__list .card-article{
        min-width: ${maxCols === 4 ? '237px' : smallCols ? '248px' : '315px'};
        margin-top: 8px;
        margin-bottom: 8px;
        flex: 1 1 45%;
      }
      .basic-grid-posts__list .card-article:nth-child(2n+1){
        margin-${direction === 'rtl' ? 'left' : 'right'}: ${maxCols === 3 || maxCols === 4 ? '8px' : '8px'};
      }
      .basic-grid-posts__list .card-article:nth-child(2n+2){
        margin-${direction === 'rtl' ? 'right' : 'left'}: ${maxCols === 3 || maxCols === 4 ? '8px' : '0px'};
        margin-${direction === 'rtl' ? 'left' : 'right'}: ${maxCols === 3 || maxCols === 4 ? '0px' : '8px'};
      }
    }
    @media only screen and (min-width: 1000px){
      .basic-grid-posts__list .card-article{
        min-width: ${maxCols === 4 ? '236px' : smallCols ? '248px' : '312px'};
        flex: 1 1 ${maxCols === 4 ? '22%' : '30%'};
      }
      .basic-grid-posts__list .card-article:nth-child(2n+1){
        margin-${direction === 'rtl' ? 'left' : 'right'}: ${maxCols === 2 ? '8px' : '0px'};
      }
      .basic-grid-posts__list .card-article:nth-child(2n+2){
        margin-${direction === 'rtl' ? 'right' : 'left'}: ${maxCols === 2 ? '8px' : '0px'};
        margin-${direction === 'rtl' ? 'left' : 'right'}: 0px;
      }
      .basic-grid-posts__list .card-article:nth-child(3n+2){
        ${maxCols === 3 && ('margin-left: 16px;margin-right: 16px;')}
      }
      .basic-grid-posts__list .card-article:nth-child(4n+2) {
        ${maxCols === 4 && (`margin-${direction === 'rtl' ? 'right' : 'left'}: 16px;`)}
      }
      .basic-grid-posts__list .card-article:nth-child(4n+3) {
        ${maxCols === 4 && ('margin-left: 16px;margin-right: 16px;')}
      }
    }
  `;

  // -- css style
  const { className, styles } = css.resolve`
    .basic-grid-posts__list .card-article{
      margin-top: 16px;
      margin-bottom: 16px;
    }
  `;

  const gridPosts = () => {
    const chunkedPosts = adsEveryAds && adsEveryAds > 0 ? chunk(articles || [], adsEveryAds) : [articles];
    return (
      <>
        {chunkedPosts.map((posts) => (Object.values(posts)?.length > 0 && Object.values(posts)[0].id) && (
          <React.Fragment key={Object.values(posts)[0].id || uuid()}>
            <Box
              className={`basic-grid-posts__list ${className} ${mediaStyles.className} ${!titleBox && (handleCreateStyleClass(props))}`}
              {...allowedProps}
            >
              {Object.values(posts)?.map(({
                id, bookmarked, title, categories, featured_media, excerpt, permalink, slug, source,
              }) => (
                <CardArticle
                  segregateLinkTitle={segregateLinkTitle}
                  key={id}
                  id={id}
                  boxShadow={boxShadow}
                  titleIsSpan
                  titleSize="x-medium"
                  bookmarked={bookmarked}
                  onBookmarked={(i, b) => handleBookmarked(i, b)}
                  titleColor={titleColor}
                  bookmark={bookmark}
                  externalLink={externalLink}
                  title={title}
                  category={categories
                    ? {
                      name: categories[0]?.name,
                      url: categories[0]?.permalink || `${categories[0]?.slug}`
                    }
                    : null}
                  utm={utm && { source: utm?.source, medium: utm?.medium, campaign: utm?.campaign }}
                  figure={{
                    src: featured_media,
                    alt: title,
                    title,
                    lazy: true,
                    loadingType: 'background',
                    objectFit: 'cover',
                    layout: 'fill',
                    width: IMAGES_WIDTH[imagesSize] || null
                  }}
                  description={withDescription ? excerpt : ''}
                  url={permalink || `/${slug}/`}
                  source={source || null}
                  className={`${className} ${mediaStyles.className}`}
                  messages={{
                    readItIn: messages ? messages.readItIn : null
                  }}
                />
              ))}
            </Box>
            <AdsBox />
          </React.Fragment>
        ))}
        {messages?.loadingMore && (
          <LoadingMore textColor="white" color="secondary.700" padding={isDesktop ? 'x-big' : 'small'} className="mlr--auto" onClick={handleClick} loading={loading}>{messages.loadingMore}</LoadingMore>
        )}
      </>
    );
  };

  return (
    <>
      {titleBox ? (
        <Box
          className={`basic-grid-posts ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
          {...allowedProps}
        >
          <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="pb--normal mb--normal">
            {titleBox}
            {category && (
              <strong className="c--secondary-700 ml--normal">{category}</strong>
            )}
          </TitleCustom>
          {gridPosts()}
        </Box>
      ) : (
        <>
          {gridPosts()}
        </>
      )}

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

ArticleGrid.defaultProps = {
  lazy: true,
  maxCols: 3,
  bookmark: false,
  smallCols: false,
  titleIsSpan: false,
  fnLoadMore: () => {},
  loading: false,
  hasMorePosts: false,
  externalLink: false,
  segregateLinkTitle: false,
  AdsBox: () => false,
  adsEveryAds: 0
};

ArticleGrid.propTypes = {
  /**
   * Inform if the cols have small size (conteiner < 600px)
   */
  smallCols: PropTypes.bool,

  /**
   * The max. number of cols. from posts list
   */
  maxCols: PropTypes.number,

  /**
   * Informs if this card have box-shadow
   */
  boxShadow: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The title color
   */
  titleColor: PropTypes.string,

  /**
   * The category inside the title
   */
  category: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, permalink: PropTypes.string })),
      featured_media: PropTypes.any,
      excerpt: PropTypes.string,
      permalink: PropTypes.string,
      slug: PropTypes.string,
      source: PropTypes.object
    })
  ).isRequired,

  /**
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool,

  /**
  * Return to parent element the index of post borkmarked
  */
  onBookmarked: PropTypes.func,

  /**
  * Show or hide de description
  */
  withDescription: PropTypes.bool,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    loadingMore: PropTypes.string,
    readItIn: PropTypes.string
  }),

  /**
   * It will be executed when you click on the "load more" button
   */
  fnLoadMore: PropTypes.func,

  /**
   * If is loading more posts
   */
  loading: PropTypes.bool,

  /**
   * If there are more posts
   */
  hasMorePosts: PropTypes.bool,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool,

  /**
   * Tells whether the link is external
   */
  externalLink: PropTypes.bool,

  /**
   * UTM data
   */
  utm: PropTypes.object.isRequired,

  /**
   * If the value is true, the title will link to the blog, and the rest to the destination link provided.
   */
  segregateLinkTitle: PropTypes.bool,

  /**
   * Ads component
   */
  AdsBox: PropTypes.any,

  /**
   * How many articles per ad
   */
  adsEveryAds: PropTypes.number,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleGrid;
