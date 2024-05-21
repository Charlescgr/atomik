/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import throttle from '@charlescgr/underline/dist/throttle';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { stringToSlug, handleCreateStyleClass } from '../../_settings/Utils';

import Button from '../../atoms/Button';
import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import { smoothScrollTo } from './smooth-scroll';

function ArticleAnchors({
  data, onContent, target, messages, isMobile, breakPoint, ...props
}) {
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const [showAnchors, setShowAnchors] = useState(false);
  const [closedAndClicked, setClosedAndClicked] = useState(false);
  const [closed, setClosed] = useState(false);
  const wrapperRef = useRef(null);

  const propsBlacklist = [
    'data',
    'breakPoint',
    'onContent',
    'target',
    'messages',
    'isMobile',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  /* ***
  open/close select/box from anchors */
  const handleOpenAnchors = () => {
    const state = closed ? !closedAndClicked : false;
    setClosedAndClicked(state);
    setShowAnchors(!showAnchors);
  };

  useEffect(() => {
    function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }

    const scrollTo = (event, position = 0) => {
      const HEADER_HEIGHT = 70;
      const lastPosition = position;
      let currentPosition;

      event.preventDefault();

      const element = event.target;
      const id = element.getAttribute('href').slice(1);

      let to = document.getElementById(id);

      if (to) {
        to = getOffset(to).top - HEADER_HEIGHT;
        currentPosition = to;
      } else {
        return;
      }

      smoothScrollTo(0, to);

      if (lastPosition !== currentPosition) {
        setTimeout(() => scrollTo(event, currentPosition), 1000);
      }
    };

    const getAnchorReference = () => {
      const references = document.querySelectorAll('a[href^="#"]');
      references.forEach((reference) => {
        reference.addEventListener('click', (event) => scrollTo(event, 0));
      });
    };

    setTimeout(getAnchorReference, 1000);
  }, []);

  useEffect(() => {
    setClosedAndClicked(false);
  }, [closed]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setClosedAndClicked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const ANCHOR_BREAKPOINT = breakPoint || 300;

    const handleMinimize = () => {
      if (target && target.current) {
        const { top: currentPosition } = target.current.getBoundingClientRect();
        setClosed(currentPosition < ANCHOR_BREAKPOINT);
      }
    };

    document.addEventListener('scroll', handleMinimize);

    return () => {
      document.removeEventListener('scroll', handleMinimize);
    };
  }, []);

  useEffect(() => {
    if (!isBrowser()) return;
    const d = document.documentElement;
    const handleScroll = throttle(() => {
      if (isMobile && target) {
        const objectRectAnchor = target.current.getBoundingClientRect();
        const positionAnchorOnScreen = Math.round((objectRectAnchor.top / d.clientHeight) * 100);
        setClosedAndClicked(positionAnchorOnScreen < 45 && positionAnchorOnScreen >= 0);
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /** ***
  functions to change colors */
  const buttonColor = () => {
    let style = '';
    if (!onContent) {
      style = 'transparent';
    } else if (theme.isColorizedMode) {
      style = 'secondary.800';
    } else {
      style = 'main.800';
    }
    return style;
  };
  const buttonBorderColor = () => {
    let style = '';
    if (onContent) {
      style = 'transparent';
    } else if (theme.isColorizedMode) {
      style = 'secondary.700';
    } else {
      style = 'main.50';
    }
    return style;
  };
  const textButtonColor = () => {
    let style = '';
    if (onContent && colorMode === 'dark') {
      style = 'black';
    } else if (onContent || theme.isColorizedMode) {
      style = 'white';
    } else {
      style = 'main.800';
    }
    return style;
  };

  const { className, styles } = css.resolve`
    // general styles
    .article-anchors{
      position: relative;
    }
    .article-anchors__list li{
      background-color: ${getColor('main.50')};
      padding:0 ${theme.spacings.big};
    }
    .article-anchors__list li:nth-child(even){
      background-color: ${getColor('main.100')};
    }
    .article-anchors__list{
      display: none;
    }
    .article-anchors__button{
      ${direction === 'rtl' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
    }
    .article-anchors__button__icon--active{
      transform: rotate(180deg);
    }
    .article-anchors__list--active{
      display: block;
      animation: slide-down .3s ease;
    }
    @keyframes slide-down {
      0% {
        opacity: 0;
        transform: translateY(-16px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    // if is on content
    .on--content{
      margin-left: -${theme.spacings.big};
      margin-right: -${theme.spacings.big};
    }
    .on--content .article-anchors__list{
      animation-name: unset;

      opacity: 1;
      max-height: 500px;
      overflow: hidden;
      height: auto;
    }

    // if is closed
    .is--closed.article-anchors{
      position: fixed;

      transform: translateX(${direction === 'rtl' ? '-100vw' : '100vw'});
      transition-timing-function: ease;
      transition-duration: 0.75s;
      transition-delay: 0.25s;

      width:100vw;

      top:150px;
      animation-delay: 0.25s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
    }
    .is--closed .article-anchors__button--short{
      position: absolute;
      transform: translateX(${direction === 'rtl' ? '50px' : '-50px'});
    }
    .is--closed.on--content .article-anchors__list{
      display: block;
      will-change: max-height;
      transition: max-height .25s ease, opacity .5s ease;
      opacity: 0;
      max-height: 0;
    }

    // if is closed and clicked
    .is--closed.on--content.is--closed-and-clicked.article-anchors{
      transform: translateX(0);
    }
    .is--closed.on--content.is--closed-and-clicked .article-anchors__list{
      display: block;
      opacity: 1;
      max-height: 500px;
      will-change: max-height;
      transition: max-height .25s ease, opacity .5s ease;
    }
  `;

  return (
    <div ref={wrapperRef}>
      <Box
        className={`article-anchors zi--11 ${className} ${onContent ? 'on--content' : ''} ${closed ? 'is--closed' : 'is--open'} ${closedAndClicked ? 'is--closed-and-clicked' : ''} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        {onContent && closed && (
          <Button
            onlyIcon
            rounded
            color="main.300"
            borderColor="transparent"
            textColor={textButtonColor()}
            onClick={handleOpenAnchors}
            className={`article-anchors__button--short ${className} d--flex p--absolute bs--small zi--5`}
          >
            <Icon
              inline
              color={textButtonColor()}
              size="medium"
              prefix="bx"
              name={`chevron-${direction === 'rtl' ? 'right' : 'left'}`}
              className={`article-anchors__button__icon--short ${className}`}
            />
          </Button>
        )}
        <Button
          rounded={!onContent}
          color={buttonColor()}
          borderColor={buttonBorderColor()}
          textColor={textButtonColor()}
          onClick={handleOpenAnchors}
          className={`article-anchors__button ${className} ${onContent ? 'w--100' : ''} d--flex zi--9`}
        >
          <Icon
            inline
            color={textButtonColor()}
            size={onContent ? 'medium' : 'normal'}
            prefix="bx"
            name="chevron-down"
            className={`article-anchors__button__icon${showAnchors || onContent ? '--active' : ''} ${className} m${direction === 'rtl' ? 'l' : 'r'}--normal`}
          />
          <strong>{messages?.anchorsTitle}</strong>
        </Button>
        <List
          className={`article-anchors__list ${showAnchors || (onContent && !closed) ? 'article-anchors__list--active' : ''} ${!onContent ? 'bs--small p--absolute' : 'w--100'} ${className} bc--white zi--8`}
        >
          {data && Object.keys(data)?.map((value) => (
            <li key={data[value].ref} className={`article-anchors__item ${className}`}>
              <A to={`#${stringToSlug(data[value].title)}`} externalLink onClick={handleOpenAnchors} title={data[value].title} textColor="main.800" className={`article-anchors__link ${className} ff--sans d--block lh--1-5 ptb--normal`}>
                {data[value].title}
              </A>
            </li>
          ))}
        </List>
      </Box>

      {/* custom styles */}
      {styles}
    </div>
  );
}

ArticleAnchors.defaultProps = {
  onContent: false,
  breakPoint: 300,
  messages: {
    anchorsTitle: 'En este artículo'
  }
};

ArticleAnchors.propTypes = {
  /**
   * Informs if the component is on content, or on header/other
   */
  onContent: PropTypes.bool,

  /**
   * Point where the component will minimize
   */
  breakPoint: PropTypes.number,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The content to render
   */
  data: PropTypes.any,

  /**
   * The target
   */
  target: PropTypes.any,

  /**
   * If is mobile size
   */
  isMobile: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.object
};

export default ArticleAnchors;
