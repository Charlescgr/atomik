import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';

import ToolItem from '../../molecules/ToolItem';
import TitleCustom from '../../molecules/TitleCustom';

import LoadingMore from '../LoadingMore';

function ArticleShorcuts({
  title, titleIsSpan, titleType, figure, articles, messages, color, colunmFormat, showLoadingMore, ...props
}) {
  const { theme, direction } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'titleIsSpan',
    'figure',
    'articles',
    'messages',
    'color',
    'colunmFormat',
    'showLoadingMore',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .tool-item__column {
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
    }

    @media only screen and (min-width: 1024px){
      .tool-item__column {
        flex-direction: row;
        justify-content: start;
        text-align: start;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .tool-item__column {
      flex-direction: row;
      justify-content: start;
      text-align: left;
      margin-bottom: 8px;
    }
  `;

  return (
    <Box
      className={`article-shortcuts ${className} ${mediaStyles.className} d--flex fw--wrap jc--space-between p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {figure?.src && (
        <Box className={`article-shortcuts__image_container ${!isDesktop ? 'd--flex jc--center w--100 mtb--big' : ''}`}>
          <Image src={figure?.src} alt={figure?.alt} width={figure?.width} height={figure?.height} layout="fixed" className={`${!colunmFormat ? '' : 'mb--big'} ${isDesktop && !colunmFormat ? 'mb--x-big' : 'mt--x-big mb--big mlr--auto'}`} />
        </Box>
      )}
      <Box className={`article-shortcuts__content p--relative ${className} ${mediaStyles.className} ${colunmFormat || isDesktop ? ' f--1' : ''}`}>
        {title && (
          <>
            <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="pb--normal mb--normal">{title}</TitleCustom>
            {(isDesktop && messages.viewMore?.url && !colunmFormat) && (
              <A to={messages.viewMore.url} textColor="grey-neutral.500" className={`${className} ${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
                {messages.viewMore.label}
                <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
              </A>
            )}
          </>
        )}

        <Row className="ai--flex-start">
          {articles.map(({
            id, label, url, figure: { src }
          }) => (
            <Col key={id} colSize={colunmFormat ? '12' : '4'} className={`tool-item__column ${className} ${mediaStyles.className} d--flex ai--center`}>
              <ToolItem
                imgPath={src}
                label={label}
                url={url}
                color={color}
              />
            </Col>
          ))}
        </Row>

        {(!isDesktop || showLoadingMore) && (
          <LoadingMore
            color="secondary.600"
            textColor="white"
          >
            {messages.viewMore.label}
          </LoadingMore>
        )}
      </Box>

      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

ArticleShorcuts.defaultProps = {
  colunmFormat: false,
  showLoadingMore: false,
  titleType: 'h2',
  titleIsSpan: false
};

ArticleShorcuts.propTypes = {
  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      url: PropTypes.string,
      figure: PropTypes.shape({
        src: PropTypes.string
      })
    })
  ).isRequired,

  /**
  * The image to illustrate
  */
  figure: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),

  /**
   * Component messages
   * */
  messages: PropTypes.shape({
    viewMore: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  }),

  /**
  * The Title
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
   * The color of bullets/tool items
   * */
  color: PropTypes.string,

  /**
   * Renderize like mobile version
   * */
  colunmFormat: PropTypes.bool,

  /**
   * Show button LoadingMore
   * */
  showLoadingMore: PropTypes.bool,

  /**
   * The custom classnames
   */
  className: PropTypes.string
};

export default ArticleShorcuts;
