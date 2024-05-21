/* eslint-disable camelcase */
import React from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass, IMAGES_WIDTH } from '../../_settings/Utils';

import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import Col from '../../atoms/Col';
import Row from '../../atoms/Row';

import NewsletterBox from '../../molecules/NewsletterBox';
import CardArticle from '../../molecules/CardArticle';
import TitleCustom from '../../molecules/TitleCustom';

function ArticleGridNewsletter({
  articles,
  title,
  titleIsSpan,
  titleType,
  messages,
  newsletter,
  AdsBox,
  bookmark,
  bigPostOnMobile,
  imagesSize,
  ...props
}) {
  const { theme, direction, colorMode } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'articles',
    'title',
    'titleIsSpan',
    'titleType',
    'messages',
    'newsletter',
    'AdsBox',
    'bookmark',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .sugestion-posts .newsletter-box {
        margin-left: 0px;
        margin-right: 0px;
      }

      .sugestion-posts__list {
        overflow-x: initial;
        display: flex;
        flex-flow: row wrap;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
      }

      .last-card{
        border-right: 0px solid transparent;
      }

      .sugestion-posts__list .card-article {
        min-width: 313px;
        margin-bottom: 20px;
        flex: 1 1 45%;
      }

      .sugestion-posts__list .card-article:nth-child(2n+1) {
        margin-right:10px;
      }

      .sugestion-posts__list .card-article:nth-child(2n+2) {
        margin-left:10px;
      }
    }

    @media only screen and (min-width: 1000px) {
      .sugestion-posts__list .card-article {
        flex: 1 1 30%;
      }

      .sugestion-posts__list .card-article:nth-child(2n+1) {
        margin-right: 0;
      }

      .sugestion-posts__list .card-article:nth-child(2n+2) {
        margin-left: 0;
      }

      .sugestion-posts__list .card-article:nth-child(2),
      .sugestion-posts__list .card-article:nth-child(5) {
        margin-left: 14px;
        margin-right: 14px;
      }
    }

    @media only screen and (min-width: 1024px) {
      .sugestion-posts__list .card-article:nth-child(2),
      .sugestion-posts__list .card-article:nth-child(5) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .sugestion-posts .newsletter-box {
      margin-left: -16px;
      margin-right: -16px;
    }
    .last-card{
      border-right: 16px solid transparent;
    }

    .sugestion-posts__list {
      flex-flow: row;
      overflow-x: auto;
      margin-left: -16px;
      margin-right: -16px;
    }

    .sugestion-posts__list .card-article {
      min-width: 245px;
      flex: 1 1 25%;
    }
  `;

  return (
    <Box
      className={`sugestion-posts ${className} ${mediaStyles.className} p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="mb--small pb--normal">{title}</TitleCustom>
      )}
      {isDesktop && messages?.recommendations && (
        <A to={messages?.recommendations.url} textColor="grey-neutral.500" className={` ${className} ${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
          { messages?.recommendations.label }
          <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
        </A>
      )}

      <Row className={`${className} ${mediaStyles.className} two__columns__padding${direction === 'rtl' ? '-reverse' : ''}`}>
        <Col colSize="6" className={`${className} ${mediaStyles.className} ptb--normal mb--small`}>
          {articles.slice(0, 1).map(({
            id, title: postTitle, permalink, slug, featured_media, categories
          }) => (
            <CardArticle
              key={id}
              titleIsSpan
              bookmark={bookmark}
              title={postTitle}
              titleSize="x-medium"
              figure={{
                src: featured_media,
                alt: postTitle,
                title: postTitle,
                lazy: true,
                loadingType: 'background',
                objectFit: 'cover',
                layout: 'fill',
                width: IMAGES_WIDTH[imagesSize] || null
              }}
              category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
              url={permalink || `/${slug}/`}
              className={`${className} ${mediaStyles.className} first-card-news h--100`}
            />
          ))}
        </Col>
        <Col colSize="6" className={`${className} ${mediaStyles.className} ptb--normal mb--small`}>
          {newsletter ? (
            <NewsletterBox
              textColor={colorMode === 'dark' ? 'grey-neutral.800' : 'grey-neutral.700'}
              title={newsletter.title}
              description={newsletter.description}
              // eslint-disable-next-line no-alert
              onSubmit={(email) => alert(email)}
              list="category"
              className={`${className} ${mediaStyles.className} ${isDesktop ? 'br--small' : ''} ${colorMode === 'dark' ? 'bc--main-100' : 'bc--main-50'} h--100 p--big`}
            />
          ) : (
            articles.slice(1, 2).map(({
              id, title: postTitle, permalink, slug, featured_media, categories
            }) => (
              <CardArticle
                key={id}
                titleIsSpan
                bookmark={bookmark}
                title={postTitle}
                titleSize="x-medium"
                figure={{
                  src: featured_media,
                  alt: postTitle,
                  title: postTitle,
                  lazy: true,
                  loadingType: 'background',
                  objectFit: 'cover',
                  layout: 'fill'
                }}
                category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
                url={permalink || `/${slug}/`}
                className={`${className} ${mediaStyles.className} first-card-news h--100`}
              />
            ))
          )}

        </Col>
      </Row>
      <Box className={`sugestion-posts__list ${className} ${mediaStyles.className} ${isDesktop ? 'pt--normal' : 'pb--big plr--big'} d--flex jc--space-between`}>
        {articles.slice(2, 6).map(({
          id, title: postTitle, permalink, slug, featured_media, excerpt, categories
        }) => {
          if (isDesktop) {
            return (
              <CardArticle
                key={id}
                bookmark={bookmark}
                titleIsSpan
                titleSize="x-medium"
                title={postTitle}
                figure={{
                  src: featured_media,
                  alt: postTitle,
                  title: postTitle,
                  loadingType: 'background',
                  lazy: true,
                  objectFit: 'cover',
                  layout: 'fill'
                }}
                category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
                url={permalink || `/${slug}/`}
                description={excerpt}
                className={`${className} ${mediaStyles.className}`}
              />
            );
          }
          return (
            <CardArticle
              key={id}
              bookmark={bookmark}
              titleIsSpan
              titleSize="x-medium"
              title={postTitle}
              figure={{
                src: featured_media,
                alt: postTitle,
                title: postTitle,
                loadingType: 'background',
                lazy: true,
                objectFit: 'cover',
                layout: 'fill'
              }}
              category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
              url={permalink || `/${slug}/`}
              className={`${className} ${mediaStyles.className} mr--normal`}
            />
          );
        }
        )}

        {isDesktop && (
          <Box className={`${className} ${mediaStyles.className} card-article card-article-ads d--flex w--100`}>
            <AdsBox />
          </Box>
        )}

        {articles.slice(6, 99).map(({
          id, title: postTitle, permalink, slug, featured_media, excerpt, categories
        }) => {
          if (isDesktop) {
            return (
              <CardArticle
                key={id}
                titleIsSpan
                titleSize="x-medium"
                title={postTitle}
                bookmark={bookmark}
                figure={{
                  src: featured_media,
                  alt: postTitle,
                  title: postTitle,
                  loadingType: 'background',
                  lazy: true,
                  objectFit: 'cover',
                  layout: 'fill'
                }}
                category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
                url={permalink || `/${slug}/`}
                description={excerpt}
                className={`${className} ${mediaStyles.className}`}
              />
            );
          }
          return (
            <CardArticle
              key={id}
              titleIsSpan
              titleSize="x-medium"
              title={postTitle}
              bookmark={bookmark}
              figure={{
                src: featured_media,
                alt: postTitle,
                title: postTitle,
                loadingType: 'background',
                lazy: true,
                objectFit: 'cover',
                layout: 'fill'
              }}
              category={categories?.length > 0 ? { name: categories[0].name, url: categories[0].link } : null}
              url={permalink || `/${slug}/`}
              className={`${className} ${mediaStyles.className} last-card`}
            />
          );
        }
        )}
      </Box>
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
          .card-article-ads .ads-box {
            width: 100%;
            margin-bottom: 0;
          }
        `}
      </style>
    </Box>
  );
}

ArticleGridNewsletter.defaultProps = {
  bookmark: false,
  titleIsSpan: false,
  titleType: 'h2',
  bigPostOnMobile: false
};

ArticleGridNewsletter.propTypes = {
  /**
   * List of interesting posts
   * */
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
   * Container Title
   * */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
  * The type of title
  */
  titleType: PropTypes.string,

  /**
  * Informs if this CardPost is on big size on mobile version
  */
  bigPostOnMobile: PropTypes.bool,

  /**
   * Data for targeting recommended posts
   * */
  messages: PropTypes.shape({
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }),

  /**
  * Data for targeting newsletter posts
  * */
  newsletter: PropTypes.object,

  /**
  * Data for targeting newsletter posts
  * */
  AdsBox: PropTypes.func,

  /**
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleGridNewsletter;
