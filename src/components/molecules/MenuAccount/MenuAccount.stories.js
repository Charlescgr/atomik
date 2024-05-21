/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import MenuAccount from './MenuAccount';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';

import { menuAccount } from '../../../../mocks/account';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

export default {
  title: 'Components/Molecules/MenuAccount',
  component: MenuAccount,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

const messages = {
  modalAuth: {
    welcome: 'Hola',
    userName: 'Henrique'
  }
};

export const OnHeader = () => {
  const {
    theme, changeUserLogged
  } = useTheme();
  const userLogged = true;
  const { isDesktop } = useDeviceScreen();
  const [menuState, setMenuState] = useState();
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const handleToggleMenuAccount = (action) => {
    setOpenAccountMenu(false);
    if (action === 'logout') {
      changeUserLogged(false);
    }
  };
  const handleClickAccount = () => {
    if (userLogged) {
      setOpenAccountMenu(!openAccountMenu);
    }
  };
  return (
    <div className="d--flex jc--flex-end">
      <Button onlyIcon={(userLogged && !isDesktop) || !userLogged} hasIcon={userLogged && isDesktop} className="menu-user" aria-label={messages.userButtonAriaLabel} onClick={handleClickAccount}>
        <Icon inline name={`user${userLogged ? '-detail' : '-circle'}`} prefix={`bx${userLogged ? 's' : ''}`} size="normal" color={theme.isColorizedMode ? 'white' : 'main.800'} />
        {(userLogged && isDesktop) && (
          <Span>
            &nbsp;
            {messages.modalAuth?.welcome}
            ,
            &nbsp;
            <strong className="c--main-700">
              {messages.modalAuth?.userName}
            </strong>
          </Span>
        )}
      </Button>
      {userLogged && (
        <MenuAccount
          userLogged
          messages={messages.modalAuth}
          menuList={menuAccount}
          menuState={menuState}
          openAccountMenu={openAccountMenu}
          controlMenu={(v) => handleToggleMenuAccount(v)}
        />
      )}
    </div>
  );
};
export const OnContent = () => {
  const [menuState, setMenuState] = useState();
  return (
    <MenuAccount
      onContent
      userLogged
      messages={messages.modalAuth}
      menuList={menuAccount}
      menuState={menuState}
    />
  );
};
