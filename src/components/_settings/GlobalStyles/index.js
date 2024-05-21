/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { hexToRgb } from '../Utils';
import { reset } from './vendor';

import AdsClasses from './utils/_ads';
import TextClasses from './utils/_text';
import ColorsClasses from './utils/_colors';
import SpacingClasses from './utils/_spacing';
import HelpersClasses from './utils/_helpers';
import AnimationClasses from './utils/_animations';

/**
 * GlobalStyles.js
 */
function GlobalStyles({
  theme, colorMode
}) {
  const selectionCss = `
  ::-moz-selection {${colorMode === 'dark' ? `color: ${theme.commomColors.black}; background-color: rgba(${hexToRgb(theme.commomColors.white)}, 0.75);` : `color: ${theme.customColors[theme.mainColor]['50']}; background-color: rgba(${hexToRgb(theme.customColors[theme.mainColor]['600'])}, 0.75);`}}
  ::selection { ${colorMode === 'dark' ? `color: ${theme.commomColors.black}; background-color: rgba(${hexToRgb(theme.commomColors.white)}, 0.75);` : `color: ${theme.customColors[theme.mainColor]['50']}; background-color: rgba(${hexToRgb(theme.customColors[theme.mainColor]['600'])}, 0.75);`}}
  `;
  if (colorMode) {
    const id = '__selectionstyle';
    let sheet = document.getElementById(id);
    if (sheet) {
      sheet.innerText = selectionCss;
    } else {
      sheet = document.createElement('style');
      sheet.id = id;
      document.head.appendChild(sheet);
      sheet.innerText = selectionCss;
    }
  }
  return (
    <React.Fragment>
      <style jsx>{reset}</style>
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 85px;
          }
          :target::before {
            content:"";
            display:block;
            height:85px; /* fixed header height*/
            margin-top:-85px; /* negative fixed header height */
          }
          html,
          body,
          #__next {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
          }

          body {
            background-color: ${colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white};
            -webkit-transition: background-color 0.45s ease;
            -ms-transition: background-color 0.45s ease;
            transition: background-color 0.45s ease;
            overflow-x: hidden;
          }

          strong, b {
            font-weight: 700;
          }

          i, em {
            font-style: italic;
          }

        `}
      </style>
      <AdsClasses data={theme} />
      <ColorsClasses data={theme} colorMode={colorMode} />
      <SpacingClasses data={theme} />
      <TextClasses data={theme} />
      <HelpersClasses data={theme} />
      <AnimationClasses data={theme} />
    </React.Fragment>
  );
}

GlobalStyles.propTypes = {
  /**
   * The object theme.
   */
  theme: PropTypes.any,

  /**
   * The current mode theme ( dark || light).
   */
  colorMode: PropTypes.string
};

export default GlobalStyles;
