import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

function Row({
  children, ...props
}) {
  const propsBlacklist = [
    'children',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <div
      className={`row ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {children}
      <style jsx>
        {`
        // common styles
        .row{
          box-sizing: border-box;
          flex-direction: row;
          flex-wrap: wrap;
          display: flex;
          width: 100%;
        }
        `}
      </style>
    </div>
  );
}

Row.propTypes = {
  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Row;
