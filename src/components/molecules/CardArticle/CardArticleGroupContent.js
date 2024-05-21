/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import truncate from '@charlescgr/underline/dist/truncate';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import CardArticleCategory from './CardArticleCategory';
import CardArticleTitle from './CardArticleTitle';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function CardArticleGroupContent({
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

  const { direction, theme, getColor } = useTheme();
  const isAmp = useAmp();

  const conditionalLinesDescription = () => {
    if (limitLineDescription) {
      return limitLineDescription;
    }
    if (title.length < 30) { // title 1 line
      return 4; // description 4 lines
    } if (title.length >= 31 && title.length <= 59) { // title 2 lines
      return 3; // description 3 lines
    } if (title.length >= 60 && title.length <= 88) { // title 3 lines
      return 2; // description 2 lines
    } // (title.length >= 89) // title 4 lines
    return 1; // description 1 lines
  };

  const sourceStylesDesktop = () => {
    let sStyles = '';
    if (source?.color && relatedCard) {
      if (direction === 'rtl') {
        sStyles = 'margin-top:0;margin-right:-12px;padding-left:16px;';
      } else {
        sStyles = 'margin-top:0;margin-left:-16px;margin-right:-8px;padding-left:16px;';
      }
    } else {
      sStyles = 'margin-left:-8px;margin-right:-8px';
    }
    return sStyles;
  };

  const sourceStylesMobile = () => {
    if (source?.color && relatedCard) {
      if (direction === 'rtl') {
        return 'margin-top:0;margin-right:-12px;margin-left:-8px;padding-left:16px;';
      }
      return 'margin-top:0;margin-right:-8px;margin-left:-12px;padding-left:16px;';
    }
    return 'margin-top:0;margin-left:-8px;margin-right:-8px';
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .card-article__source {
        ${source?.color ? `background-color: ${getColor(source?.color)};` : ''}
        ${relatedCard ? `border-top-right-radius:  ${theme.spacings.small};` : ''}
        margin-top: ${source?.color ? '-2px' : theme.spacings.normal};
        ${sourceStylesDesktop()};
      }
      .description--text {
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${conditionalLinesDescription()}; /* number of lines to show */
        -webkit-box-orient: vertical;
        margin-bottom: 8px;
      }
    }
  `;
  const { className, styles } = css.resolve`
    .card-article__source{
      ${source?.color && ('margin-top: 0;margin-left:-12px;margin-right:-8px;padding-left:16px;')}
      margin-bottom: ${theme.spacings.normal};
      ${source?.color && `background-color: ${getColor(source?.color)}`};
      ${sourceStylesMobile()}
    }
  `;

  return (
    <>
      {source && (
        <Box
          className={`card-article__source ${className} d--flex mt--small lh--1-5 ptb--normal ff--sans ${source?.color ? 'ai--center plr--normal' : ''}`}
        >
          <div style={{ width: source?.color ? '16px' : '32px', height: source?.color ? '16px' : '32px' }}>
            <Image
              src={source?.logo}
              alt={source?.via}
              title={source?.via}
              width={`${source?.color ? '16' : '32'}`}
              height={`${source?.color ? '16' : '32'}`}
            />
          </div>

          <span className={`fw--regular m${direction === 'rtl' ? 'r' : 'l'}--normal ${source?.color ? 'c--white' : 'c--grey-cold-300'}`}>
            {instructorsName}
            {source?.via && messages.readItIn}
              &nbsp;
          </span>
          {source?.via && (
            <strong className={`mr--normal ${source?.color ? 'c--white' : 'c--grey-cold-300'}`}>{source?.via}</strong>
          )}
        </Box>
      )}
      <Box className={`card-article__header ${className}`}>
        {category && category?.name && (
          <CardArticleCategory
            boxShadow={boxShadow}
            doNotLinkCategory={doNotLinkCategory}
            category={category}
            className
            externalLink={externalLink}
            articleUrl={url}
            utm={utm}
          />
        )}

        {course && (
          <Box className="d--flex ai--center jc--space-between mb--normal">
            {String(type).toLowerCase() === 'online' && (
              <span className="d--inline-block plr--medium ff--sans bc--main-500 c--white fw--bold fs--small lh--1-6">
                {messages.courseOnline}
              </span>
            ) }
            <span className={`c--grey-cold-500 fs--normal lh--1-5 ff--sans m${direction === 'rtl' ? 'l' : 'r'}--big`}>
              { course.oldPrice && <s>{course.oldPrice}</s> }
              {' '}
              { messages.by }
              {' '}
              <strong className="c--grey-cold-700 lh--1-4 fs--x-medium">{course.price}</strong>
            </span>
          </Box>
        )}
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
          className={className}
        />
      </Box>
      {(description || course) && (
        <Box className={`card-article__body ${className}`}>
          {description && (
            <Paragraph
              size="normal"
              textColor="grey-neutral.800"
              className={`${limitLineDescription && 'description--text'} ${className} ${mediaStyles.className} lh--1-7 ${!relatedCard ? 'mt--small' : ''} ${responsive ? 'mtb--normal' : ''}`}
              dangerouslySetInnerHTML={{ __html: truncate(description, 150) }}
            />
          )}
          {course && (
            <A
              utm={utm}
              rel={externalLink && 'noopener'}
              {...googleEvent}
              to={url}
              externalLink={externalLink}
              target={url.indexOf('http') >= 0 ? '_blank' : '_self'}
            >
              <Button
                hasIcon
                rounded
                size="normal"
                color="secondary.600"
                textColor="white"
                className={`fw--bold mt--normal ${direction === 'rtl' ? 'fd--row-reverse' : ''}`}
              >
                <Icon
                  inline
                  name={`${direction === 'rtl' ? 'left' : 'right'}-arrow-alt`}
                  size="normal"
                  color="white"
                  className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
                />
                { messages.discountText }
              </Button>
            </A>
          )}
        </Box>
      )}

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}

    </>
  );
}

CardArticleGroupContent.defaultProps = {
  type: 'h3',
  boxShadow: false,
  titleIsSpan: false,
  externalLink: false,
  googleEvent: {},
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

CardArticleGroupContent.propTypes = {
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

export default CardArticleGroupContent;
