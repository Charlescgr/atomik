import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useAmp } from 'next/amp';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Image from '../../atoms/Image';
import A from '../../atoms/A';

import TitleCustom from '../TitleCustom';

import { handleCreateStyleClass, IMAGES_WIDTH } from '../../_settings/Utils';

function ArticleCarouselHighlight({
  title: titleBox, titleIsSpan, titleType, articles = [], lazy, carousel, imagesSize, ...props
}) {
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleIsSpan',
    'titleType',
    'articles',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .highlight-posts {
        padding: 0;
      }

      .highlight-posts__list{
        overflow-x: initial;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
        ${!carousel ? 'flex-direction: row;' : ''}
      }

      .highlight__item {
        ${!carousel ? 'margin-left: 8px;margin-right: 8px;' : ''};
      }
      .highlight-posts__list .highlight__item:first-child{
        margin-${direction === 'rtl' ? 'right' : 'left'}: 0px;
      }

      .highlight-posts__list .highlight__item:last-child{
        margin-${direction === 'rtl' ? 'left' : 'right'}: ${carousel ? '16px' : '0px'};
        border-${direction === 'rtl' ? 'left' : 'right'}: none;
      }
    }
  `;

  const { styles, className } = css.resolve`
    .highlight-posts__list {
      ${carousel ? 'flex-flow: row;overflow-x: auto;margin-left: -16px;margin-right: -16px;' : 'flex-direction: column;'}
    }
    .highlight__item {
      ${carousel ? 'max-width: 250px;' : ''};
      min-width: 250px;
      min-height: ${carousel ? '320px' : '192px'};
      margin-right: ${carousel ? '16px' : '0'};
      flex: 1 1 25%;
    }
    .highlight-posts__list .highlight__item:first-child{
      margin-${direction === 'rtl' ? 'right' : 'left'}: ${carousel ? '16px' : '0px'};
    }
    .highlight-posts__list .highlight__item:last-child{
      border-${direction === 'rtl' ? 'left' : 'right'}: ${carousel ? '16px solid transparent' : 'none'};
    }
    .highlight__link {
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%) 0 0 no-repeat;
      transition: all 0.5s ease;
    }
    .highlight__link:hover {
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%) 0 100px no-repeat;
      transition: all 0.5s ease;
    }
  `;

  return (
    <Box
      className={`highlight-posts ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="mb--normal pb--normal">{titleBox}</TitleCustom>

      <Box className={`highlight-posts__list ${className} ${mediaStyles.className} d--flex jc--space-between`}>
        {articles.map(({
          id, name, permalink, highlight_media: highlight
        }) => (
          <Box
            key={id}
            className={`highlight__item ${className} ${mediaStyles.className} p--relative mt--normal mb--small`}
          >
            <Image
              src={highlight}
              className={`highlight__image ${className} ${mediaStyles.className} w--100 h--100 ${carousel ? 'br--big' : 'br--small'} of--cover br--small d--block`}
              alt={name}
              title={name}
              lazy={lazy}
              loadingType={'none'}
              objectFit={'cover'}
              layout={'fill'}
              width={IMAGES_WIDTH[imagesSize] || null}
            />
            <A
              to={permalink}
              externalLink={permalink.indexOf('http') >= 0}
              target={permalink.indexOf('http') >= 0 ? '_blank' : '_self'}
              textColor="white"
              className={`highlight__link ${className} ${mediaStyles.className} ff--sans fs--medium fw--bold lh--1-6 ls--normal p--absolute b--0 p--big d--flex ai--flex-end w--100 h--100 l--0  ${carousel ? 'jc--flex-start br--big' : 'jc--center br--small'}`}
            >
              {name}
            </A>
          </Box>
        ))}
      </Box>

      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

ArticleCarouselHighlight.defaultProps = {
  carousel: true,
  titleIsSpan: false,
  titleType: 'h2',
  lazy: true
};

ArticleCarouselHighlight.propTypes = {
  /**
   * The title
   */
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
   * Informs if the carousel is active
   */
  carousel: PropTypes.bool,

  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      permalink: PropTypes.string,
      highlight_media: PropTypes.string
    })).isRequired,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleCarouselHighlight;
