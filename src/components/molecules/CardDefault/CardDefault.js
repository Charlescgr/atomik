import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function CardDefault({
  shadow, rounded, borderColor, children, ...props
}) {
  const propsBlacklist = [
    'shadow',
    'rounded',
    'borderColor',
    'color',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { theme, getColor } = useTheme();
  const borderHex = borderColor ? getColor(borderColor) : 'transparent';

  const { className, styles } = css.resolve`
   .card{
      border: 1px solid ${borderHex};
      ${rounded ? `border-radius: ${theme.configBase['border-radius']};` : ''}
      ${shadow ? `box-shadow: ${theme.shadows.small};` : ''}
    }
  `;

  return (
    <Box
      className={`card ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {children}
      {/* common and custom styles */}
      {styles}
    </Box>
  );
}

CardDefault.defaultProps = {
  shadow: false,
  rounded: false,
  borderColor: 'transparent',
  color: 'white'
};

CardDefault.propTypes = {
  /**
   * If the card has box-shados.
   */
  shadow: PropTypes.bool,

  /**
   * If the card has rounded border.
   */
  rounded: PropTypes.bool,

  /**
   * The border color.
   */
  borderColor: PropTypes.string,

  /**
   * The color of background.
   */
  color: PropTypes.string,

  /**
   * The children content.
   */
  children: PropTypes.any,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string

};

export default CardDefault;
