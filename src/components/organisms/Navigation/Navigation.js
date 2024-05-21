/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */
import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import { useAmp } from 'next/amp';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import InputField from '../../atoms/InputField';

import LegalItems from '../../molecules/LegalItems';
import TendenciesItems from '../../molecules/TendenciesItems';
import SocialLinks from '../../molecules/SocialLinks';
import TitleCustom from '../../molecules/TitleCustom';

import Container from '../../atoms/Container';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import MenuOneLevel from './MenuOneLevel';
import MenuTwoLevel from './MenuTwoLevel';
import MenuThreeLevel from './MenuThreeLevel';

/*
* Function to calculate the categories' depth
*/
const depthOf = (arr) => {
  let level = 1;

  arr.forEach((object) => {
    Object.keys(object).forEach((key) => {
      if (key === 'children' && object[key] !== null) {
        const depth = depthOf(object[key]) + 1;
        level = Math.max(depth, level);
      }
    });
  });

  return level;
};

function Navigation({
  openMenu, menus, socialLinks, legalLinks, click, classNameNav, placeholderSearchInput, basePath, messages, openWithFocusOnSearch, wpIsLogged, ...props
}) {
  // -- states
  const [query, setQuery] = useState('');
  const [resolution, setResolution] = useState(0);
  const [runFirstTime, setRunFirstTime] = useState(true);
  const [submenuThirdLevel, setSubmenuThirdLevel] = useState(false);

  // -- themes
  const {
    theme, getColor, publicUrl, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  // -- hook
  const { isDesktop } = useDeviceScreen();
  const router = useRouter();

  // -- content
  const {
    extraLinks = [],
    tendencies,
    categories = [],
    lastPostsCategory
  } = menus || {};

  const categoriesLevel = depthOf(categories);
  const lengthCategories = categories.length;

  let linksFirstPart = categories;
  let linksSecondPart = extraLinks;
  if ((categoriesLevel === 2 || categoriesLevel === 1) && extraLinks?.length === 0) {
    linksFirstPart = categories?.slice(0, (categories.length / 2) + 1);
    linksSecondPart = categories?.slice((categories.length / 2) + 1, categories.length);
  }

  // -- refs
  const refNavigation = useRef(null);

  // -- allowedProps
  const propsBlacklist = [
    'openMenu',
    'menus',
    'socialLinks',
    'legalLinks',
    'click',
    'classNameNav',
    'placeholderSearchInput',
    'basePath',
    'messages',
    'openWithFocusOnSearch',
    'wpIsLogged',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleResize = () => {
    if (!isBrowser) return;
    setResolution(document.documentElement.clientWidth);
  };

  const refSearch = useCallback((inputElement) => {
    if (inputElement && openWithFocusOnSearch) {
      inputElement.focus();
    }
  }, []);

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

  const handleClick = () => {
    // callback to Header component, and set the state openMenu to false
    click(false);
  };

  const handleClickSubmenu = () => {
    // called just on submeno from third level
    setSubmenuThirdLevel(!submenuThirdLevel);
    refNavigation.current.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query && query.length > 0) {
      router.push(`${basePath.replace(publicUrl, '')}s?s=${query}`);
      click(false);
    }
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .navigation {
        top: ${wpIsLogged ? '114px' : theme.sizes['8']};
        height: calc(100vh - ${wpIsLogged ? '114px' : theme.sizes['8']});
      }

      // -- 3 levels
      .divider--level-3 {
        display: none;
      }

      // -- 2 levels
      .title--level-2 {
        margin-bottom: 4px;
      }
      .column--A {
        padding${direction === 'rtl' ? '-left' : '-right'}: ${theme.sizes['5']};
      }
      .column--B {
        padding${direction === 'rtl' ? '-right' : '-left'}: ${theme.sizes['5']};
      }
      .divider--level-2 {
        margin-top: ${theme.spacings['x-big']};
        margin-bottom: ${theme.spacings['x-big']};
      }

      // -- 1 and 2 levels
      .legal-links--level-1,
      .legal-links--level-2 {
        column-count: 1;
        text-align: ${direction === 'rtl' ? 'right' : 'left'};
      }
      :global(.legal-links--level-1 .legal-links__item),
      :global(.legal-links--level-2 .legal-links__item){
        display: block;
        margin-left:${theme.spacings.small};
        margin-right:${theme.spacings.small};
      }
    }
  `;

  // -- styles / css
  const { className, styles } = css.resolve`
    .search__wrapper__input {
      border-color: ${getColor('grey-neutral.200')};
      padding${direction === 'rtl' ? '-left' : '-right'}: ${theme.sizes['8']};
    }
    .search__button {
      top: 6px;
      bottom: 6px;
      ${direction === 'rtl' ? 'left' : 'right'}: 6px;
    }
    .divider {
      margin-top: ${theme.spacings.big};
      margin-bottom: ${theme.spacings.big};
    }
    .navigation.fade{
      animation-duration: 0.75s;
    }
    .navigation {
      top: ${wpIsLogged ? '98px' : theme.sizes['6']};
      overflow: auto;
      height: calc(100vh - ${wpIsLogged ? '98px' : theme.sizes['6']});
      background-color: ${colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white};
    }

    .legal-links {
      margin-bottom: 24px;
      text-align: center;
    }
    .legal-links__item{
      margin-left:${theme.spacings['x-big']};
      margin-right:${theme.spacings['x-big']};
      display: inline-block
    }

    // -- 3 levels
    .navigation__content {
      position:absolute;
      width:100%;
      transition: transform 0.5s ease-in;
      will-change: transform;
    }
    .navigation__content.opened {
      transform: translateX(-100%);
      transition: transform 0.5s ease-in;
      will-change: transform;
    }
  `;

  return (
    <>
      <nav
        id="navigation"
        ref={refNavigation}
        role="navigation"
        className={`navigation ${className} ${mediaStyles.className} ${handleCreateStyleClass({ ...props, className: classNameNav })} fade p--fixed l--0 zi--9 w--100`}
        {...allowedProps}
      >
        <Box className={`navigation__content ${className} ${mediaStyles.className} ${submenuThirdLevel ? 'opened' : ''} p--big`}>
          <Container wrap>

            <Row>
              <Col colSize="12">

                <Box
                  className={`search__wrapper ${className} ${mediaStyles.className} p--relative br--small mt--normal mb--medium`}
                >
                  <form className="search" action={`${basePath.replace(publicUrl, '')}s`} method="get" target="_top">
                    <InputField
                      textColor="grey-cold.500"
                      type="search"
                      name="s"
                      id="search"
                      value={query}
                      className={`search__wrapper__input ${className} ${mediaStyles.className} bc--transparent `}
                      placeholder={placeholderSearchInput}
                      size="big"
                      full
                      onChange={(v) => setQuery(v)}
                      required
                      setRef={refSearch}
                    />
                    <Button
                      type="submit"
                      color="main.600"
                      textColor="white"
                      rounded
                      onlyIcon
                      className={`search__button p--absolute ${className} ${mediaStyles.className}`}
                      onClick={handleSearch}
                    >
                      <Icon size="normal" prefix="bx" color="white" name="search-alt" />
                    </Button>
                  </form>
                </Box>

              </Col>
              { tendencies && (
                <Col colSize="12">

                  <TendenciesItems
                    tendenciesList={tendencies}
                    className="mt--big"
                  />

                </Col>
              )}
              <Col colSize={categoriesLevel === 3 ? '12' : '6'} className={`${className} ${mediaStyles.className} ${categoriesLevel !== 3 && ('column--A')} ${isDesktop ? ' pb--big' : ''}`}>

                {linksFirstPart.map(({
                  ID, type, link, permalink, title, children, slug
                }, index) => (
                  <React.Fragment key={`${ID}${title}`}>
                    <TitleCustom titleIsSpan type="h3" textColor="main.800" lineColor="grey-neutral.100" lineType={`${children || lastPostsCategory || isDesktop ? 'solid' : 'transparent'}`} className={`title--level-${categoriesLevel} mt--x-medium ptb--normal ${className} ${mediaStyles.className}`} onClick={handleClick}>
                      <A to={type === 'custom' ? link : permalink} externalLink={type !== 'taxonomy'} textColor="main.800" title={title}>{title}</A>
                    </TitleCustom>

                    {categoriesLevel === 1
                      ? (
                        <MenuOneLevel
                          index={index}
                          slug={slug}
                          depth={categoriesLevel}
                          title={title}
                          messages={messages}
                          categoriesPosts={lastPostsCategory}
                          lengthCategories={lengthCategories}
                          onClick={(e) => handleClick(e)}
                        />
                      )
                      : categoriesLevel === 2
                        ? (
                          <MenuTwoLevel
                            index={index}
                            depth={categoriesLevel}
                            title={title}
                            messages={messages}
                            childrenPosts={children}
                            lengthCategories={lengthCategories}
                            onClick={(e) => handleClick(e)}
                          />
                        ) : (
                          <MenuThreeLevel
                            index={index}
                            depth={categoriesLevel}
                            messages={messages}
                            childrenPosts={children}
                            lengthCategories={lengthCategories}
                            onClick={(e) => handleClick(e)}
                            onClickSubmenu={(e) => handleClickSubmenu(e)}
                          />
                        )}
                  </React.Fragment>
                ))}

              </Col>
              <Col colSize={categoriesLevel === 3 ? '12' : '6'} className={`${className} ${categoriesLevel !== 3 && ('column--A')} ${isDesktop ? ' pb--big' : ''}`}>

                {(categoriesLevel !== 3) && (
                  linksSecondPart.map(({
                    ID, type, link, title, icon, permalink, children, slug
                  }, index) => (
                    <React.Fragment key={`${ID}${title}`}>
                      <TitleCustom titleIsSpan type="h3" textColor="main.800" lineColor="grey-neutral.100" lineType="solid" className={`mt--x-medium ptb--normal ${children || lastPostsCategory ? '' : 'mb--x-big'} ${className} ${mediaStyles.className}`}>
                        {icon && (
                          <Icon inline size="normal" color="grey-neutral.300" prefix="bxs" name={icon} className="mr--normal" />
                        )}
                        <A to={type === 'custom' ? link : permalink} externalLink={type !== 'taxonomy'} target={type !== 'taxonomy' ? '_blank' : '_self'} textColor="main.800" title={title} onClick={handleClick}>{title}</A>
                      </TitleCustom>

                      {categoriesLevel === 1
                        ? (
                          <MenuOneLevel
                            index={index}
                            slug={slug}
                            depth={categoriesLevel}
                            title={title}
                            messages={messages}
                            categoriesPosts={lastPostsCategory}
                            lengthCategories={lengthCategories}
                            onClick={(e) => handleClick(e)}
                          />
                        )
                        : categoriesLevel === 2
                          ? (
                            <MenuTwoLevel
                              index={index}
                              depth={categoriesLevel}
                              title={title}
                              messages={messages}
                              childrenPosts={children}
                              lengthCategories={lengthCategories}
                              onClick={(e) => handleClick(e)}
                            />
                          ) : (
                            <MenuThreeLevel
                              index={index}
                              depth={categoriesLevel}
                              messages={messages}
                              childrenPosts={children}
                              lengthCategories={lengthCategories}
                              onClick={(e) => handleClick(e)}
                              onClickSubmenu={(e) => handleClickSubmenu(e)}
                            />
                          )}
                    </React.Fragment>
                  ))
                )}

                <Divider color="grey-neutral.100" className={`${categoriesLevel !== 3 && (`divider--level-${categoriesLevel}`)} ${className} ${mediaStyles.className}`} />

                <SocialLinks
                  links={socialLinks}
                  iconColor="grey-neutral.300"
                  className="d--flex jc--center mtb--big"
                />

                <Divider color="grey-neutral.100" className={`${categoriesLevel !== 3 && (`divider--level-${categoriesLevel}`)} ${className} ${mediaStyles.className}`} />

                <LegalItems
                  className={`list__column legal-links--level-${categoriesLevel} ${className} ${mediaStyles.className}`}
                  legalLinks={legalLinks}
                  textColor="main.800"
                />

              </Col>
            </Row>

          </Container>
        </Box>

      </nav>

      {/* styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
        body.navigation-open{
          overflow: hidden;
        }
        body.navigation-open .reading-bar{
          display: none;
        }
      `}
      </style>
    </>
  );
}

Navigation.defaultProps = {
  wpIsLogged: false,
  basePath: '/'
};

Navigation.propTypes = {
  /**
   * Informs if the user is logged on WordPress
   */
  wpIsLogged: PropTypes.bool,

  /**
   * Inform if the menu should be open or closed
   */
  openMenu: PropTypes.bool,

  /**
   * Items for tendency and Menu Items
   */
  menus: PropTypes.object,

  /**
   * List of legal links and pages links from the site
   */
  legalLinks: PropTypes.array,

  /**
   * List of articles by category
   */
  lastPostsCategory: PropTypes.object,

  /**
   * List of social medias from the site
   */
  socialLinks: PropTypes.array,

  /**
   * Callback function
   */
  click: PropTypes.func,

  /**
   * The custom classname prop.
   */
  classNameNav: PropTypes.string,

  /**
   * Path for home page
   */
  basePath: PropTypes.string,

  /**
   * The placeholder for search input prop.
   */
  placeholderSearchInput: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    seeMore: PropTypes.string,
    seeLess: PropTypes.string,
    seeAll: PropTypes.string
  }),

  /**
   * Search Input has focus or not
   */
  openWithFocusOnSearch: PropTypes.bool
};

export default Navigation;
