/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Avatar from '../../atoms/Avatar';
import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import { menuAccount } from '../../../../mocks/account';

function MenuAccount({
  menuList, menuState, onContent, controlMenu, userLogged, openAccountMenu, messages, wpIsLogged, lazy, ...props
}) {
  // -- allowedProps
  const propsBlacklist = [
    'openAccountMenu',
    'menuList',
    'menuState',
    'onContent',
    'controlMenu',
    'wpIsLogged',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- data
  const menuListItens = menuList || menuAccount;

  // -- hook
  const { isDesktop } = useDeviceScreen();

  // - theme
  const {
    theme, getColor, colorMode, direction
  } = useTheme();

  // -- scripts
  const colorActive = (currentAlias, type) => {
    let style = '';
    if (menuState === currentAlias) {
      style = 'white';
    } else if (type === 'list') {
      style = 'grey-neutral.500';
    } else {
      style = (colorMode === 'dark' ? 'main.600' : 'main.500');
    }
    return style;
  };

  const colorMenuLink = (mnState, alias) => {
    if (mnState === alias) {
      return (colorMode === 'dark' ? 'bc--main-300' : 'bc--main-300');
    }
    return (colorMode === 'dark' ? 'bc--black' : 'bc--white');
  };

  const handleControlMenu = (val) => {
    if (!onContent) {
      controlMenu(val || '');
    }
  };

  // -- css/styles
  const { className, styles } = css.resolve`
    .account-menu{
      opacity: 0;
      visibility: hidden;
      top: 0px;
      right: -100%;
      width: 280px;
      padding-top: 60px;
      padding-bottom: 56px;
      height: 100%;
      transition: all 500ms ease-in-out;
      margin-top: ${wpIsLogged ? '40px' : '0'};
    }

    .account-menu__content {
      position: fixed;
    }
    .account-menu.open{
      right: 0%;
      opacity: 1;
      visibility: visible;
    }

    .account-menu__list{
      ${onContent ? 'top: 72px;' : ''}
    }
    .account-menu__link {
      transition: background-color 200ms ease;
    }
    .account-menu__text {
      display: inline-block;
      transition: padding 200ms ease;
    }
    .account-menu__item:not(.active):hover .account-menu__link {
      background-color: ${getColor(colorMode === 'dark' ? 'main.100' : 'main.50')};
    }
    .account-menu__item.active:hover .account-menu__link {
      background-color: ${getColor(colorMode === 'dark' ? 'main.500' : 'main.300')};
    }
    .account-menu__item:hover .account-menu__text {
      padding-${onContent ? 'left' : 'right'}: 5px;
    }

    .div--bottom{
      border-bottom: 1px solid ${getColor('grey-neutral.100')}
    }
    .div--top{
      border-top: 1px solid ${getColor('grey-neutral.100')}
    }

    .account-menu__overlay {
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: all 300ms ease;
    }
    .account-menu__overlay.visible {
      opacity: 1;
      visibility: visible;
    }
    @media only screen and (min-width: ${theme.medias.tablet}){
      .account-menu{
        height: auto;
        right: 16px;
        width: 184px;
        transition: all 300ms ease-in-out;
        padding: 0;
        margin-top: 0;
      }
      .account-menu.open{
        top: 0;
        right: 0;
      }
      .account-menu__content {
        position: absolute;
      }
    }
  `;

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
    }
  `;

  const menuRender = () => (
    <List
      className={`account-menu__list ${className} ${mediaStyles.className} mtb--normal c--both p--sticky d--block zi--8`}
      {...allowedProps}
    >
      {menuListItens.map((item) => (
        <li
          key={item.id}
          className={`account-menu__item ${className}${onContent ? ` m${direction === 'rtl' ? 'l' : 'r'}--x-big ` : ''}${item.alias === 'profile-edit' ? 'div--top' : ''}${item.alias === menuState ? ' active' : ''}`}
        >
          <A
            to={item.link}
            title={item.text}
            onClick={() => handleControlMenu()}
            className={`account-menu__link ${className}${onContent ? ' ' : ' fd--row-reverse ta--right '}d--flex ai--center p--normal${onContent ? ' mr--big br--small ' : ' '}${colorMenuLink(menuState, item.alias)}`}
          >
            <Icon name={item.icon} color={colorActive(item.alias, item.type)} />
            <Span className={`account-menu__text ${className} ff--sans mlr--normal`} textColor={colorActive(item.alias, item.type)}>
              {item.text}
            </Span>
          </A>
        </li>
      ))}
      {!onContent && (
        <li
          className={`account-menu__item ${className}${onContent ? ' mr--x-big ' : ' '} div--top`}
        >
          <A
            onClick={() => handleControlMenu('logout')}
            className={`account-menu__link ${className}${onContent ? ' ' : ' fd--row-reverse ta--right '}d--flex ai--center p--big${onContent ? ' mr--big br--small ' : ' '}`}
          >
            <Span className={`account-menu__text ${className} ff--sans mlr--normal`} textColor="main.800">
              Cerrar
            </Span>
          </A>
        </li>
      )}
    </List>
  );

  const userRender = () => (
    <Box className="d--flex ai--center jc--flex-start plr--big">
      <A to="#">
        <Avatar src="/img/example/thumb__default-avatar.png" alt="Phellipe Lins" size="medium" lazy={lazy} className="mr--medium" />
      </A>
      <Span className="ff--sans fs--medium">
        &nbsp;
        {messages.welcome}
        ,
        &nbsp;
        <strong className="c--main-700">
          {messages.userName}
        </strong>
      </Span>
    </Box>
  );

  return (
    <>
      {onContent ? (
        <Box
          type="section"
          className={`account-menu h--100 p--relative zi--7 ${handleCreateStyleClass(props)}`}
          {...allowedProps}
        >
          {menuRender()}
        </Box>
      ) : (
        <>
          <Box className={`account-menu__overlay zi--7 ${className} ${openAccountMenu && !isDesktop ? 'visible' : ''}`}></Box>
          <Box className={`account-menu account-menu__content ${className} ${colorMode === 'dark' ? 'bc--black' : 'bc--white'} bs--small zi--8 ${!isDesktop ? 'o--y-scroll' : ''} ${openAccountMenu ? 'open' : ''} ${handleCreateStyleClass(props)}`}>
            {(userLogged && !isDesktop) && (
              userRender()
            )}
            {menuRender()}
          </Box>
        </>
      )}
      {styles}
    </>
  );
}

MenuAccount.defaultProps = {
  onContent: false,
  userLogged: false,
  lazy: true,
  className: ''
};

MenuAccount.propTypes = {
  /**
   * Informs if the user is logged on WordPress
   */
  wpIsLogged: PropTypes.bool,

  /**
   * Informs if the component is on content, or on header/content
   */
  onContent: PropTypes.bool,

  /**
   * Informs if the component/menu is open
   */
  openAccountMenu: PropTypes.bool,

  /**
   * Set Current label
   */
  menuState: PropTypes.any,

  /**
   * Control the menu
   */
  controlMenu: PropTypes.func,

  /**
   * Inform if the user is logged
   */
  userLogged: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    welcome: PropTypes.string,
    userName: PropTypes.string
  }),

  /**
   * List itens from menu
   */
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      icon: PropTypes.string,
      alias: PropTypes.any,
      link: PropTypes.string,
      type: PropTypes.string
    })
  ),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default MenuAccount;
