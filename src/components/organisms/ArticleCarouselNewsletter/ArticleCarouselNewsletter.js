/* eslint-disable camelcase */
import React from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import Col from '../../atoms/Col';
import Row from '../../atoms/Row';

import NewsletterBox from '../../molecules/NewsletterBox';
import CardArticle from '../../molecules/CardArticle';
import TitleCustom from '../../molecules/TitleCustom';

function ArticleCarouselNewsletter({
  articles, title, titleIsSpan, titleType, messages, newsletter, bookmark, bigPostOnMobile, ...props
}) {
  const { theme, colorMode, direction } = useTheme();
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
    'bookmark',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .newsletter-carousel-posts .newsletter-box {
        margin-left: 0px;
        margin-right: 0px;
      }
    }

    @media only screen and (min-width: 1024px){
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
        margin-right:0;
      }

      .carousel-posts .card-article__title {
        margin-bottom: 0;
      }

    }
  `;

  const { className, styles } = css.resolve`
    .newsletter-carousel-posts .newsletter-box {
      margin-left: -16px;
      margin-right: -16px;
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

  return (
    <Box
      className={`newsletter-carousel-posts ${className} ${mediaStyles.className} p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="mb--small pb--normal">{title}</TitleCustom>
      )}
      {isDesktop && messages?.recommendations && (
        <A to={messages?.recommendations.url} textColor="grey-neutral.500" className={`${className} ${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
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
                layout: 'fill'
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
                titleSize="xx-medium"
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
      <Box className={`carousel-posts ${className} ${mediaStyles.className} pb--normal d--flex jc--space-between fd--row ${!isDesktop ? 'plr--big mb--normal' : 'plr--normal mb--big'}`}>
        {articles?.slice(1, 5).map(({
          id, title: postTitle, permalink, slug, featured_media, categories
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
            figure={{
              src: featured_media,
              alt: postTitle,
              title: postTitle,
              lazy: false,
              loadingType: 'background',
              objectFit: 'cover',
              layout: 'fill'
            }}
            url={permalink || `/${slug}/`}
            className={`${className} ${mediaStyles.className} ${index < 3 ? `m${direction === 'rtl' ? 'l' : 'r'}--big` : 'last-card'}`}
          />
        ))}
      </Box>
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

ArticleCarouselNewsletter.defaultProps = {
  bookmark: false,
  titleIsSpan: false,
  titleType: 'h2',
  bigPostOnMobile: false
};

ArticleCarouselNewsletter.propTypes = {
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
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool
};

export default ArticleCarouselNewsletter;
