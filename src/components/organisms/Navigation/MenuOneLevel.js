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

function MenuOneLevel({
  index, slug, depth, title, messages, categoriesPosts, lengthCategories, onClick
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
      .list__column--level-1 {
        column-count: 1;
      }
      .list__item{
        display: inline-block;
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
    .list__item--level-1 {
      width: 100%;
    }
  `;

  return (
    <>
      <List className={`list__column list__column--level-${depth} ${index === (lengthCategories - 2) ? 'list__column--last' : ''} ${className} ${mediaStyles.className}`}>
        {categoriesPosts && categoriesPosts[slug]?.slice(0, 3).map((childItems) => (
          <li
            key={`${childItems.ID}${childItems.title}`}
            className={`list__item list__item--level-${depth} ${className} ${mediaStyles.className} ptb--small`}
          >
            <A
              to={childItems.permalink}
              textColor="grey-neutral.700"
              hoverColor="main.600"
              className={`list__main-item--level-${depth} fs--normal fw--semibold lh--1-5 ff--sans d--flex ai--center jc--space-between ${className} ${mediaStyles.className}`}
              title={childItems.title}
              onClick={handleClick}
            >
              {childItems.title}
            </A>
          </li>
        ))}
      </List>
      <div
        ref={refListExtended}
        style={{ maxHeight: `${heightSize}` }}
        className={`group-menu__content ${className} ${mediaStyles.className} p--relative o--hidden pb--small fs--medium lh--1-5`}
      >
        <List className={`list__column open-close-list list__column--level-${depth} ${index === (lengthCategories - 2) ? 'list__column--last' : ''} ${className} pb--normal`}>
          {categoriesPosts && categoriesPosts[slug]?.slice(3, 99).map((childItems) => (
            <li
              key={`${childItems.ID}${childItems.title}`}
              className={`list__item list__item--level-${depth} ${className} ${mediaStyles.className} ptb--small`}
            >
              <A
                to={childItems.permalink}
                textColor="grey-neutral.700"
                hoverColor="main.600"
                className={`list__main-item--level-${depth} fs--normal fw--semibold lh--1-5 ff--sans d--flex ai--center jc--space-between ${className} ${mediaStyles.className}`}
                title={childItems.title}
                onClick={handleClick}
              >
                {childItems.title}
              </A>
            </li>
          ))}
        </List>
      </div>
      {categoriesPosts[slug] && (depth === 2 || depth === 1) && Object.getOwnPropertyNames(categoriesPosts[slug]).length > 4 && (
        <Button
          type="button"
          color="transparent"
          size="custom"
          textColor="grey-neutral.500"
          title={title}
          className={`link__more p--0 fs--normal ff--sans fw--semibold d--flex d--none ai--center mb--small ${className} ${mediaStyles.className}`}
          onClick={() => handleToggle(index)}
        >
          {open === 'open' ? messages.seeLess : messages.seeAll}
          <Icon inline size="normal" color="main.600" prefix="bx" name={open === 'open' ? 'chevron-up-circle' : 'chevron-down-circle'} className={`m${direction === 'rtl' ? 'r' : 'l'}--normal`} />
        </Button>
      )}

      {/* styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

MenuOneLevel.propTypes = {
  /**
   * Inform the index of loop
   */
  index: PropTypes.number,

  /**
   * The slug of current category
   */
  slug: PropTypes.string,

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
  categoriesPosts: PropTypes.object,

  /**
   * The length of the main category
   */
  lengthCategories: PropTypes.number,

  /**
   * Function to callback the click and close the Navigation Menu
   */
  onClick: PropTypes.func
};

export default MenuOneLevel;
