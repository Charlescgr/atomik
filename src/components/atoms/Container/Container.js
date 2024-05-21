import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

function Container({
  children, brandWeek, ...props
}) {
  const propsBlacklist = [
    'children',
    'className',
    'brandWeek',
    'wrap'
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <div
      className={`container ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {children}
      <style jsx>
        {`
        // commom styles
        .container {
          box-sizing: border-box;
          max-width: 100%;
          width: 100%;
        }
        .wrap{
          max-width: ${brandWeek ? '1012px' : '1076px'};
          margin: 0 auto;
        }
        `}
      </style>
    </div>
  );
}

Container.defaultProps = {
  wrap: false,
  brandWeek: false
};

Container.propTypes = {
  /**
   * Informs if the container receives the brandWeek configuration
   */
  brandWeek: PropTypes.bool,

  /**
   * Inform if the component is wrapped ans centralized, or not
   */
  wrap: PropTypes.bool,

  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Container;
