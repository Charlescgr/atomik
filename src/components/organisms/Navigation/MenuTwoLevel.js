import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { hexToRgb } from '../../_settings/Utils';

import A from '../../atoms/A';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Button from '../../atoms/Button';

function MenuTwoLevel({
  index, depth, title, messages, childrenPosts, lengthCategories, onClick
}) {
  // -- states
  const [open, setOpen] = useState('');
  const [heightSize, setHeightSize] = useState('0px');

  // -- themes
  const { theme, colorMode, direction } = useTheme();
  const isAmp = useAmp();

  // -- refs
  const refListExtended = useRef(null);

  // -- scripts
  // toggle open/close submenu
  const handleToggle = () => {
    setOpen(open === '' ? 'open' : '');
    setHeightSize(open === 'open' ? '0px' : `${refListExtended.current.scrollHeight}px`);
  };
  const handleClick = () => {
    // callback to Header component, and set the state openMenu to false
    onClick(false);
  };

  const checkDarkMode = () => (colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .list__column--level-2 {
        column-count: 2;
      }
    }
  `;

  // -- styles / css
  const { className, styles } = css.resolve`
    .group-menu__content{
      transition: max-height 0.5s ease 0s;
    }
    .open-close-list:after{
      content:'';
      background-image: linear-gradient(180deg, rgba(${hexToRgb(checkDarkMode())}, 0), rgba(${hexToRgb(checkDarkMode())}, 1) 80%);
      padding: 25px 0 0 0;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 4;
      width: 100%;
      transition: all 1s ease 0s;
    }
    .link__more {
      overflow-anchor: none;
      display: flex;
    }
    .list__item{
      height: 35px;
    }
    .list__item a{
      height: 35px;
    }
  `;

  return (
    <>
      <List className={`list__column list__column--level-${depth} ${index === (lengthCategories - 2) ? 'list__column--last' : ''} ${className} ${mediaStyles.className}`}>
        {childrenPosts && childrenPosts?.slice(0, 6).map((childItems) => (
          <li
            key={`${childItems.ID}${childItems.title}`}
            className={`list__item list__item--level-${depth} ${className} ${mediaStyles.className} d--inline-block w--100`}
          >
            <A
              to={childItems.type === 'custom' ? childItems.link : childItems.permalink}
              externalLink={childItems.type !== 'taxonomy'}
              textColor="grey-neutral.700"
              hoverColor="main.600"
              className={`fs--normal lh--1-3 fw--semibold  ff--sans ${className} ${mediaStyles.className} d--flex ai--center`}
              title={childItems.title}
              onClick={handleClick}
            >
              {childItems.title}
            </A>
          </li>
        ))}
      </List>
      {childrenPosts && (depth === 2 || depth === 1) && childrenPosts.length > 6 && (
        <>
          <div
            ref={refListExtended}
            style={{ maxHeight: `${heightSize}` }}
            className={`group-menu__content ${className} ${mediaStyles.className} p--relative o--hidden pb--small fs--medium lh--1-5`}
          >
            <List className={`list__column open-close-list list__column--level-${depth} ${index === (lengthCategories - 2) ? 'list__column--last' : ''} ${className} pb--normal`}>
              {childrenPosts && childrenPosts?.slice(6, 99).map((childItems) => (
                <li
                  key={`${childItems.ID}${childItems.title}`}
                  className={`list__item list__item--level-${depth} ${className} ${mediaStyles.className} d--inline-block w--100`}
                >
                  <A
                    to={childItems.type === 'custom' ? childItems.link : childItems.permalink}
                    externalLink={childItems.type !== 'taxonomy'}
                    textColor="grey-neutral.700"
                    hoverColor="main.600"
                    className={`fs--normal lh--1-1 fw--semibold ff--sans ${className} ${mediaStyles.className} d--flex ai--center`}
                    title={childItems.title}
                    onClick={handleClick}
                  >
                    {childItems.title}
                  </A>
                </li>
              ))}
            </List>
          </div>
          <Button
            type="button"
            color="transparent"
            size="custom"
            textColor="grey-neutral.500"
            title={title}
            className={`link__more p--0 fs--normal ff--sans fw--semibold d--flex d--none ai--center ${className} ${mediaStyles.className}`}
            onClick={() => handleToggle(index)}
          >
            {open === 'open' ? messages.seeLess : messages.seeAll}
            <Icon inline size="normal" color="main.600" prefix="bx" name={open === 'open' ? 'chevron-up-circle' : 'chevron-down-circle'} className={`m${direction === 'rtl' ? 'r' : 'l'}--normal`} />
          </Button>
        </>
      )}

      {/* styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

MenuTwoLevel.propTypes = {
  /**
   * Inform the index of loop
   */
  index: PropTypes.number,

  /**
   * Inform depth of menu
   */
  depth: PropTypes.number,

  /**
   * The title of the menu, to use together with See More button
   */
  title: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    seeMore: PropTypes.string,
    seeLess: PropTypes.string,
    seeAll: PropTypes.string
  }),

  /**
   * The category children object, with posts
   */
  childrenPosts: PropTypes.array,

  /**
   * The length of the main category
   */
  lengthCategories: PropTypes.number,

  /**
   * Function to callback the click and close the Navigation Menu
   */
  onClick: PropTypes.func
};

export default MenuTwoLevel;
