import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

import Icon from '../../atoms/Icon';

function Loading({
  color, type, size, customWidth, name, loading, ...props
}) {
  const propsBlacklist = [
    'size',
    'loading',
    'color',
    'type',
    'name',
    'customWidth',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`

    // -- rotate
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

    // -- animation
    .is--loading{ // this solution is better, but doesn't work
      // animation: 'rotate 1s infinite ease-in-out';
    }
    .loading__rotate.is--loading{
      animation: rotate 1s infinite ease-in-out;
    }
  `;

  return (
    <>
      <Icon
        type="regular"
        size={size}
        customWidth={customWidth}
        name={name}
        color={color}
        className={`loading__rotate ${className}${loading ? ' is--loading' : ' is--stoped '} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      />
      {/* common styles */}
      {styles}
    </>
  );
}

Loading.defaultProps = {
  loading: true,
  size: 'normal',
  color: 'grey-cold.100',
  type: 'rotate',
  name: 'refresh'
};

Loading.propTypes = {
  /**
   * The color of background
   */
  color: PropTypes.string,

  /**
   * The size of the animated icon
   */
  size: PropTypes.string,

  /**
   * Informs if the content is loading or not, with state
   */
  loading: PropTypes.bool,

  /**
   * The type of Loading.
   */
  type: PropTypes.oneOf(['rotate']),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,
  /**
   * The name of the icon
   */
  name: PropTypes.string,

  /**
   * The custom size of the icon. eg: '100px'
   */
  customWidth: PropTypes.string,
};

export default Loading;
