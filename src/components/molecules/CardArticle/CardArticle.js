/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';

import CardArticleCategory from './CardArticleCategory';
import CardArticleTitle from './CardArticleTitle';
import CardArticleGroupContent from './CardArticleGroupContent';

import SponsorBar from '../SponsorBar';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function CardArticle({
  id,
  figure,
  boxShadow,
  bigThumb,
  title,
  titleColor,
  category,
  instructorsName,
  description,
  source,
  relatedCard,
  url,
  externalLink,
  horizontalSmallImg,
  type,
  bookmark,
  bookmarked,
  onBookmarked,
  messages,
  sponsor,
  titleSize,
  titleIsSpan,
  googleEvent,
  limitLineDescription,
  utm,
  segregateLinkTitle,
  doNotLinkCategory,
  ...props
}) {
  const {
    small, horizontal, course, responsive
  } = props;
  const defaultPost = (!responsive && !course && !horizontal && !small) ? 'is--default' : '';
  const [bookmarkedStatus, setBookmarkedStatus] = useState();

  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  const handleBookmark = () => {
    setBookmarkedStatus(!bookmarkedStatus);
    const msg = (bookmarkedStatus) ? 'Article removed from bookmark' : 'Article add to bookmark';
    alert(msg);
    if (onBookmarked) {
      onBookmarked(id, !bookmarkedStatus);
    }
  };

  useEffect(() => {
    // if onBookmarked exist, the data/content is from mock/endpoit
    if (onBookmarked) {
      setBookmarkedStatus(bookmarked);
    }
  }, []);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .is--responsive {
        display: flex;
      }
      .is--responsive .card-article__thumb{
        border-top-${direction === 'rtl' ? 'left' : 'right'}-radius: 0;
        border-top-${direction === 'rtl' ? 'right' : 'left'}-radius: ${theme.spacings.small};
        border-bottom-${direction === 'rtl' ? 'right' : 'left'}-radius:  ${theme.spacings.small};
      }
      .is--responsive .card-article__content{
        flex: 1;
      }

      .card-article .card-article__image {
        will-change: transform;
        transition: all 250ms ease-in-out;
      }

      .card-article:hover .card-article__image {
        transform: scale(1.06);
      }

    }
  `;

  const { className, styles } = css.resolve`
    .card-article {
      border: 1px solid ${boxShadow && colorMode === 'dark' ? getColor('grey-neutral.300') : theme.commomColors.transparent};
    }
    .is--default .card-article__thumb{
      height: 180px;
    }
    .is--responsive .card-article__thumb{
      height: 180px;
    }

    // --- small / horizontal / course
    .is--small .card-article__thumb{
      width: 110px;
      height: 91px;
    }
    .is--horizontal .card-article__thumb,
    .is--course .card-article__thumb{
      ${horizontalSmallImg ? 'width: 110px;height: auto;' : 'width: 262px;height: 208px;'}
    }
    .is--small .card-article__content,
    .is--course .card-article__content,
    .is--horizontal .card-article__content {
      flex: 1;
    }
    .is--small,
    .is--course,
    .is--horizontal {
      display: flex;
    }
    .is--responsive .card-article__thumb{
      border-top-left-radius: ${theme.spacings.small};
      border-top-right-radius:  ${theme.spacings.small};
    }
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .is--card-related{
        display: flex;
      }
    }
    @media only screen and (min-width: ${theme.medias.mobile}){
      .is--default .card-article__thumb{
        height: 265px;
      }
      .is--responsive .card-article__thumb{
        height: 265px;
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .is--responsive {
        display: flex;
      }
      .is--default .card-article__thumb {
        height: ${bigThumb ? '305px' : '200px'};
      }
      .is--responsive .card-article__thumb {
        width: 262px;
        height: 176px;
      }
      .is--responsive.is--brand-week .card-article__thumb {
        width: 262px;
        height: 225px;
      }
      .is--responsive.card-related .card-article__thumb {
        width: 262px;
        height: auto;
      }
      .is--horizontal .card-article__thumb,
      .is--course .card-article__thumb {
        ${horizontalSmallImg ? 'width: 160px;height: auto;' : 'width: 262px;height: 208px;'}
      }
    }
  `;

  const contentStyles = () => {
    let cStyles = 'd--flex fd--column';
    if (!small && !horizontal && !responsive && !course) {
      if (source?.color) {
        cStyles += ' pt--0 pb--normal';
      } else if (horizontalSmallImg && horizontal) {
        cStyles += ' plr--normal';
      } else {
        cStyles += ' ptb--normal';
      }
    } else if (!small && horizontal && horizontalSmallImg) {
      cStyles += ` p${direction === 'rtl' ? 'r' : 'l'}--x-medium p${direction === 'rtl' ? 'l' : 'r'}--small ptb--normal`;
    } else {
      cStyles += ` p${direction === 'rtl' ? 'r' : 'l'}--x-medium p${direction === 'rtl' ? 'l' : 'r'}--small`;
    }

    if (boxShadow) {
      if (relatedCard) {
        cStyles += ` p${direction === 'rtl' ? 'l' : 'r'}--normal`;
      } else {
        cStyles += ' plr--normal';
      }
    }

    if (relatedCard && !course) {
      cStyles += ' jc--start';
    } else {
      cStyles += ' jc--center';
    }
    return cStyles;
  };

  const imageStyles = () => {
    let borderStyle = '';
    if (horizontal || small || course) {
      borderStyle = `br${direction === 'rtl' ? 'r' : 'l'}--small`;
    } else if (relatedCard) {
      borderStyle = '';
    } else {
      borderStyle = 'brt--small';
    }
    return borderStyle;
  };

  const globalLinkStyles = () => {
    let linkStyle = '';
    if (small || course || horizontalSmallImg) {
      linkStyle = 'd--flex';
    } else if (responsive && !course) {
      linkStyle = 'is--card-related';
    }
    return linkStyle;
  };

  return (
    <Box
      className={`card-article ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} ${defaultPost} w--100 br--small ${small ? 'd--flex ai--center' : ''} ${!small && boxShadow ? 'bs--small' : ''}`}
    >
      <A
        utm={utm}
        {...googleEvent}
        to={url}
        externalLink={externalLink}
        target={`${url.indexOf('http') >= 0 ? '_blank' : '_self'}`}
        className={`global-link ${className} ${globalLinkStyles()}`}
      >
        <Box
          className={`card-article__thumb ${className} ${mediaStyles.className} o--hidden ${imageStyles()} p--relative`}
        >
          <Image
            {...figure}
            className={`card-article__image ${className} ${mediaStyles.className} w--100 h--100 of--cover ${imageStyles()} d--block`}
          />
          { /* *** is-responsive border-radius is on styles *** */ }
          {(!small && bookmark) && (
            <Box className="card-article__options p--absolute t--0 r--0">
              <Button
                color="main.700"
                textColor="white"
                rounded
                onlyIcon
                onClick={handleBookmark}
              >
                <Icon
                  inline
                  color="white"
                  size="medium"
                  prefix={!bookmarkedStatus ? 'bx' : 'bxs'}
                  name={!bookmarkedStatus ? 'bookmark-plus' : 'bookmark-minus'}
                />
              </Button>
            </Box>
          )}
          {sponsor !== null && sponsor !== {} && (
            <SponsorBar
              sponsor={sponsor}
            />
          )}
        </Box>
        <Box className={`card-article__content ${className} ${mediaStyles.className} ${contentStyles()} ${boxShadow}`}>

          {small ? (
            <>
              {category
              && (
                <CardArticleCategory
                  boxShadow={boxShadow}
                  doNotLinkCategory={doNotLinkCategory}
                  category={category}
                  className
                  externalLink={externalLink}
                  articleUrl={url}
                  utm={utm}
                />
              ) }
              <CardArticleTitle
                small={small}
                titleSize={titleSize}
                titleColor={titleColor}
                titleIsSpan={titleIsSpan}
                description={description}
                horizontalSmallImg={horizontalSmallImg}
                horizontal={horizontal}
                relatedCard={relatedCard}
                title={title}
                className={mediaStyles.className}
              />
            </>
          ) : (
            <CardArticleGroupContent
              id={id}
              figure={figure}
              boxShadow={boxShadow}
              bigThumb={bigThumb}
              title={title}
              titleColor={titleColor}
              category={category}
              instructorsName={instructorsName}
              description={description}
              source={source}
              relatedCard={relatedCard}
              url={url}
              externalLink={externalLink}
              horizontalSmallImg={horizontalSmallImg}
              type={type}
              bookmark={bookmark}
              bookmarked={bookmarked}
              onBookmarked={onBookmarked}
              messages={messages}
              responsive={responsive}
              titleSize={titleSize}
              titleIsSpan={titleIsSpan}
              googleEvent={googleEvent}
              limitLineDescription={limitLineDescription}
              utm={utm}
              segregateLinkTitle={segregateLinkTitle}
              doNotLinkCategory={doNotLinkCategory}
              course={course}
              className={`${className} ${mediaStyles.className}`}
            />
          )}
        </Box>

        {/* common and custom styles */}
        {styles}
        {!isAmp && mediaStyles.styles}
        <style jsx global>
          {`
          // custom styles
          .card-article .card-article__title {
            transition: all 250ms ease-in-out;
          }
          .card-article:hover .card-article__title {
            color: ${getColor('secondary.600')};
            transition: color 250ms ease-in-out;
          }
        `}
        </style>
      </A>
    </Box>
  );
}

CardArticle.defaultProps = {
  type: 'h3',
  boxShadow: false,
  titleIsSpan: false,
  externalLink: false,
  googleEvent: {},
  sponsor: null,
  messages: {
    by: 'por',
    discountText: 'Empezar curso - 50% off',
    courseOnline: 'Curso Online',
    readItIn: 'Leerlo en'
  },
  segregateLinkTitle: false,
  doNotLinkCategory: false,
  small: false,
  horizontal: false,
  course: false,
  responsive: false,
  relatedCard: false,
};

CardArticle.propTypes = {
  /**
   * The post id
   */
  id: PropTypes.number,

  /**
   * Informs if the google events on click
   */
  googleEvent: PropTypes.object,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * Informs if this card have box-shadow
   */
  boxShadow: PropTypes.bool,

  /**
   * Informs if this is a external link (out of website)
   */
  externalLink: PropTypes.bool,

  /**
   * The thumb image of the post
   */
  thumb: PropTypes.string,

  /**
   * The title of the post
   */
  title: PropTypes.string.isRequired,

  /**
   * The title color
   */
  titleColor: PropTypes.string,

  /**
   * The category of the post
   */
  category: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),

  /**
   * The instructorsName of the course
   */
  instructorsName: PropTypes.string,

  /**
   * The short description of the post
   */
  description: PropTypes.string,

  /**
   * Inform if the post will be displayed small
   */
  small: PropTypes.bool,

  /**
   * Shows or not, the bookmark button
   */
  bookmark: PropTypes.bool,

  /**
   * Inform if the post is on MyBookmark list
   */
  bookmarked: PropTypes.bool,

  /**
   * Return to parent element the index of post borkmarked
   */
  onBookmarked: PropTypes.func,

  /**
   * Related post/car inside the content
   */
  relatedCard: PropTypes.bool,

  /**
   * Inform if the post will be displayed horizontally
   */
  horizontal: PropTypes.bool,

  /**
   * Inform if the post will be displayed horizontal with small img
   */
  horizontalSmallImg: PropTypes.bool,

  /**
   * If this post will be displayed in a different format on mobile and desktop
   */
  responsive: PropTypes.bool,

  /**
   * Informs if this card is used on a page with brandWeek ADS
   */
  brandWeek: PropTypes.bool,

  /**
   * The font-size of the title, when the card is on small mode
   */
  titleSize: PropTypes.string,

  /**
   * The source of the post
   */
  source: PropTypes.shape({
    color: PropTypes.string,
    via: PropTypes.string,
    logo: PropTypes.string
  }),

  /**
   * If it's a course post
   */
  course: PropTypes.shape({
    price: PropTypes.string,
    oldPrice: PropTypes.string
  }),

  /**
   * The url from post
   */
  url: PropTypes.string.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The type of course (Online).
   */
  type: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    courseOnline: PropTypes.string,
    by: PropTypes.string,
    discountText: PropTypes.string,
    readItIn: PropTypes.string
  }),

  /**
   * Inform all data information from sponsor
   */
  sponsor: PropTypes.shape({
    brand: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string
  }),

  /**
   * Image properties
   */
  figure: PropTypes.object,

  /**
   * Post Thumb full size
   */
  bigThumb: PropTypes.bool,

  /**
   * If given a number, the number of lines in the description will not exceed that number.
   */
  limitLineDescription: PropTypes.number,

  /**
   * UTM data
   */
  utm: PropTypes.object,

  /**
   * If the value is true, the title will link to the blog, and the rest to the destination link provided.
   */
  segregateLinkTitle: PropTypes.bool,

  /**
   * When true does the category link take to another category
   */
  doNotLinkCategory: PropTypes.bool
};

export default CardArticle;
