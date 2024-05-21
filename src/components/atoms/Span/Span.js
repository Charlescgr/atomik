import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Span({ color, children, ...props }) {
  // -- allowed props
  const propsBlacklist = [
    'className',
    'color',
    'textColor'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { getColor } = useTheme();

  const { className, styles } = css.resolve`
    .span {
      ${color ? `background-color: ${getColor(color)};` : ''}
    }
  `;

  return (
    <>
      <span
        className={`span ${className} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        {children}
      </span>
      {/* common styles */}
      {styles}
    </>
  );
}
Span.defaultProps = {
  textColor: 'grey-neutral.800',
  color: 'transparent'
};

Span.propTypes = {

  /**
   * The text for the Link
   */
  children: PropTypes.any,

  /**
   * The background color
   */
  color: PropTypes.string,

  /**
   * Text color
   */
  textColor: PropTypes.string,

  /**
   * The custom classNames
   */
  className: PropTypes.string
};

export default Span;
