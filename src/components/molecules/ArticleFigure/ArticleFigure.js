/* eslint-disable no-alert */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';

import SocialButton from '../SocialButton';

function ArticleFigure({
  share, bookmark, saveSocial, figure, fullWidth, pinterestPinButton, ...props
}) {
  const { objectFit, coverHeight } = figure;
  const { isDesktop } = useDeviceScreen();
  const { theme, absolutUrl, colorMode } = useTheme();
  const [bookmarked, setBookmarked] = useState(false);
  const [showPinButton, setShowPinButton] = useState(false);

  const { className, styles } = css.resolve`
    .figure {
      cursor: ${pinterestPinButton && !isDesktop && 'pointer'};
    }

    .image__container {
      background: ${showPinButton && pinterestPinButton && !isDesktop ? '#000' : 'transparent'};
      position: relative;
    }

    .image__container .figure__image {
      opacity: ${showPinButton && pinterestPinButton && !isDesktop ? 0.5 : 1};
    }

    .image__container {
      ${objectFit === 'cover' ? `height: ${coverHeight / 2 || '265'}px;` : ''}
    }

    @media only screen and (min-width: ${theme.medias.mobile}){
      .image__container {
        ${objectFit === 'cover' ? `height: ${coverHeight / 1.5 || '385'}px;` : ''}
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .image__container {
        ${objectFit === 'cover' ? `height: ${coverHeight || '430'}px;` : ''}
      }
    }
  `;

  const propsBlacklist = [
    'className',
    'share',
    'bookmark',
    'saveSocial',
    'fullWidth',
    'figure',
    'padding',
    'margin',
    'pinterestPinButton'
  ];
  const imageRef = useRef(null);
  const allowedProps = omit(props, propsBlacklist);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    const msg = (bookmarked) ? 'Article removed from bookmark' : 'Article add to bookmark';
    alert(msg);
  };

  const handleShare = () => {
    const msg = 'Share this article!';
    alert(msg);
  };

  const handleSocial = (social) => {
    const msg = `Share this image on ${social}`;
    alert(msg);
  };

  const backgroundStyle = () => (colorMode === 'dark' ? 'bc--grey-cold-200' : 'bc--grey-cold-50');

  const colorStyle = () => (colorMode === 'dark' ? 'c--grey-cold-1000' : 'c--grey-cold-500');

  return (
    <>
      <figure
        ref={imageRef}
        className={`figure ${className} ${handleCreateStyleClass({ fullWidth, ...props })} p--relative`}
        onMouseEnter={() => setShowPinButton(true)}
        onMouseLeave={() => setShowPinButton(false)}
        {...allowedProps}
      >
        { (!pinterestPinButton) && (share || bookmark || saveSocial !== undefined) && (
          <Box className="figure__bookmark p--absolute d--flex t--0 r--0 zi--1">
            {share && (
              <Button onlyIcon size="medium" onClick={handleShare} color="secondary.700" className="bookmark__link">
                <Icon inline color="white" size="medium" prefix="bx" name="share-alt" />
              </Button>
            )}
            {bookmark && (
              <Button onlyIcon size="medium" onClick={handleBookmark} color="main.700" className="bookmark__link">
                <Icon inline color="white" size="medium" prefix={!bookmarked ? 'bx' : 'bxs'} name={!bookmarked ? 'bookmark-plus' : 'bookmark-minus'} />
              </Button>
            )}
            {saveSocial && (
              saveSocial.map((social) => (
                <Button onlyIcon size="medium" key={social} onClick={() => handleSocial(social)} aria-label="Share" color={social} className="bookmark__link">
                  <Icon inline color="white" size="medium" prefix="bxl" name={social} />
                </Button>
              ))
            )}
          </Box>
        )}
        <div
          className={`image__container ${className}`}
          onMouseEnter={() => setShowPinButton(true)}
          onMouseLeave={() => setShowPinButton(false)}
        >
          <Image
            {...figure}
            imageSizeClassName="image__size"
            className={`figure__image ${className} w--100 h--100 d--block p--relative`}
          />
        </div>
        {pinterestPinButton && showPinButton
          && (
            <div
              onMouseEnter={() => setShowPinButton(true)}
            >
              <SocialButton
                clickExtensionRef={imageRef}
                fullRounded
                noBackGroundColor
                socialMediaIconSize="big"
                socialMediaName="pinterest"
                color={`${isDesktop ? 'pinterest' : 'transparent'}`}
                sharingInformation={{
                  title: figure?.alt,
                  description: pinterestPinButton?.sharedDescription,
                  link: absolutUrl,
                  ogImage: figure?.src?.large || figure?.src,
                }}
                className="pin--button"
              />
            </div>
          )}

        {figure.caption && (
          <figcaption className={`ff--sans ${backgroundStyle()} ${colorStyle()} p--normal lh--1-5`}>
            {figure.caption}
          </figcaption>
        )}
      </figure>

      {styles}
      <style jsx global>
        {`
        // common styles
        .is--full-width {
          margin-left: -${theme.spacings.big};
          margin-right: -${theme.spacings.big};
        }

        @media only screen and (max-width: ${theme.medias.tablet}){
          .pin--button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        @media only screen and (min-width: ${theme.medias.tablet}){
          .is--full-width {
            margin-left: 0;
            margin-right: 0;
          }

          .pin--button {
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }

        div[class*="LazyImage"]:hover {
          background: ${showPinButton && pinterestPinButton && !isDesktop && '#000 !important'};
        }
        .image__size > div {
          ${objectFit === 'cover' ? `height: ${coverHeight / 2 || '265'}px;` : ''}
        }

        @media only screen and (min-width: ${theme.medias.mobile}){
          .image__size > div {
            ${objectFit === 'cover' ? `height: ${coverHeight / 1.5 || '385'}px;` : ''}
          }
        }

        @media only screen and (min-width: ${theme.medias.tablet}){
          .image__size > div {
            ${objectFit === 'cover' ? `height: ${coverHeight || '430'}px;` : ''}
          }
        }
      `}
      </style>
    </>
  );
}

ArticleFigure.defaultProps = {
  fullWidth: false,
  pinterestPinButton: null
};

ArticleFigure.propTypes = {
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
    caption: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    loadingType: PropTypes.string,
    lazy: PropTypes.bool,
    layout: PropTypes.string,
    objectFit: PropTypes.string,
    coverHeight: PropTypes.number
  }).isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Indicates whether the image should have the Pinterest pin button
   */
  pinterestPinButton: PropTypes.shape({
    sharedDescription: PropTypes.string
  }),
};

export default ArticleFigure;
