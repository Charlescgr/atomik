import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Divider({
  type, size, color, ...props
}) {
  const { theme, getColor } = useTheme();

  const colorHex = getColor(color);

  const propsBlacklist = [
    'children',
    'className',
    'size',
    'color',
    'type'
  ];
  const allowedProps = omit(props, propsBlacklist);

  let height;
  switch (size) {
    case 'small':
      height = theme.sizes['0-5'];
      break;
    case 'big':
      height = theme.sizes['2'];
      break;
    default:
      height = theme.sizes['1'];
  }

  const border = `repeating-linear-gradient( -45deg, transparent 0px, transparent 2px, ${colorHex} 2px, ${colorHex} 4px )`;

  return (
    <>
      <hr
        className={`divider w--100 is--${type} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      />
      <style jsx>
        {`
          // custom styles
          .divider {
            height: ${height};
          }
          .is--solid {
            border: 0;
            background-image: linear-gradient(to right, ${colorHex} 0%, ${colorHex} 10%);
            background-size: 10px 1px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
          .is--dashed {
            border: 0;
            background-image: linear-gradient(to right, ${colorHex} 45%, transparent 0%);
            background-size: 7px 1px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
          .is--dotted {
            border: 0;
            background-image: linear-gradient(to right, transparent 75%, ${colorHex} 5%);
            background-size: 4.5px 1.50px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
          .is--normal {
            border: 0;
            background: ${border};
          }
        `}
      </style>
    </>
  );
}

Divider.defaultProps = {
  type: 'normal',
  size: 'normal'
};

Divider.propTypes = {
  /**
   * The style of the Divider, eg: 'dashed', 'normal'
   */
  type: PropTypes.string,

  /**
   * Color of Divider
   */
  color: PropTypes.string.isRequired,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * The size of the divider/hr. eg: 'small, medium, big or x-big'
   */
  size: PropTypes.string
};

export default Divider;
