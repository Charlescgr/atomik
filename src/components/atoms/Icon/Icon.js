import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { Icon as Iconify, InlineIcon } from '@iconify/react';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import usedIcon from './usedIcons';

function Icon({
  name,
  prefix,
  color,
  size,
  customWidth,
  inline,
  rotate,
  ...props
}) {
  const { theme, getColor } = useTheme();

  const colorHex = color ? getColor(color) : '';

  let width = '';

  // eslint-disable-next-line
  const i = usedIcon[`${prefix}-${name}`];

  switch (size) {
    case 'small':
      width = theme.sizes['2']; // 2x = 16px
      break;
    case 'normal':
      width = theme.sizes['3']; // 3x = 24px
      break;
    case 'medium':
      width = theme.sizes['4']; // 4x = 32px
      break;
    case 'x-medium':
      width = theme.sizes['5']; // 5x = 40px
      break;
    case 'big':
      width = theme.sizes['6']; // 6x = 48px
      break;
    case 'x-big':
      width = theme.sizes['7']; // 7x = 56px
      break;
    case 'custom':
      width = customWidth;
      break;
    default:
      width = theme.sizes['3']; // same normal = 3x
  }

  const propsBlacklist = [
    'name',
    'prefix',
    'color',
    'size',
    'customWidth',
    'className',
    'inline',
    'type',
    'rotate'
  ];

  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    svg.iconify {
      min-width: ${width};
    }
  `;

  const renderIcon = () => {
    if (inline) {
      return (
        <InlineIcon
          icon={i?.default}
          width={width}
          className={`iconify ${className} ${handleCreateStyleClass(props)}`}
          color={colorHex}
          rotate={rotate}
          {...allowedProps}
        />
      );
    }

    return (
      <Iconify
        icon={i?.default}
        width={width}
        className={`iconify ${className} ${handleCreateStyleClass(props)}`}
        color={colorHex}
        rotate={rotate}
        {...allowedProps}
      />
    );
  };

  return (
    <>
      {renderIcon()}
      {styles}
    </>
  );
}

Icon.defaultProps = {
  prefix: 'bx',
  inline: false
};

Icon.propTypes = {
  /**
   * The name of the icon
   */
  name: PropTypes.string.isRequired,

  /**
   * The prefix eg: 'bx', 'bxs', 'bxl'
   */
  prefix: PropTypes.string,

  /**
   * The size of the icon. eg: 'medium, big or x-big'
   */
  size: PropTypes.string,

  /**
   * The custom size of the icon. eg: '100px'
   */
  customWidth: PropTypes.string,

  /**
   * The color of the icon
   */
  color: PropTypes.string.isRequired,

  /**
   * If the icon will be displayed inline or in block
   */
  inline: PropTypes.bool,

  /**
   * The rotation angle, 90|180|270
   */
  rotate: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Icon;
