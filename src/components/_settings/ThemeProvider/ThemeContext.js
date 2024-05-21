/* eslint-disable react/prop-types */
import React, {
  useContext, useState, useEffect
} from 'react';

import isBrowser from '@charlescgr/underline/dist/isBrowser';

import SwithThemeDirection from './SwitchThemeDirection';
import { themes, commomColors } from './defaultValues';
import { getUserLogged } from './getUserLogged';
import GlobalStyles from '../GlobalStyles';

const locale = process.env.APP_LOCALE || 'es';
const cdnPath = 'https://cdn.atomik.vip/';
const publicUrl = '';
const userLogged = getUserLogged();
const domains = [];
const absolutUrl = '';

const allPaletteColors = () => Object.entries(commomColors).reduce((acc, curr) => {
  const keyDesc = curr[0];

  Object.entries(curr[1]).forEach(([key]) => {
    acc.push(`${keyDesc}.${key}`);
  });

  return acc;
}, []);

const ThemeContext = React.createContext({
  theme: themes.lmem,
  locale,
  cdnPath,
  userLogged,
  domains,
  publicUrl,
  absolutUrl
});

function ThemeProvider({ value, children }) {
  const [colorMode, setColorMode] = useState();

  const localData = () => {
    if (isBrowser()) {
      if (localStorage.getItem('themeColorMode')) {
        const currentColorMode = localStorage.getItem('themeColorMode');
        setColorMode(currentColorMode);
        return currentColorMode;
      }
    }
    setColorMode('light');
    localStorage.setItem('themeColorMode', 'light');
    return 'light';
  };

  const config = value || {
    theme: themes.lmem,
    locale,
    cdnPath,
    userLogged,
    publicUrl,
    absolutUrl,
    domains,
    ...value
  };

  const { theme } = config;

  const getColor = (colorStr) => {
    if (Object.prototype.hasOwnProperty.call(theme.commomColors, colorStr)) {
      return theme.commomColors[colorStr];
    }

    const color = colorStr.split('.');

    let colorName;
    if (color[0] === 'main') {
      colorName = theme.mainColor;
    } else if (color[0] === 'secondary') {
      colorName = theme.secondaryColor;
    } else {
      // eslint-disable-next-line prefer-destructuring
      colorName = color[0];
    }

    // invert order from color pallete
    let scaleColor = '';
    if (colorMode === 'dark') {
      switch (color[1]) {
        case '50':
          scaleColor = '1000';
          break;
        case '100':
          scaleColor = '900';
          break;
        case '200':
          scaleColor = '800';
          break;
        case '300':
          scaleColor = '700';
          break;
        case '400':
          scaleColor = '600';
          break;
        case '600':
          scaleColor = '400';
          break;
        case '700':
          scaleColor = '300';
          break;
        case '800':
          scaleColor = '200';
          break;
        case '900':
          scaleColor = '100';
          break;
        case '1000':
          scaleColor = '50';
          break;
        default:
          scaleColor = '500';
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      scaleColor = color[1];
    }
    return theme.customColors[colorName][scaleColor];
  };

  // on call this function, togle the themeColorMode on setConfig, setTheme, and localStorage
  const changeThemeMode = () => {
    if (!isBrowser()) return;
    const currentThemeMode = localStorage.getItem('themeColorMode'); // get the current colorTheme
    const newThemeMode = currentThemeMode === 'light' || !currentThemeMode ? 'dark' : 'light'; // change the colorTheme
    localStorage.setItem('themeColorMode', newThemeMode);
    setColorMode(newThemeMode);
  };

  const handleMediaChange = (e) => {
    const currentThemeMode = (e.matches ? 'dark' : 'light');
    localStorage.setItem('themeColorMode', currentThemeMode);
    setColorMode(currentThemeMode);
  };
  if (isBrowser()) {
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryDark.addListener(handleMediaChange);
  }

  // save on localStorage if the user is logged
  const changeUserLogged = (val) => {
    localStorage.setItem('userLogged', val);
    config.userLogged = val;
  };

  useEffect(() => {
    localData();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...config, getColor, colorMode, changeThemeMode, changeUserLogged
      }}
    >
      <GlobalStyles theme={theme} colorMode={colorMode} getHexColorCode={(v) => getColor(v)} />
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeProviderWithSelector({ children, defaultTheme }) {
  const [colorMode, setColorMode] = useState();
  const localData = () => {
    if (isBrowser()) {
      if (localStorage.getItem('themeColorMode')) {
        const currentColorMode = localStorage.getItem('themeColorMode');
        setColorMode(currentColorMode);
        return currentColorMode;
      }

      setColorMode('light');
      localStorage.setItem('themeColorMode', 'light');
      return 'light';
    }
  };

  const [config, setConfig] = useState({
    theme: themes[defaultTheme] || themes.lmem,
    locale,
    direction: process.env.DIRECTION || 'ltr',
    cdnPath,
    userLogged,
    domains,
    publicUrl,
    absolutUrl
  });

  const [theme, setTheme] = useState(config.theme);
  const [isRTL, setIsRTL] = useState(config.direction === 'rtl');

  const handleDirection = () => {
    const newDirection = !isRTL ? 'rtl' : 'ltr';
    const element = document.getElementsByTagName('html')[0];
    element.setAttribute('dir', newDirection);

    setConfig({
      ...config,
      direction: newDirection,
    });
    setIsRTL(!isRTL);
  };

  const getColor = (colorStr) => {
    if (Object.prototype.hasOwnProperty.call(theme.commomColors, colorStr)) {
      return theme.commomColors[colorStr];
    }

    const color = colorStr.split('.');

    let colorName;
    if (color[0] === 'main') {
      colorName = theme.mainColor;
    } else if (color[0] === 'secondary') {
      colorName = theme.secondaryColor;
    } else {
      // eslint-disable-next-line prefer-destructuring
      colorName = color[0];
    }

    // invert order from color pallete
    let scaleColor = '';
    if (colorMode === 'dark') {
      switch (color[1]) {
        case '50':
          scaleColor = '1000';
          break;
        case '100':
          scaleColor = '900';
          break;
        case '200':
          scaleColor = '800';
          break;
        case '300':
          scaleColor = '700';
          break;
        case '400':
          scaleColor = '600';
          break;
        case '600':
          scaleColor = '400';
          break;
        case '700':
          scaleColor = '300';
          break;
        case '800':
          scaleColor = '200';
          break;
        case '900':
          scaleColor = '100';
          break;
        case '1000':
          scaleColor = '50';
          break;
        default:
          scaleColor = '500';
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      scaleColor = color[1];
    }
    return theme.customColors[colorName][scaleColor];
  };

  // on call this function, togle the themeColorMode on setConfig, setTheme, and localStorage
  const changeThemeMode = () => {
    if (!isBrowser()) return;
    const currentThemeMode = localStorage.getItem('themeColorMode'); // get the current colorTheme
    const newThemeMode = currentThemeMode === 'light' || !currentThemeMode ? 'dark' : 'light'; // change the colorTheme
    localStorage.setItem('themeColorMode', newThemeMode);
    setColorMode(newThemeMode);
  };

  const handleMediaChange = (e) => {
    const currentThemeMode = (e.matches ? 'dark' : 'light');
    localStorage.setItem('themeColorMode', currentThemeMode);
    setColorMode(currentThemeMode);
  };
  if (isBrowser()) {
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryDark.addListener(handleMediaChange);
  }

  // save on localStorage if the user is logged
  const changeUserLogged = (val) => {
    localStorage.setItem('userLogged', val);
    setConfig({
      ...config,
      userLogged: val
    });
  };

  useEffect(() => {
    localData();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...config, getColor, colorMode, changeThemeMode, changeUserLogged, direction: config.direction
      }}
    >
      <GlobalStyles theme={theme} colorMode={colorMode} getHexColorCode={(v) => getColor(v)} />
      {children}
      <div
        dir="ltr"
        className="select-theme p--fixed d--flex jc--flex-end b--0 w--100 ta--right p--normal bc--grey-neutral-500 zi--10"
        style={{
          boxShadow: '-1px -6px 7px 2px rgb(0 0 0 / 15%)',
          borderTop: '1.5px solid #666',
        }}
      >
        <SwithThemeDirection
          onText="LTR"
          offText="RTL"
          value={isRTL}
          onChange={handleDirection}
        />
        <select
          onChange={(e) => {
            setColorMode(localData());
            setConfig({
              theme: themes[e.target.value],
              locale,
              direction: process.env.DIRECTION || 'ltr',
              cdnPath,
              userLogged,
              domains,
              publicUrl,
              absolutUrl,
            });
            setTheme(themes[e.target.value]);
          }}
          className="p--small fs--small"
        >
          <option value="0">Select Theme</option>
          {Object.keys(themes).map((_theme) => {
            const select = _theme === theme.base ? 'selected' : '';
            return (
              <option key={_theme} value={_theme} selected={select}>
                {`${_theme.toUpperCase()} - ${themes[_theme].name}`}
              </option>
            );
          }
          )}
        </select>
      </div>
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export {
  themes, useTheme, ThemeProvider, ThemeProviderWithSelector, allPaletteColors
};
