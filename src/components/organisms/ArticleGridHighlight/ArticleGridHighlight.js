/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import truncate from '@charlescgr/underline/dist/truncate';
import { useAmp } from 'next/amp';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass, IMAGES_WIDTH } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import A from '../../atoms/A';
import Icon from '../../atoms/Icon';

import TitleCustom from '../../molecules/TitleCustom';
import CardArticle from '../../molecules/CardArticle';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ArticleGridHighlight({
  articles,
  titleIsSpan,
  reverse,
  title,
  messages,
  bookmark,
  showCarroselBlock,
  showHightlightBlock,
  bigPostsOnMobile,
  imagesSize,
  ...props
}) {
  const { isDesktop } = useDeviceScreen();
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  const paddingColsStyle = () => {
    let complement = '';
    if (direction === 'rtl') {
      complement = '-reverse';
    }
    if (reverse && direction === 'ltr') {
      complement = '-reverse reverse';
    }
    if (reverse && direction === 'rtl') {
      complement = ' reverse';
    }
    return `two__columns__padding${complement}`;
  };

  const reverseStyles = () => {
    let style = '';
    if (reverse) {
      style = `padding-${direction === 'rtl' ? 'right' : 'left'}:${theme.spacings.normal};`;
    } else {
      style = `padding-right:${theme.spacings.normal};`;
    }
    return style;
  };

  const { className, styles } = css.resolve`
    .row.reverse {
      flex-direction: row-reverse;
    }
    .hightlight__second-post:last-child {
      margin-bottom: 0;
    }
    .last-card{
      border-right: 16px solid transparent;
    }

    .carousel-posts {
      overflow-x: auto;
      margin-left: -16px;
      margin-right: -16px;
      margin-bottom: 8px;
      padding-left: ${theme.spacings.big};
      padding-right: ${theme.spacings.big};
    }

    .carousel-posts-box {
      padding-top: ${theme.spacings.medium};
    }

    .carousel-posts .card-article {
      min-width: 230px;
      flex: 1 1 25%;
    }
  `;

  const mediaStyles = css.resolve`
    @media only screen and (min-width: 900px){
      .hightlight__first-post {
        min-height: 460px;
      }
      .col__first-post {
        ${reverseStyles()}

      }
      .col__second-post {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ${reverseStyles()}
      }
      .last-card{
        border-right: 0px solid transparent;
      }
      .last-card{
        border-right: 0px solid transparent;
      }
    }

    @media only screen and (max-width: 899px) {
      .col__first-post {
        margin-bottom : ${theme.spacings.big};
      }
    }

    @media only screen and (min-width: 1024px) {
      .carousel-posts {
        overflow-x: initial;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
      }

      .carousel-posts-box {
        padding-top: ${theme.spacings.big};
      }

      .carousel-posts .card-article {
        min-width: 230px;
        flex: 1 1 25%;
      }

      .carousel-posts .card-article:last-child {
        margin-${direction === 'rtl' ? 'left' : 'right'}:0;
      }

      .carousel-posts .card-article__title {
        margin-bottom: 0;
      }

    }
  `;

  return (
    <Box className={`${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}>
      {showCarroselBlock && (
        <Box className={`carousel-posts ${className} ${mediaStyles.className} pb--normal d--flex jc--space-between fd--row ${!isDesktop ? 'plr--big mb--normal' : 'plr--normal mb--big'}`}>
          {articles?.slice(0, 4).map(({
            id, title: postTitle, permalink, slug, featured_media, categories, sponsor
          }, index) => (
            <CardArticle
              key={id}
              bookmark={bookmark}
              title={postTitle}
              titleIsSpan
              titleSize="x-medium"
              category={{
                name: categories[0]?.name,
                url: categories[0]?.permalink || `${categories[0]?.slug}`
              }}
              sponsor={sponsor}
              figure={{
                src: featured_media,
                alt: postTitle,
                title: postTitle,
                lazy: false,
                loadingType: 'background',
                objectFit: 'cover',
                layout: 'fill',
                width: IMAGES_WIDTH[imagesSize] || null
              }}
              url={permalink || `/${slug}/`}
              className={`${className} ${mediaStyles.className} ${index < 3 ? `m${direction === 'rtl' ? 'l' : 'r'}--big` : 'last-card'}`}
            />
          ))}
        </Box>
      )}
      {showHightlightBlock && (
        <Box className={'grid-hightlight'}>
          {title && (
            <Box className={`grid-hightlight__heading mb--small d--flex w--100 p--relative ${className} ${mediaStyles.className} `}>
              <TitleCustom titleIsSpan={titleIsSpan} type="h2" lineType="dashed" lineColor="secondary.200" className="pb--normal mb--normal w--100">{title}</TitleCustom>
              {isDesktop && messages?.recommendations.label && (
                <A to={messages?.recommendations.url} textColor="grey-neutral.500" className={`link-see-more ${className} ${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
                  {messages?.recommendations.label}
                  <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
                </A>
              )}
            </Box>
          )}
          <Box className="grid-hightlight__content mb--small">
            <Row className={`${className} ${mediaStyles.className} ${paddingColsStyle()} `}>
              <Col colSize="6" className={`col__first-post ${className} ${mediaStyles.className}`}>
                {articles.slice(4, 5).map(({
                  id, title: postTitle, permalink, slug, featured_media, excerpt, sponsor
                }) => (
                  <CardArticle
                    key={id}
                    titleIsSpan
                    bookmark={bookmark}
                    title={postTitle}
                    titleSize="xx-medium"
                    bigThumb
                    sponsor={sponsor}
                    figure={{
                      src: featured_media,
                      alt: postTitle,
                      title: postTitle,
                      lazy: false,
                      loadingType: 'background',
                      objectFit: 'cover',
                      layout: 'fill',
                      width: IMAGES_WIDTH[imagesSize] || null
                    }}
                    description={truncate(excerpt, 90)}
                    url={permalink || `/${slug}/`}
                    className={`hightlight__first-post  h--100 ${className} ${mediaStyles.className} ${isDesktop ? 'mh--460' : ''}`}
                  />
                ))}
              </Col>
              <Col colSize="6" className={`col__second-post ${className} ${mediaStyles.className}`}>
                {articles.slice(5, 8).map(({
                  id, title: postTitle, permalink, slug, featured_media, excerpt, sponsor
                }) => (
                  <CardArticle
                    key={id}
                    titleIsSpan
                    boxShadow={false}
                    horizontal={isDesktop}
                    horizontalSmallImg={isDesktop}
                    small={!isDesktop && !bigPostsOnMobile}
                    titleSize={isDesktop ? 'x-medium' : 'medium'}
                    title={truncate(postTitle, 55)}
                    sponsor={sponsor}
                    figure={{
                      src: featured_media,
                      alt: postTitle,
                      title: postTitle,
                      lazy: false,
                      loadingType: 'background',
                      objectFit: 'cover',
                      layout: 'fill',
                      width: IMAGES_WIDTH[imagesSize] || null
                    }}
                    description={isDesktop && truncate(excerpt, 60)}
                    url={permalink || `/${slug}/`}
                    className={`hightlight__second-post ${className} ${mediaStyles.className} mb--big ${isDesktop ? 'mh--140' : ''}`}
                  />
                ))}
              </Col>
            </Row>
          </Box>
        </Box>
      )}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

ArticleGridHighlight.defaultProps = {
  reverse: false,
  bookmark: false,
  showCarroselBlock: true,
  bigPostsOnMobile: false,
  showHightlightBlock: true,
  titleIsSpan: false
};

ArticleGridHighlight.propTypes = {
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
      slug: PropTypes.string
    })
  ).isRequired,

  /**
  * Informs if this block (carousel-posts) is showing
  */
  showCarroselBlock: PropTypes.bool,

  /**
  * Informs if this CardPost is on big size on mobile version
  */
  bigPostsOnMobile: PropTypes.bool,

  /**
  * Informs if this block (grid-hightlight) is showing
  */
  showHightlightBlock: PropTypes.bool,

  /**
  * Invert columns flag
  */
  reverse: PropTypes.bool,

  /**
  * Component Title
  */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }),

  /**
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleGridHighlight;
