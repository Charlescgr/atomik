/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import Box from '../../atoms/Box';
import TitleCustom from '../../molecules/TitleCustom';
import CardArticle from '../../molecules/CardArticle';
import LoadingMore from '../LoadingMore';

import { handleCreateStyleClass } from '../../_settings/Utils';

function SearchResults({
  small, messages, ads, articles, onLoadMoreClick, hasMorePosts, loading, lazy, ...props
}) {
  const { theme } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const propsBlacklist = [
    'title',
    'small',
    'titleType',
    'titleColor',
    'totalResults',
    'ads',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const handleClick = () => {
    onLoadMoreClick();
  };

  return (
    <Box
      className={`search-results ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >

      {messages?.noResults ? (
        <TitleCustom type="h3" textColor="main.800" className="mb--x-big">{messages?.noResults}</TitleCustom>
      ) : (
        <>
          {articles.map(({
            id, title, permalink, featured_media, excerpt, categories
          }, index) => {
            if ((index + 1) % 5 === 0) {
              return (
                <>
                  <CardArticle
                    key={id}
                    horizontal={isDesktop || (!small && index >= 1)}
                    horizontalSmallImg={isDesktop || (!small && index >= 1)}
                    small={small}
                    titleSize={isDesktop ? 'x-medium' : 'medium'}
                    titleIsSpan
                    category={{
                      name: categories ? categories[0]?.name : '',
                      url: categories ? categories[0]?.permalink || `${categories[0]?.slug}` : ''
                    }}
                    title={title}
                    figure={{
                      src: featured_media,
                      alt: title,
                      lazy,
                      loadingType: 'background',
                      objectFit: 'cover',
                      layout: 'fill'
                    }}
                    description={isDesktop && (excerpt)}
                    url={permalink}
                    className={!isDesktop ? 'mb--big' : 'mb--x-big'}
                  />
                  {ads}
                </>
              );
            }

            return (
              <CardArticle
                key={id}
                horizontal={isDesktop || (!small && index >= 1)}
                horizontalSmallImg={isDesktop || (!small && index >= 1)}
                small={small}
                titleSize={isDesktop || (index === 0) ? 'x-medium' : 'medium'}
                titleIsSpan
                category={{
                  name: categories ? categories[0]?.name : '',
                  url: categories ? categories[0]?.permalink || `${categories[0]?.slug}` : ''
                }}
                title={title}
                figure={{
                  src: featured_media,
                  alt: title,
                  lazy,
                  loadingType: 'background',
                  objectFit: 'cover',
                  layout: 'fill'
                }}
                description={(index <= 1 || isDesktop) && (excerpt)}
                url={permalink}
                className={!isDesktop ? 'mb--big' : 'mb--x-big'}
              />
            );
          })}
          {messages?.loadingMore && hasMorePosts && (<LoadingMore className="pt--small" onClick={handleClick} loading={loading}>{messages.loadingMore}</LoadingMore>)}
        </>
      )}
      <style jsx global>
        {`
        .search-results .ads__result{
          margin-left: -16px;
          margin-right: -16px;
        }

        @media only screen and (min-width: ${theme.medias.tablet}){
          .search-results .ads__result{
            margin-left: 0px;
            margin-right: 0px;
          }
        }
      `}
      </style>
    </Box>

  );
}

SearchResults.defaultProps = {
  lazy: true,
  small: false
};

SearchResults.propTypes = {
  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      category: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          link: PropTypes.string,
          permalink: PropTypes.string,
          slug: PropTypes.string
        })
      ),
      link: PropTypes.string,
      featured_media: PropTypes.object,
      excerpt: PropTypes.string
    })
  ).isRequired,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    noResults: PropTypes.string,
    loadingMore: PropTypes.string,
  }),

  /**
   * Config layout size of CardArticle
   */
  small: PropTypes.bool,

  /**
   * Ads component
   */
  ads: PropTypes.element,

  /**
   * The custom classnames
   */
  className: PropTypes.string,

  onLoadMoreClick: PropTypes.func,
  hasMorePosts: PropTypes.bool,
  loading: PropTypes.bool,
  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default SearchResults;
