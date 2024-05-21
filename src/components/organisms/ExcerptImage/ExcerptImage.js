import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import Box from '../../atoms/Box';
import Excerpt from '../../molecules/Excerpt';
import ArticleFigure from '../../molecules/ArticleFigure';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function ExcerptImage({
  color, content, share, bookmark, saveSocial, figure, fullWidth, pinterestPinButton, noImage, ...props
}) {
  // -- theme
  const { theme } = useTheme();

  // -- allowed props
  const propsBlacklist = [
    'content',
    'color',
    'share',
    'bookmark',
    'saveSocial',
    'fullWidth',
    'pinterestPinButton',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- css/style
  const { className, styles } = css.resolve`
    .excerpt-image {
      flex-direction: column-reverse;
    }

    .excerpt-image__figure{
      height: 265px;
    }

    @media only screen and (min-width: ${theme.medias.mobile}){
      .excerpt-image__figure{
        height: 385px;
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .excerpt-image {
        flex-direction: column;
      }
      .excerpt-image__figure{
        height: 430px;
      }
    }
  `;

  return (
    <Box
      className={`excerpt-image d--flex ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Excerpt
        color={color}
        content={content}
        className="mb--x-medium"
      />
      {!noImage && (
        <ArticleFigure
          pinterestPinButton={pinterestPinButton}
          fullWidth={fullWidth}
          share={share}
          bookmark={bookmark}
          saveSocial={saveSocial}
          figure={figure}
          className={`excerpt-image__figure ${className} d--block of--cover mtb--x-medium`}
        />
      )}
      {/* common and custom styles */}
      {styles}
    </Box>
  );
}

ExcerptImage.defaultProps = {
  fullWidth: false,
  share: false,
  bookmark: false,
  saveSocial: [],
  pinterestPinButton: null,
  noImage: false
};

ExcerptImage.propTypes = {
  /**
   * Whether the ArticleFigure should render the pinterest button or not
   */
  pinterestPinButton: PropTypes.shape({
    sharedDescription: PropTypes.string
  }),

  /**
   * The color of border hightlight from Excerpt
   */
  color: PropTypes.string.isRequired,

  /**
   * The content from Excerpt
   */
  content: PropTypes.any.isRequired,

  /**
   * Informs if the image fill the screen width in mobile device
   */
  fullWidth: PropTypes.bool,

  /**
   * Shows or not, the share button
   */
  share: PropTypes.bool,

  /**
   * Shows or not, the bookmark button
   */
  bookmark: PropTypes.bool,

  /**
   * Shows the social save image button
   */
  saveSocial: PropTypes.arrayOf(PropTypes.string),

  /**
   * Image information, src, alt, caption, width, height
   */
  figure: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    caption: PropTypes.string,
    lazy: PropTypes.bool,
    loadingType: PropTypes.string,
    objectFit: PropTypes.string,
    layout: PropTypes.string
  }).isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * True case, it will not show image
   */
  noImage: PropTypes.bool
};

export default ExcerptImage;
