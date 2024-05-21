import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Button from '../../atoms/Button';

/* *************************
TODO:
build component like this https://jonsuh.com/hamburgers/
************************* */

function MenuIcon({ clicked, ariaLabel, ...props }) {
  const { theme, getColor } = useTheme();

  const propsBlacklist = [
    'clicked',
    'ariaLabel',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const isAmp = useAmp();

  const { className, styles } = css.resolve`
    .nav__line {
      width: 25px;
      height: 2px;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        opacity 0.55s ease;
    }
    .nav__hamburger {
      flex-direction: column;
      width: 42px;
      height: 16px;
      justify-content: space-between;
    }
    .nav__hamburger:hover .nav__line {
      ${!theme.isColorizedMode ? `background-color: ${getColor('secondary.700')};` : ''}
    }
    .nav__hamburger .nav__line:first-child {
      transform-origin: 0% 0%;
    }
    .nav__hamburger .nav__line:nth-last-child(2) {
      transform-origin: 0% 100%;
    }
    .is--active .nav__line {
      opacity: 1;
      transform: rotate(47deg) translate(-2px, -4px);
    }
    .is--active .nav__line:nth-child(2) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    .is--active .nav__line:nth-child(3) {
      transform: rotate(-45deg) translate(0px, -2px);
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .nav__hamburger {
        height: 24px;
      }
      .nav__line {
        width: 38px;
        height: 19%;
        border-radius: 1.5px;
      }
      .nav__hamburger .nav__line:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
      .is--active .nav__line {
        opacity: 1;
        transform: rotate(45deg) translate(2px,-8px);
        -moz-transform: rotate(45deg) translate(0,-8px);
      }
      .is--active .nav__line:nth-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      .is--active .nav__line:nth-child(3) {
        transform: rotate(-45deg) translate(0px,3px);
        -moz-transform: rotate(-45deg) translate(1px,1px);
      }
    }
  `;

  const mediaStyles = css.resolve``;

  return (
    <>
      <Button
        id="navHamburger"
        className={`nav__hamburger ${className} ${mediaStyles.className} d--flex ${clicked ? 'is--active' : ''} ${handleCreateStyleClass(props)} zi--10 d--block o--none c--pointer b--none p--relative bc--transparent p--0`}
        textColor="transparent"
        color="transparent"
        type="button"
        size="custom"
        on="tap:navHamburger.toggleClass(class='is--active'),body.toggleClass(class='navigation-open'),navigation.toggleClass(class='d--none')"
        aria-label={ariaLabel}
        {...allowedProps}
      >
        <span className={`${className} ${mediaStyles.className} nav__line p--relative d--block ${!theme.isColorizedMode ? 'bc--main-800' : 'bc--white'}`}></span>
        <span className={`${className} ${mediaStyles.className} nav__line p--relative d--block ${!theme.isColorizedMode ? 'bc--main-800' : 'bc--white'}`}></span>
        <span className={`${className} ${mediaStyles.className} nav__line p--relative d--block ${!theme.isColorizedMode ? 'bc--main-800' : 'bc--white'}`}></span>
      </Button>

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

MenuIcon.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Informs if the navigation was opened, or if the click came from another button.
   */
  clicked: PropTypes.bool,

  /**
   * Function control click from header.
   */
  onClick: PropTypes.func,

  /**
   * The aria-Label prop
   */

  ariaLabel: PropTypes.string
};

export default MenuIcon;
