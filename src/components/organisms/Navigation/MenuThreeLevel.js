import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { hexToRgb } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import A from '../../atoms/A';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Button from '../../atoms/Button';

import TitleCustom from '../../molecules/TitleCustom';

function MenuThreeLevel({
  index, depth, title, messages, childrenPosts, lengthCategories, onClick, onClickSubmenu
}) {
  // -- Hooks
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- themes
  const { theme, colorMode, direction } = useTheme();

  // -- vars
  const limitResolution = theme.medias.tablet?.slice(0, -2);

  // -- refs
  let refListExtended;
  let refListSubmenu;
  let statesHeight;
  let statesOpen;
  if (childrenPosts) {
    refListExtended = childrenPosts.reduce((array, value) => {
      array[value.ID] = React.createRef();
      return array;
    }, {});
    refListSubmenu = childrenPosts.reduce((array, value) => {
      array[value.ID] = React.createRef();
      return array;
    }, {});
    statesHeight = childrenPosts.reduce((array, value) => {
      array[value.ID] = '0px';
      return array;
    }, {});
    statesOpen = childrenPosts.reduce((array, value) => {
      array[value.ID] = '';
      return array;
    }, {});
  }

  // -- states
  const [resolution, setResolution] = useState(0);
  const [submenu, setSubmenu] = useState(false);
  const [maxResults, setMaxResults] = useState(3);
  const [runFirstTime, setRunFirstTime] = useState(true);
  const [open, setOpen] = useState(statesOpen);
  const [heightSize, setHeightSize] = useState(statesHeight);

  // -- scripts
  const handleResize = () => {
    setResolution(document.documentElement.clientWidth);
    const results = document.documentElement.clientWidth >= limitResolution ? 3 : 99;
    setMaxResults(results);
  };

  useEffect(() => {
    if (isBrowser) {
      if (runFirstTime) {
        handleResize();
        setRunFirstTime(false);
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => {};
  }, [resolution]);

  // toggle open/close submenu
  const handleToggle = (id) => {
    setOpen({ ...open, [id]: open[id] === '' ? 'open' : '' });
    setHeightSize({ ...heightSize, [id]: open[id] === 'open' ? '0px' : `${refListExtended[id].current.scrollHeight}px` });
  };

  const handleClick = () => {
    // callback to Header component, and set the state openMenu to false
    onClick(false);
  };

  const handleSubmenu = (event, id) => {
    const ref = refListSubmenu[id].current;
    if (!isDesktop) {
      event.preventDefault();
      onClickSubmenu(!submenu);
      setSubmenu(!submenu);
      if (submenu) {
        setTimeout(() => {
          ref.classList.remove('opened');
        }, 450);
      } else {
        ref.classList.add('opened');
      }
    }
  };

  const checkDarkMode = () => (colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      // -- 3 levels
      .list__column--level-3 {
        flex-flow: wrap row;
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 48px;
      }
      .list__item--level-3 {
        flex: 0 1 29%;
        padding: 4px 0 4px 0;
      }
      .list__main-item--level-3 {
        font-size: ${theme.fontSizes.medium};
      }
      .list__main-item--level-3 .iconify {
        display: none;
      }
      .box__sub-menu{
        display:block;
        position: relative;
        top: initial;
        width: 100%;
        right: initial;
      }
      .title__sub-menu{
        display:none;
      }
      .list__sub-menu{
        margin:0;
      }
      .link__more {
        overflow-anchor: none;
        display: flex;
      }
      .legal-links--level-3 {
        gap: 0;
        display: block;
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

    // -- 3 levels
    .list__item--level-3 {
      padding: 4px 0;
    }
    .box__sub-menu{
      display:none;
      position: absolute;
      top: 16px;
      width: calc(100% - 32px);
      right: calc(-100% + 16px);
    }
    .box__sub-menu.opened{
      display:block;
    }
  `;

  return (
    <>
      <List className={`list__column list__column--level-${depth} ${index === (lengthCategories - 2) ? 'list__column--last' : ''} ${className} ${mediaStyles.className}`}>
        {childrenPosts && childrenPosts?.slice(0, 6).map((childItems) => (
          <li
            key={`${childItems.ID}${childItems.title}`}
            className={`list__item list__item--level-${depth} ${className} ${mediaStyles.className}`}
          >
            <A
              to={childItems.type === 'custom' ? childItems.link : childItems.permalink}
              externalLink={childItems.type !== 'taxonomy' && childItems.type !== 'category'}
              textColor={!isDesktop ? 'grey-neutral.700' : 'main.800'}
              hoverColor="main.600"
              className={`list__main-item--level-${depth} fs--normal fw--semibold lh--1-5 ff--sans d--flex ai--center jc--space-between ${className} ${mediaStyles.className}`}
              title={childItems.title}
              onClick={(e) => handleSubmenu(e, childItems.ID)}
            >
              {childItems.title}
              <Icon
                inline
                size="normal"
                color="main.800"
                prefix="bx"
                name="right-arrow-alt"
                className={`${className} ${mediaStyles.className}`}
              />
            </A>
            <div ref={refListSubmenu[childItems.ID]} className={`box__sub-menu ${className} ${mediaStyles.className}`}>
              <TitleCustom titleIsSpan type="h3" textColor="main.800" lineColor="main.800" lineType="dashed" className={`title__sub-menu ${className} ${mediaStyles.className} pb--normal d--flex ai--center`}>
                <A to={childItems.type === 'custom' ? childItems.link : childItems.permalink} textColor="main.800" hoverColor="main.600" onClick={(e) => handleSubmenu(e, childItems.ID)} title={childItems.title} className="d--flex pt--small">
                  <Icon inline size="medium" color="main.800" prefix="bx" name="left-arrow-alt" className={`${className} ${mediaStyles.className}`} />
                </A>
                {childItems.title}
              </TitleCustom>
              <List className={`list__sub-menu ${className} ${mediaStyles.className} mlr--normal`}>
                { childItems.children && childItems.children?.slice(0, maxResults).map((cItems) => (
                  <li key={cItems.ID} className="ptb--small">
                    <A
                      to={cItems.type === 'custom' ? cItems.link : cItems.permalink}
                      externalLink={cItems.type !== 'taxonomy'}
                      textColor="grey-neutral.700"
                      hoverColor="main.600"
                      className={`fs--normal ${!isDesktop ? 'fw--semibold' : ''} lh--1-5 ff--sans`}
                      title={cItems.title}
                      onClick={handleClick}
                    >
                      {cItems.title}
                    </A>
                  </li>
                ))}
              </List>
              {childItems.children && childItems.children.length > 3 && resolution >= limitResolution && (
                <>
                  <div
                    ref={refListExtended[childItems.ID]}
                    style={{ maxHeight: `${heightSize[childItems.ID]}` }}
                    className={`group-menu__content content__${childItems.ID} ${className} ${mediaStyles.className} p--relative o--hidden c--main-800 pb--normal fs--medium lh--1-5`}
                  >
                    <List className={`list__sub-menu open-close-list ${className} ${mediaStyles.className} mlr--normal`}>
                      { childItems.children && childItems.children?.slice(maxResults, childItems.children?.length).map((cItems) => (
                        <li key={cItems.ID} className="ptb--small">
                          <A
                            to={cItems.type === 'custom' ? cItems.link : cItems.permalink}
                            externalLink={cItems.type !== 'taxonomy'}
                            textColor="grey-neutral.700"
                            hoverColor="main.600"
                            className={`fs--normal lh--1-5 ${!isDesktop ? 'fw--semibold' : ''} ff--sans`}
                            title={cItems.title}
                            onClick={handleClick}
                          >
                            {cItems.title}
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
                    onClick={() => handleToggle(childItems.ID)}
                  >
                    {open[childItems.ID] === 'open' ? messages.seeLess : messages.seeAll}
                    <Icon inline size="normal" color="main.600" prefix="bx" name={open[childItems.ID] === 'open' ? 'chevron-up-circle' : 'chevron-down-circle'} className={`m${direction === 'rtl' ? 'r' : 'l'}--normal`} />
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </List>
      {/* styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

MenuThreeLevel.propTypes = {
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
  onClick: PropTypes.func,

  /**
   * Function to callback the click on submenu
   */
  onClickSubmenu: PropTypes.func
};

export default MenuThreeLevel;
