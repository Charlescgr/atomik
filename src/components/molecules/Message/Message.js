import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Message({
  iconName, iconSize, iconPosition, textColor, children, ...props
}) {
  const {
    color, borderColor
  } = props;
  const propsBlacklist = [
    'iconName',
    'iconSize',
    'iconPosition',
    'className',
    'color',
    'textColor',
    'borderColor'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { theme, getColor, direction } = useTheme();
  const colorHex = textColor ? getColor(textColor) : '';
  const borderHex = borderColor ? getColor(borderColor) : 'transparent';
  const bgHex = color ? getColor(color) : 'transparent';

  let position = '';
  switch (iconPosition) {
    case 'end':
      position = 'flex-end';
      break;
    case 'start':
      position = 'flex-start';
      break;
    default:
      position = 'center';
  }

  const { className, styles } = css.resolve`
    .message{
      background-color: ${bgHex};
      border: 1px solid ${borderHex};
      ${borderHex ? `border-radius: ${theme.configBase['border-radius']}` : ''}
    }
    .message__content,
    .message__content *{
      color: ${colorHex}
    }
  `;
  return (
    <Box
      className={`message ${className} ${handleCreateStyleClass(props)} d--flex ai--${position} ptb--normal plr--big`}
      {...allowedProps}
    >
      <Box className="message__icon">
        <Icon inline color={textColor} size={iconSize} prefix="bxs" name={iconName} className={`mt--normal m${direction === 'rtl' ? 'l' : 'r'}--big`} />
      </Box>
      <Box className={`message__content ${className}`}>
        {children}
      </Box>
      {styles}
    </Box>
  );
}

Message.defaultProps = {
  iconSize: 'normal',
  textColor: 'grey-neutral.800'
};

Message.propTypes = {
  /**
   * The icon name
   */
  iconName: PropTypes.string.isRequired,

  /**
   * The icon size
   */
  iconSize: PropTypes.string,

  /**
   * The icon vertical align
   */
  iconPosition: PropTypes.string,

  /**
   * The color for icon and text
   */
  textColor: PropTypes.string,

  /**
   * The color for icon and text
   */
  borderColor: PropTypes.string,

  /**
   * The background color
   */
  color: PropTypes.string,

  /**
   * The custom className
   */
  className: PropTypes.string,

  /**
   * The children of the component
   */
  children: PropTypes.any.isRequired
};

export default Message;
