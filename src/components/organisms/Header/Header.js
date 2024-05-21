/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';
import throttle from '@charlescgr/underline/dist/throttle';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import InputField from '../../atoms/InputField';
import Heading from '../../atoms/Heading';
import Divider from '../../atoms/Divider';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import Image from '../../atoms/Image';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import NewsletterBox from '../../molecules/NewsletterBox';
import MenuAccount from '../../molecules/MenuAccount';
import ReadingBar from '../../molecules/ReadingBar';
import MenuIcon from '../../molecules/MenuIcon';
import Modal from '../../molecules/Modal';

import Navigation from '../Navigation';
import Container from '../../atoms/Container';

function Header({
  hasProgress, logoOnTitle, progressContainer, menus, placeholderSearchInput, socialLinks, legalLinks,
  showAuth, showDarkMode, showNewsletter, basePath, id, messages, wpIsLogged, platformConfig, menuAccount,
  mobileLogo, fnOnSubmitNewsletter, linksWithFullRefresh, showASlogo, ...props
}) {
  // -- hooks
  const isAmp = useAmp();
  const {
    theme, cdnPath, locale, userLogged, changeUserLogged, changeThemeMode, colorMode, direction
  } = useTheme();
  const router = useRouter();
  const { isDesktop } = useDeviceScreen();

  // -- states
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [position, setPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [changeHeader, setChangeHeader] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const [modalSubscribe, setModalSubscribe] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [contentModalLogin, setContentModalLogin] = useState(true);
  const [contentModalRegister, setContentModalRegister] = useState(false);
  const [contentModalRecovery, setContentModalRecovery] = useState(false);
  const [focusedSearch, setFocusedSearch] = useState(false);
  const [runFirstTime, setRunFirstTime] = useState(true);
  const [menuState, setMenuState] = useState('');

  const iconsNumber = () => {
    let count = 0; // search and hamburger icon is default, show always, so can't count
    if (showNewsletter) {
      if (isDesktop) {
        count += 2; // on desktop is a text button
      }
      count += 1; // on mobile is a icon button
    }
    if (showDarkMode) {
      count += 1;
    }
    if (showAuth) {
      count += 1;
    }
    return count;
  };

  const showLogo = () => {
    if (colorMode === 'dark') {
      return 'logo__mobile--reverse.svg';
    }
    return 'logo.svg';
  };

  const translateYheader = () => {
    let heightWPbar = 0;
    let heightProgressBar = 0;
    const heightHeader = parseInt(theme.sizes['6'].substring(0, 2), 10);
    /*
    It is not necessary to reduce the size of the ProgressBar/ReadingBar, as it has negative position.
    But here it was added, to create a white border, and it does not go unnoticed.
    And - 2 its the padding (negative pedding)
    */
    if (hasProgress) {
      heightProgressBar = parseInt(theme.sizes['0-5'].substring(0, 2), 10) - 2;
    }
    if (wpIsLogged) {
      heightWPbar = 50;
    }
    return `-${heightHeader + heightWPbar - heightProgressBar}px`;
  };

  const mediaStyles = css.resolve``;

  const { className, styles } = css.resolve`
    .header {
      height: ${theme.sizes['6']};
      margin-top: ${wpIsLogged ? '50px' : '0px'};
      box-shadow: 0 -4px 24px rgb(0 0 0 / 25%);
      transition: transform 0.8s ease;
    }

    .header:not(.is--scrolled-down){
      transform: translateY(0);
    }

    .header.is--scrolled-down{
      transform: translateY(${translateYheader()});
    }

    .navigation-icon-area {
      padding-${direction === 'rtl' ? 'left' : 'right'}: calc((42px * ${iconsNumber()}) ${iconsNumber() === 0 ? '- 8px' : '* 0'});
    }

    .navigation__icon {
      margin-${direction === 'rtl' ? 'right' : 'left'}: 8px;
    }

    .logo-area {
      padding: 0;
      width: 100%;
      display: flex;
      justify-content: ${iconsNumber() === 0 ? 'center' : 'start'};
    }

    .logo-area__image {
      width: 145px;
      height: 30px;
      content: url(${cdnPath}themes/${theme.base}/${locale}/${mobileLogo || showLogo()});
    }

    .logo-area__link {
      width: 145px;
      height: 30px;
      position: relative;
    }

    .logo-as {
      width: 20px;
      height: 30px;
      position: relative;
      margin-left: 18px;
    }

    .logo-as::before {
      content: "";
      height: 14px;
      width: 1px;
      background-color: ${theme.customColors['grey-neutral'][200]};
      top: 9px;
      left: -9px;
      position: absolute;
    }

    .divider__text {
      margin-top: -25px;
      position: absolute;
      padding: 0 8px;
      left: calc(50% - 8px);
      transform: translateY(-50%);
    }

    .icon__subscribe {
      max-width: 24px;
    }

    @media only screen and (min-width: 851px){ // 851x393Xiaomi
      .header:not(.is--scrolled-down),
      .header.is--scrolled-down {
        transform: translateY(0);
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .header {
        height: ${theme.sizes['8']};
      }

      .logo-area {
        padding: 0;
        width: 100%;
        justify-content: center;
      }

      .logo-area__image {
        width: 270px;
        height: 40px;
        content: url(${cdnPath}themes/${theme.base}/${locale}/${showLogo()});
      }

      .logo-area__link {
        width: 270px;
        height: 40px;
      }

      .logo-as {
        width: 33px;
        height: 40px;
        margin-left: 12px;
      }

      .logo-as::before {
        height: 21px;
        top: 10px;
        left: -15px;
      }
    }
    @media only screen and (min-width: 540px){
      .navigation-icon-area {
        padding-${direction === 'rtl' ? 'left' : 'right'}: calc((42px * ${iconsNumber()}) ${iconsNumber() > 0 ? '- 8px' : ''});
      }
      .logo-area{
        justify-content: center;
      }
    }
  `;

  const headerColor = () => {
    if (colorMode === 'dark') {
      return 'bc--black';
    }
    if (theme.isColorizedMode) {
      if (theme.headerColor !== 'default') {
        return `bc--${theme.headerColor.replace('.', '-')}`;
      }
      return 'bc--secondary-800';
    }
    return 'bc--white';
  };

  const buttonSubscribeBgColor = () => {
    if (theme.isColorizedMode) {
      if (colorMode === 'dark') {
        return 'white';
      }
      return 'white';
    }
    return 'main.800';
  };

  const buttonSubscribeTxtColor = () => {
    if (theme.isColorizedMode) {
      if (colorMode === 'dark') {
        return 'black';
      }
      return 'secondary.900';
    }
    return 'main.50';
  };

  /* ***
  active dark/light mode */
  const handleToggleDarkMode = () => {
    changeThemeMode();
  };

  useEffect(() => {
    const routerHash = router.asPath.split('#')[1];
    if (routerHash) {
      setMenuState(routerHash);
    } else {
      setMenuState('');
    }
  }, [router, menuState]);

  /* ***
  control show/hide logo or icon, title and anchor titles */
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!isBrowser()) return;
      const h = document.documentElement;
      const st = 'scrollTop';
      const sh = 'scrollHeight';

      // const scrollPercent = ((h[st] / h[sh]) * 100).toFixed(4);
      const scrollValue = (h[st] / h[sh]).toFixed(4);
      setPosition(`${scrollValue}`);
      setScrollDown(scrollValue > lastPosition);
      const changeH = (position > 0.0130); // previous value 2.5
      setChangeHeader(changeH);
      setLastPosition(scrollValue);
    }, 650);
    if (isBrowser()) {
      if (runFirstTime) {
        handleScroll();
        setRunFirstTime(false);
      }
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [position]);

  /* ***
  open/close navigation */
  const handleToggleNavigation = ({ openSearchFieldWithFocus }) => {
    setOpenMenu(!openMenu);
    setOpenAccountMenu(false);
    setFocusedSearch(openSearchFieldWithFocus);
    document.body.classList.toggle('navigation-open');
  };

  /* ***
  open/close modal subscribe */
  const handleSubscribe = () => {
    setModalSubscribe(!modalSubscribe);
  };

  /* ***
  control click on account icon */
  const handleClickAccount = () => {
    if (userLogged) {
      setOpenAccountMenu(!openAccountMenu);
      setOpenMenu(false);
    } else {
      setModalLogin(!modalLogin);
    }
  };

  /* ***
  control account menu */
  const handleToggleMenuAccount = (action) => {
    setOpenAccountMenu(false);
    if (action === 'logout') {
      changeUserLogged(false);
    }
  };

  const theLogo = () => {
    const srcLogo = `${cdnPath}themes/${theme.base}/${locale}/${showLogo()}`;
    return (
      <A to={basePath} className={`logo-area__link d--flex ${className}`} title={theme.name} externalLink={linksWithFullRefresh}>
        <Image
          src={srcLogo}
          layout="fill"
          loadingType="none"
          lazy={false}
          objectFit="fill"
          alt={platformConfig.name}
          className={`logo-area__image ${className} ${mediaStyles.className} p--relative zi--5`}
        />
        <Span className="p--absolute l--0 v--hidden zi--1">{theme.name}</Span>
      </A>
    );
  };

  const asLogo = () => {
    const srcLogo = `${cdnPath}themes/${theme.base}/logo_as--gray.svg`;
    return (
      <A to="https://as.com" target="_blank" className={`logo-as ${className}`} title="AS">
        <Image
          src={srcLogo}
          layout="fill"
          loadingType="none"
          lazy={false}
          objectFit="fill"
          alt="Diario AS"
          className={`logo-as__image ${className}`}
        />
      </A>
    );
  };

  const buttonSubscribe = () => {
    let srcIcon = `${cdnPath}themes/${theme.base}/icon__subscribe--${colorMode === 'dark' ? 'reverse' : 'color'}.svg`;
    if (theme.isColorizedMode) {
      srcIcon = `${cdnPath}themes/icon__subscribe--white.svg`;
    }
    if (isDesktop) {
      return (
        <Button
          rounded
          size="custom"
          color={buttonSubscribeBgColor()}
          textColor={buttonSubscribeTxtColor()}
          onClick={handleSubscribe}
          className={`button__subscribe ${className} fs--normal mlr--normal ptb--small plr--big`}
        >
          {messages.subscribeNewsletter}
        </Button>
      );
    }
    return (
      <Button
        onlyIcon
        onClick={handleSubscribe}
        className={`button__subscribe ${className}`}
      >
        <Image
          src={srcIcon}
          layout="fixed"
          width="24"
          height="24"
          alt={messages.subscribeNewsletter}
          title={messages.subscribeNewsletter}
          className={`icon__subscribe ${className}`}
        />
      </Button>
    );
  };

  return (
    <>
      <header
        className={`header${scrollDown && changeHeader ? ' is--scrolled-down ' : ' '}${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} d--flex zi--10 t--0 w--100 p--fixed ${headerColor()}`}
      >
        <Container wrap className="d--flex ai--center">

          <Box className={`navigation-icon-area ${className} ${mediaStyles.className}`}>
            <MenuIcon ariaLabel={messages.menuButtonAriaLabel} onClick={() => handleToggleNavigation({ openSearchFieldWithFocus: false })} clicked={openMenu} className={`navigation__icon ${className} ${mediaStyles.className} p--relative zi--5`} />
          </Box>
          {logoOnTitle ? (
            <Heading className={`logo-area ${className} ${mediaStyles.className}`}>
              {theLogo()}
              {(showASlogo && (asLogo()))}
            </Heading>
          ) : (
            <Box className={`logo-area ${className} ${mediaStyles.className}`}>
              {theLogo()}
              {(showASlogo && (asLogo()))}
            </Box>
          )}

          <Box className={`nav-helper ${className} d--flex ai--center`}>
            {showNewsletter && (buttonSubscribe())}
            {showDarkMode && (
              <Button
                onlyIcon
                className={`nav-helper__button o--none ${className}`}
                onClick={handleToggleDarkMode}
                aria-label={messages.darkModeButtonAriaLabel}
              >
                <Icon inline prefix="bx" name={colorMode === 'dark' ? 'sun' : 'moon'} size="normal" color={theme.isColorizedMode ? 'white' : 'main.800'} className="c--pointer" />
              </Button>
            )}
            <Button
              onlyIcon
              className="search"
              onClick={() => handleToggleNavigation({ openSearchFieldWithFocus: true })}
              on="tap:navHamburger.toggleClass(class='is--active'),body.toggleClass(class='navigation-open'),navigation.toggleClass(class='d--none')"
              aria-label={messages.searchButtonAriaLabel}
            >
              <Icon inline name="search-alt" size="normal" color={theme.isColorizedMode ? 'white' : 'main.800'} />
            </Button>
            {showAuth && (
              <Button onlyIcon={(userLogged && !isDesktop) || !userLogged} hasIcon={userLogged && isDesktop} className="menu-user" aria-label={messages.userButtonAriaLabel} onClick={handleClickAccount}>
                <Icon inline name={`user${userLogged ? '-detail' : '-circle'}`} prefix={`bx${userLogged ? 's' : ''}`} size="normal" color={theme.isColorizedMode ? 'white' : 'main.800'} />
                {(userLogged && isDesktop) && (
                  <Span className="d--none">
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
            )}
          </Box>
        </Container>
        {hasProgress && (
          <ReadingBar
            className="p--absolute zi--7"
            container={progressContainer}
            id={id}
          />
        )}
      </header>

      {(openMenu || isAmp) && (
        <Navigation
          wpIsLogged={wpIsLogged}
          openMenu={openMenu}
          openWithFocusOnSearch={focusedSearch}
          menus={menus}
          messages={messages}
          socialLinks={socialLinks}
          legalLinks={legalLinks}
          placeholderSearchInput={placeholderSearchInput}
          basePath={basePath}
          click={(e) => { setOpenMenu(e); }}
          classNameNav={`${!openMenu ? 'd--none' : ''}`}
        />
      )}
      {userLogged && openAccountMenu && (
        <Box className="group-menu-account w--100 p--fixed zi--9">
          <Container wrap className="p--relative">
            <MenuAccount
              wpIsLogged={wpIsLogged}
              userLogged={userLogged}
              messages={messages.modalAuth}
              menuList={menuAccount}
              menuState={menuState}
              openAccountMenu={openAccountMenu}
              controlMenu={(v) => handleToggleMenuAccount(v)}
            />
          </Container>
        </Box>
      )}

      {showAuth && (
        <Modal
          rounded
          isOpen={modalLogin}
          id="m__login"
          size={isDesktop ? 'small' : 'normal'}
          animation="scale-fade"
          closeModal={() => setModalLogin(false)}
          className="p--big"
          contentColor={colorMode === 'dark' ? 'grey-neutral.100' : 'white'}
        >
          <Box className={`modal__forms ${isDesktop ? 'p--x-big m--x-big' : 'ptb--x-big plr--normal m--normal'}`}>
            {contentModalLogin && (
              <>
                <Button hasIcon rounded color="facebook" textColor="white" className="w--100 mtb--normal">
                  <Icon name="facebook" prefix="bxl" color="white" className="mr--normal" />
                  {messages.modalAuth?.loginWith}
                  {' '}
                  Facebook
                </Button>
                <Button hasIcon rounded color="google" textColor="white" className="w--100 mtb--normal">
                  <Icon name="google" prefix="bxl" color="white" className="mr--normal" />
                  {messages.modalAuth?.loginWith}
                  {' '}
                  Google
                </Button>

                <Divider type="solid" size="small" color={colorMode === 'dark' ? 'grey-neutral.400' : 'grey-neutral.100'} className="mtb--x-big" />
                <Span color={colorMode === 'dark' ? 'grey-neutral.100' : 'white'} ttextColor={colorMode === 'dark' ? 'grey-neutral.400' : 'grey-neutral.100'} className={`divider__text ${className}`}>
                  {messages.modalAuth?.or}
                </Span>

                <InputField
                  full
                  id="login"
                  name="login"
                  type="text"
                  size="big"
                  placeholder={messages.modalAuth?.email}
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />
                <InputField
                  full
                  id="password"
                  name="password"
                  type="password"
                  size="big"
                  placeholder={messages.modalAuth?.password}
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />
                <Span textColor="grey-neutral.400" className="ff--sans d--block ta--right mt--normal">
                  {messages.modalAuth?.forgotPassword}
                  {' '}
                  <A textColor="main.500" lineType="dotted" underlineColor="main.500" onClick={() => { setContentModalLogin(false); setContentModalRecovery(true); }}>
                    {messages.modalAuth?.buttonRecoveryPassword}
                  </A>
                </Span>

                <Button
                  hasIcon
                  rounded
                  color="secondary.600"
                  size="medium"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  onClick={() => { changeUserLogged(true); setModalLogin(false); }}
                  className="w--100 mtb--big ta--center mlr--auto"
                >
                  {messages.modalAuth?.buttonStartSession}
                </Button>

                <A textColor="main.500" lineType="dotted" underlineColor="main.500" onClick={() => { setContentModalLogin(false); setContentModalRegister(true); }} className="ff--sans fw--bold d--table mlr--auto">
                  {messages.modalAuth?.haventAccount}
                </A>
              </>
            )}
            {contentModalRegister && (
              <>
                <Button hasIcon rounded color="facebook" textColor="white" className="w--100 mtb--normal">
                  <Icon name="facebook" prefix="bxl" color="white" className="mr--normal" />
                  {messages.modalAuth?.registerWith}
                  {' '}
                  Facebook
                </Button>
                <Button hasIcon rounded color="google" textColor="white" className="w--100 mtb--normal">
                  <Icon name="google" prefix="bxl" color="white" className="mr--normal" />
                  {messages.modalAuth?.registerWith}
                  {' '}
                  Google
                </Button>

                <Divider type="solid" size="small" color={colorMode === 'dark' ? 'grey-neutral.400' : 'grey-neutral.100'} className="mtb--x-big" />
                <Span color={colorMode === 'dark' ? 'grey-neutral.100' : 'white'} ttextColor={colorMode === 'dark' ? 'grey-neutral.400' : 'grey-neutral.100'} className={`divider__text ${className}`}>
                  {messages.modalAuth?.or}
                </Span>

                <InputField
                  full
                  id="login-name"
                  name="login-name"
                  type="text"
                  size="big"
                  placeholder={messages.modalAuth?.fullName}
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />
                <InputField
                  full
                  id="login-email"
                  name="loginn-email"
                  type="text"
                  size="big"
                  placeholder={messages.modalAuth?.email}
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />
                <InputField
                  full
                  id="login-password"
                  name="login-password"
                  type="password"
                  size="big"
                  placeholder={messages.modalAuth?.password}
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />

                <InputField
                  id="login-terms"
                  name="login-terms"
                  type="checkbox"
                  size="big"
                  borderColor={colorMode === 'dark' ? 'main.600' : 'main.200'}
                  className="d--inline-block"
                />
                <Label
                  inputId="login-terms"
                  textColor="grey-neutral.600"
                  className="d--inline-block mtb--big ff--sans"
                >
                  {messages.modalAuth?.accept}
                  {' '}
                  <A textColor="main.500" lineType="dotted" underlineColor="main.500">
                    {messages.modalAuth?.terms}
                  </A>
                  {' '}
                  {messages.modalAuth?.or}
                  {' '}
                  <A textColor="main.500" lineType="dotted" underlineColor="main.500">
                    {messages.modalAuth?.inform}
                  </A>
                </Label>

                <Button
                  hasIcon
                  rounded
                  color="secondary.600"
                  size="medium"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  onClick={() => { changeUserLogged(true); setContentModalLogin(true); setContentModalRegister(false); setModalLogin(false); }}
                  className="w--100 mtb--big ta--center mlr--auto"
                >
                  {messages.modalAuth?.register}
                </Button>

                <A textColor="main.500" lineType="dotted" underlineColor="main.500" onClick={() => { setContentModalLogin(true); setContentModalRegister(false); }} className="ff--sans fw--bold d--table mlr--auto">
                  {messages.modalAuth?.haveAccount}
                </A>
              </>
            )}
            {contentModalRecovery && (
              <>
                <Label
                  inputId="recovery"
                  textColor="grey-neutral.600"
                  className="ff--sans mt--big d--inline-block mtb--normal"
                >
                  {messages.modalAuth?.textRecoveryPassword}
                </Label>
                <InputField
                  full
                  id="recovery"
                  name="recovery"
                  type="email"
                  size="big"
                  placeholder="email@email.com"
                  textColor={colorMode === 'dark' ? 'main.800' : 'main.300'}
                  color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  borderColor={colorMode === 'dark' ? 'grey-neutral.400' : 'main.200'}
                  className="mb--normal"
                />
                <Button
                  hasIcon
                  rounded
                  color="secondary.600"
                  size="medium"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  onClick={() => setModalLogin(false)}
                  className="w--100 mtb--big ta--center mlr--auto"
                >
                  {messages.modalAuth?.buttonRecoveryPassword}
                </Button>

                <A textColor="main.500" lineType="dotted" underlineColor="main.500" onClick={() => { setContentModalLogin(true); setContentModalRecovery(false); }} className="ff--sans fw--bold d--table mlr--auto">
                  {messages.modalAuth?.textBack}
                </A>
              </>
            )}

          </Box>
        </Modal>
      )}

      {showNewsletter && (
        <Modal
          size={isDesktop ? 'small' : 'normal'}
          isOpen={modalSubscribe}
          closeModal={() => setModalSubscribe(false)}
          className="br--small p--x-big w--50"
        >
          <NewsletterBox
            titleIsSpan
            textColor={colorMode === 'dark' ? 'grey-neutral.800' : 'grey-neutral.700'}
            title={messages.newsletter.title}
            description={messages.newsletter.description}
            onSubmit={fnOnSubmitNewsletter}
            messages={{
              subscribe: messages.subscribeNewsletter,
              acceptNewsletterTerms: messages.newsletter.acceptNewsletterTerms,
              registrationConfirmationMessage: messages.newsletter.registrationConfirmationMessage,
              inputPlaceholder: messages.newsletter.inputPlaceholder
            }}
            list="category"
            className={`newsletter-box__category p--x-big ${colorMode === 'dark' ? 'bc--main-100' : 'bc--main-50'}`}
          />
        </Modal>
      )}

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
        // -- nav-helper
        // nav-helper styles doesn't work on css.resolve, because this box have dynamic components inside
          .nav-helper {
            flex: 1 1 auto;
            justify-content: flex-end;
            padding-left:${iconsNumber() === 0 ? '8px' : 0};
          }
        `}
      </style>
    </>
  );
}

Header.defaultProps = {
  showASlogo: false,
  wpIsLogged: false,
  hasProgress: false,
  logoOnTitle: false,
  showAuth: true,
  showDarkMode: true,
  showNewsletter: false,
  basePath: '/',
  messages: {
    menuButtonAriaLabel: 'Menú de Navegación',
    darkModeButtonAriaLabel: 'Modo oscuro',
    searchButtonAriaLabel: 'Búsqueda',
    userButtonAriaLabel: 'Usuario',
    subscribeNewsletter: 'Suscribirse',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    seeAll: 'Ver todos',
    modalAuth: {
      welcome: 'Hola',
      userName: 'Henrique',
      loginWith: 'Conéctate con',
      registerWith: 'Registrarse con',
      or: 'O',
      fullName: 'Nome Completo',
      email: 'Su correo electrónico',
      password: 'Contrasenha',
      accept: 'Acepto los',
      terms: 'términos y condiciones',
      and: 'y',
      inform: 'nuestra cláusula informativa',
      register: 'Registrarse',
      haveAccount: '¿Ya tienes cuenta? Conéctate',
      textRecoveryPassword: 'Complete con su correo electrónico para que podamos enviarle instrucciones para restablecer su contraseña',
      buttonRecoveryPassword: 'Recuperar contraseña',
      textBack: 'Volver para iniciar sesión',
      forgotPassword: '¿Lo has olvidado?',
      buttonStartSession: 'Iniciar Sesión',
      haventAccount: '¿No tienes cuenta? Regístrate'
    },
    newsletter: {
      acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
      registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
      title: 'Recibe semanalmente nuestro boletín sobre paternidad',
      description: 'Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar.',
      inputPlaceholder: 'Insere tu correo'
    },
    fnOnSubmitNewsletter: () => {}
  }
};

Header.propTypes = {
  /**
   * Show or hide Diario AS logo
   */
  showASlogo: PropTypes.bool,

  /**
   * Informs if the user is logged on WordPress
   */
  wpIsLogged: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * If will show Reading Progress
   */
  hasProgress: PropTypes.bool,

  /**
   * Informs if the component put the logo inside an <h1> or an <div>, for SEO reasons
   */
  logoOnTitle: PropTypes.bool,

  /**
   * Menu items
   */
  menus: PropTypes.any,

  /**
   * List of legal links and pages links from the site
   */
  legalLinks: PropTypes.array,

  /**
   * List of social medias from the site
   */
  socialLinks: PropTypes.array,

  /**
   * The menu for logged users
   */
  menuAccount: PropTypes.array,

  /**
   * The container to calculate reading progress
   */
  progressContainer: PropTypes.string,

  /**
   * Whether to render auth icon or not.
   * Note: We should remove it when auth was implemented.
   */
  showAuth: PropTypes.bool,

  /**
   * Whether to render dark mode icon or not.
   * Note: We should remove it when dark mode was implemented.
   */
  showDarkMode: PropTypes.bool,

  /**
   * Whether to render newsletter button or not.
   * Note: We should remove it when newsletter was implemented.
   */
  showNewsletter: PropTypes.bool,

  /**
   * Path for home page
   */
  basePath: PropTypes.string,

  /**
   * The placeholder for search input prop.
   */
  placeholderSearchInput: PropTypes.string,

  /**
   * The Id from post/page for ReadingBar
   */
  id: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    darkModeButtonAriaLabel: PropTypes.string,
    searchButtonAriaLabel: PropTypes.string,
    menuButtonAriaLabel: PropTypes.string,
    userButtonAriaLabel: PropTypes.string,
    subscribeNewsletter: PropTypes.string,
    seeMore: PropTypes.string,
    seeLess: PropTypes.string,
    seeAll: PropTypes.string,
    modalAuth: PropTypes.shape({
      welcome: PropTypes.string,
      userName: PropTypes.string,
      loginWith: PropTypes.string,
      registerWith: PropTypes.string,
      or: PropTypes.string,
      fullName: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      accept: PropTypes.string,
      terms: PropTypes.string,
      and: PropTypes.string,
      inform: PropTypes.string,
      register: PropTypes.string,
      haveAccount: PropTypes.string,
      textRecoveryPassword: PropTypes.string,
      buttonRecoveryPassword: PropTypes.string,
      textBack: PropTypes.string,
      forgotPassword: PropTypes.string,
      buttonStartSession: PropTypes.string,
      haventAccount: PropTypes.string
    }),
    newsletter: PropTypes.shape({
      acceptNewsletterTerms: PropTypes.string,
      registrationConfirmationMessage: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      inputPlaceholder: PropTypes.string
    })
  }),

  /**
   * Config info about current platform
   */
  platformConfig: PropTypes.shape({
    name: PropTypes.string,
  }),

  /**
   * logo name, using to locate on cdn
   */
  mobileLogo: PropTypes.string,

  /**
   * for full refresh home
   */
  linksWithFullRefresh: PropTypes.bool,

  /**
   * function for sending email to api
   */
  fnOnSubmitNewsletter: PropTypes.func
};

export default Header;
