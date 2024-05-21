import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function BreakContent({ children, size, ...props }) {
  const {
    theme, cdnPath, getColor, colorMode, direction
  } = useTheme();
  const { className, styles } = css.resolve`
    .break-content {
      font-size: ${theme.fontSizes.medium};
      font-family: ${theme.fontFamilies.sans};
      background-color: ${getColor(colorMode === 'dark' ? 'secondary.100' : 'secondary.50')};
      background-repeat: no-repeat;
      background-position: 97% 96%;
      background-size: 200px;
      background-image:url(${cdnPath}themes/${theme.base}/symbol__${colorMode === 'dark' ? 'alpha' : 'color'}.svg);
    }
  `;
  return (
    <Box
      className={`break-content ${className} plr--x-big ptb--big br--normal ${handleCreateStyleClass(props)}`}
    >
      {children}
      {/* commom styles */}
      {styles}
      <style jsx global>
        {`
          .break-content h2 {
            font-size: ${theme.fontSizes['x-big']};
            font-weight: 400;
            line-height: 1;
          }
          .break-content h3 {
            font-size: ${theme.fontSizes.big};
            font-weight: 400;
            line-height: 1;
          }
          .break-content h6 {
            text-transform: uppercase;
          }
          .break-content ul {
            padding: 0;
            margin-${direction === 'rtl' ? 'right' : 'left'}: ${theme.spacings.big};
            margin-top: ${theme.spacings.small};
            margin-bottom: ${theme.spacings.normal};
            list-style-type: none;
          }
          .break-content li::before {
            content: '•';
            color: ${getColor('secondary.600')};
            font-weight: bold;
            display: inline-block;
            width: 16px;
            margin-${direction === 'rtl' ? 'right' : 'left'}: -16px;
          }
          .break-content p,
          .break-content a,
          .break-content li {
            font-size: ${theme.fontSizes[size] || theme.fontSizes.medium};
          }
          .break-content a,
          .break-content p,
          .break-content li {
            font-family: ${theme.fontFamilies.sans};
            line-height: 1.6;
          }
          .break-content hr {
            margin-top: ${theme.spacings.big};
            margin-bottom: ${theme.spacings.big};
          }
          .break-content p,
          .break-content h2,
          .break-content h3,
          .break-content h4,
          .break-content h5,
          .break-content h6,
          .break-content li {
            color: ${getColor('main.900')};
            font-family: ${theme.fontFamilies.sans};
            padding-top: ${theme.spacings.normal};
            padding-bottom: ${theme.spacings.normal};
          }
        `}
      </style>
    </Box>
  );
}

BreakContent.propTypes = {
  /**
   * The title of blockquote
   */
  children: PropTypes.string.isRequired,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * Font Size
   */
  size: PropTypes.oneOfType(['small', 'normal', 'medium', 'big'])
};

export default BreakContent;
