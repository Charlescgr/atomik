import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';

function Excerpt({ color, content, ...props }) {
  if (!content) return null;
  const { theme, getColor, direction } = useTheme();

  const colorHex = (color) ? getColor(color) : 'transparent';
  const propsBlacklist = [
    'content',
    'color',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .article-exerpt{
      font-family: ${theme.fontFamilies.sans};
      font-size: ${theme.fontSizes['x-normal']};
      line-height: 1.5em;
      border-${direction === 'rtl' ? 'right' : 'left'}: 4px solid ${colorHex};
      padding-${direction === 'rtl' ? 'right' : 'left'}: 20px;
    }
  `;

  return (
    <>
      <Box
        className={`article-exerpt ${className} ${handleCreateStyleClass(props)} mtb--normal pr--normal ptb--small c--grey-neutral-800`}
        {...allowedProps}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* common styles */}
      {styles}
      <style jsx global>
        {`
          .article-exerpt *{
            font-family: ${theme.fontFamilies.sans};
            font-size: ${theme.fontSizes['x-normal']};
            line-height: 1.5em;
            color: ${getColor('grey-neutral.800')};
          }
          .article-exerpt a {
            color: ${getColor('secondary.600')};
            border-bottom-style: dotted;
            border-bottom-width: 1px;
            border-bottom-color: ${getColor('secondary.600')};
          }
      `}
      </style>
    </>
  );
}

Excerpt.propTypes = {
  /**
   * The color of border hightlight
   */
  color: PropTypes.string.isRequired,

  /**
   * The content
   */
  content: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Excerpt;
