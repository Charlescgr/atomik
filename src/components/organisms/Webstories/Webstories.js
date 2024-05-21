/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { v4 as uuid } from 'uuid';

import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Iframe from '../../atoms/Iframe';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Container from '../../atoms/Container';
import TitleCustom from '../../molecules/TitleCustom';
import WebstoryItem from '../../molecules/WebstoryItem';

function Webstories({
  stories, messages, loadMoreFn, hadMoreStories, ...props
}) {
  const iframeRef = useRef();
  const [showStory, setShowStory] = useState(false);
  const [currentStory, setCurrentStory] = useState({});

  // -- allowed props
  const propsBlacklist = [
    'stories',
    'messages',
    'className',
    'loadMoreFn'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme
  const { theme, getColor } = useTheme();

  // -- css style
  const { className, styles } = css.resolve`
    .webstories {
      padding-bottom: 0;
      padding-top: ${messages?.title ? '16px' : '12px'};
    }
    .webstories__container {
      overflow-x: auto;
    }
    .webstories__more {
      height: 130px;
      transition: opacity 0.35s ease;
      min-width: 80px;
    }
    .webstories__more:hover {
      opacity: 0.5;
    }
    .webstories__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
      opacity: 1;
      background: rgba(${hexToRgb(getColor('grey-neutral.800'))}, 0.75);
      visibility: visible;
      z-index: 99;
    }

    .header__close {
      margin-top: 8px;
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .webstories__more {
        height: 164px;
        transition: opacity 0.35s ease;
        min-width: 80px;
      }
      .webstories {
        padding-bottom: ${messages?.title ? '16px' : '4px'};
        padding-top: 24px;
      }
    }
  `;

  function addMarginTop(btnShareElement) {
    if (!window) return;

    if (window.matchMedia('(max-width:708px)').matches) {
      btnShareElement.style.marginRight = '40px';
    } else {
      btnShareElement.style.marginRight = '0px';
    }
  }

  function getBtnShareElement() {
    const iframeElement = iframeRef.current;

    if (!iframeElement) return;

    const shadow = iframeElement.contentWindow.document.getElementsByClassName('i-amphtml-system-layer-host')[0].shadowRoot;
    const btnShareElement = shadow.querySelector('.i-amphtml-story-share-control');
    return btnShareElement;
  }

  function inserMarginTopInElement() {
    const btnShareElement = getBtnShareElement();
    addMarginTop(btnShareElement);
    window.addEventListener('resize', () => addMarginTop(btnShareElement));
  }

  const onIframeLoad = () => {
    const iframeElement = iframeRef.current;
    if (!iframeElement) return;
    iframeElement.addEventListener('load', inserMarginTopInElement);
  };

  function handlePageScroll(action = 'remove') {
    const htmlElement = document.getElementsByTagName('html')[0];

    if (typeof htmlElement === 'undefined') return;

    switch (action) {
      case 'remove': {
        htmlElement.style.overflowY = 'hidden';
        break;
      }

      case 'auto': {
        htmlElement.style.overflowY = 'auto';
        break;
      }

      default: {
        htmlElement.style.overflowY = 'auto';
        break;
      }
    }
  }

  function handleEscPress(event) {
    if (event && event.key === 'Escape') {
      setShowStory(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleEscPress);
    }

    handlePageScroll('auto');
    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  const handleCickStoryItem = (storyParam) => {
    setCurrentStory(storyParam);
    setShowStory(true);
    handlePageScroll('remove');
  };

  const handleCloseStory = () => {
    setShowStory(false);
    handlePageScroll('auto');
  };

  return (
    <Box
      className={`webstories ${className} ${handleCreateStyleClass(props)} bc--grey-neutral-50`}
      {...allowedProps}
    >
      {messages?.title && (
        <TitleCustom
          titleIsSpan
          textColor="grey-neutral.500"
          type="h3"
          className={`webstorie__title ${className} mt--small ta--center lh--1-5`}
        >
          {messages.title}
        </TitleCustom>
      )}
      <Container
        wrap
      >
        <Box
          className={`webstories__container ${className} d--flex fd--row pb--big ai--flex-start jc--space-between`}
        >
          {stories.map((story) => (
            <WebstoryItem
              key={uuid()}
              title={story.title}
              figure={story.images}
              thumbnailSrc={story.featured_media?.thumbnail || story.images[0]}
              className="mlr--big"
              permalink={story.permalink}
              onClick={() => handleCickStoryItem(story)}
            />
          ))}
          {hadMoreStories && (
            <Box
              onClick={loadMoreFn}
              className={`webstories__more ${className} mlr--big d--flex ai--center fd--column jc--center`}
            >
              <Icon
                size="x-medium"
                color="main.500"
                name="plus-circle"
                className="mt--big mb--normal"
              />
              <Span
                textColor="main.500"
                className="ff--sans fs--medium fw--bold mt--0 mb--big"
              >
                {messages?.labelMoreStories}
              </Span>
            </Box>
          )}
        </Box>
      </Container>
      {showStory && (
        <>
          <Box
            className={`webstories__overlay ${className}`}
          >
            <Button
              className={`header__close ${className} p--absolute r--0`}
              onClick={handleCloseStory}
              onlyIcon
              onKey
            >
              <Icon name="x" color="white" size="medium" />
            </Button>
            <Iframe
              ref={iframeRef}
              attribs={{
                execOnLoad: onIframeLoad,
                id: 'stories__iframe__container',
                allowFullScreen: true,
                width: '100%',
                height: '100%',
                src: currentStory.permalink,
                // src: 'https://64ce-187-120-156-108.ngrok.io/storiesExample.html',
                title: currentStory.title
              }}
            />
          </Box>
        </>

      )}
      {/* custom styles */}
      {styles}
    </Box>
  );
}

Webstories.defaultProps = {
  messages: {
    title: 'Webstories',
    labelMoreStories: 'Ver más'
  },
  loadMoreFn: () => {}
};

Webstories.propTypes = {

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The list of consults (array of objects)
   */
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      link: PropTypes.string,
      images: PropTypes.string,
      headline: PropTypes.string,
      time: PropTypes.string,
      permalink: PropTypes.string
    })
  ).isRequired,

  /**
   * function to load more stories
   */
  loadMoreFn: PropTypes.func,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    title: PropTypes.string,
    labelMoreStories: PropTypes.string,
  }),

  /**
   * Has more stories content
   */
  hadMoreStories: PropTypes.bool
};

export default Webstories;
