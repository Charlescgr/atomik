import React, { useState, useEffect } from 'react';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

function WebstoryContent({
  title,
  images,
  isOpen,
  permalink,
  headline,
  time,
  closeStory,
  messages,
  ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'id',
    'title',
    'permalink',
    'headline',
    'time',
    'images',
    'config',
    'isOpen',
    'closeStory',
    'className',
    'messages',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme
  const { theme, cdnPath, locale } = useTheme();

  // -- states
  const [showStory, setShowStory] = useState(false);
  const srcLogo = `${cdnPath}themes/${theme.base}/logo__icon--reverse.svg`;
  // -- functions
  useEffect(() => {
    setShowStory(isOpen);
    return () => {};
  }, [isOpen]);

  // -- styles
  const { className, styles } = css.resolve`
    .webstory__header {
      height: 40px;
      background-color: #666;
      z-index: 13;
      top: -40px;
    }
    .header__close {
      top: -4px;
    }
    .webstory__content {
      align-content: end;
      grid-gap: 8px;
    }
    .webstory__highlight {
      width: auto;
      font-size: ${theme.fontSizes.big};
    }
    .webstory__headline {
      font-size: ${theme.fontSizes.medium};
      margin-bottom: 22px;
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .webstory__headline {
        font-size: ${theme.fontSizes['x-medium']};
      }
    }
  `;

  return (
    <Box
      className={`webstory-content ${className} ${
        showStory ? 'd--block' : 'd--none'
      } ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box
        className={`webstory__header ${className} p--relative d--flex ai--center w--100`}
      >
        <Button
          className={`header__close ${className} p--absolute r--0`}
          onClick={closeStory}
          onlyIcon
        >
          <Icon name="x" color="white" size="medium" />
        </Button>
      </Box>
      <amp-story
        standalone
        title={title}
        publisher={theme.name}
        publisher-logo-src={`${cdnPath}themes/${theme.base}/${locale}/logo.svg`}
        poster-portrait-src={`${cdnPath}themes/${theme.base}/${locale}/logo.svg`}
        class={`webstory__story ${className} zi--12`}
      >
        {images.map((item, index) => (
          <amp-story-page id={index} key={uuid()} auto-advance-after={time}>
            <amp-story-grid-layer template="fill">
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={item}
                  width="720"
                  height="1280"
                  layout="responsive"
                >
                </amp-img>
              </amp-story-grid-layer>
              <amp-story-grid-layer
                template="vertical"
                class={`webstory__content ${className}`}
              >
                <amp-img
                  src={srcLogo}
                  width="48"
                  height="48"
                >
                </amp-img>
                <Span
                  textColor="white"
                  color="main.700"
                  className={`webstory__highlight ${className} ff--sans d--inline p--normal`}
                  animate-in="fade-in"
                  animate-in-duration="1.5s"
                >
                  <A
                    to={permalink}
                    textColor="white"
                    externalLink={false}
                    target="_self"
                  >
                    {title}
                  </A>
                </Span>
                <Span
                  textColor="grey-neutral.700"
                  color="white"
                  className={`webstory__headline ${className} ff--sans d--inline p--normal`}
                  animate-in="fly-in-bottom"
                >
                  <A
                    to={permalink}
                    textColor="grey-neutral.700"
                    externalLink={false}
                    target="_self"
                  >
                    {headline}
                    {' '}
                    <Span textColor="main.500" className="fw--bold fs--normal">
                      {messages.labelReadMore}
                    </Span>
                  </A>
                </Span>
              </amp-story-grid-layer>
            </amp-story-grid-layer>
          </amp-story-page>
        ))}
      </amp-story>
      {/* common and custom styles */}
      {styles}
      <style jsx global>
        {`
          :root:not(.i-amphtml-story-vertical) amp-story {
            //top: 52px;
          }
          [template="vertical"] {
            height: calc(100% - 52px) !important;
          }
          amp-story-grid-layer.webstory__content amp-img {
            position: absolute;
            top: 20px;
            left: 10px;
          }
        `}
      </style>
    </Box>
  );
}

WebstoryContent.defaultProps = {
  isOpen: false,
  config: {
    wpIsLogged: false,
    hasProgress: false,
  },
  time: '7s',
};

WebstoryContent.propTypes = {
  /**
   * The custom configuration of the page wrapper.
   */
  config: PropTypes.shape({
    wpIsLogged: PropTypes.bool, // Informs if the user is logged on WordPress
    hasProgress: PropTypes.bool, // Informs if the pague has <ReadingBar /> progress
  }),

  /**
   * The id from the storie
   */
  id: PropTypes.string,

  /**
   * The title for the item
   */
  title: PropTypes.string.isRequired,

  /**
   * The description from story
   */
  headline: PropTypes.string,

  /**
   * The time in segunds for autoplay
   */
  time: PropTypes.string,

  /**
   * The image/thumb
   */
  images: PropTypes.array,

  /**
   * The link for the article related with the story
   */
  permalink: PropTypes.string,

  /**
   * Informs if the Story is loading open or not
   */
  isOpen: PropTypes.bool,

  /**
   * Function to return state close
   */
  closeStory: PropTypes.func,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    title: PropTypes.string,
    labelMoreStories: PropTypes.string,
    labelReadMore: PropTypes.string,
  })
};

export default WebstoryContent;
