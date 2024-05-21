import React from 'react';
import PropTypes from 'prop-types';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function BlockquoteInText({
  title, text, children, ...props
}) {
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  return (
    <blockquote
      className={`blockquote__in-text ${colorMode === 'dark' ? 'bc--grey-neutral-100' : 'bc--secondary-50'} ptb--x-big pr--big c--main-900 ${handleCreateStyleClass(props)}`}
    >
      {title && (
        <strong className={`${colorMode === 'dark' ? 'c--main-600' : 'c--main-400'} d--block`}>{title}</strong>
      )}
      {text || children}
      <style jsx>
        {`
          // commom styles
          .blockquote__in-text{
            font-family: ${theme.fontFamilies.sans};
            font-size: ${theme.fontSizes.normal};
            line-height: 1.5em;
            padding-${direction === 'rtl' ? 'right' : 'left'}: 32px;
            border-${direction === 'rtl' ? 'right' : 'left'}: 4px solid ${getColor('main.400')};
          }
        `}
      </style>
    </blockquote>
  );
}

BlockquoteInText.propTypes = {
  /**
   * The title of blockquote
   */
  title: PropTypes.string,

  /**
   * The text of blockquote
   */
  text: PropTypes.string,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * The children element
   */
  children: PropTypes.any,
};

export default BlockquoteInText;
