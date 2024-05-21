/* eslint-disable react/destructuring-assignment */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

const BoxComponent = forwardRef(({ type: Box, children, ...props }, ref) => {
  const propsBlacklist = [
    'children',
    'className',
    'type'
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <Box
      ref={ref}
      className={handleCreateStyleClass(props)}
      {...allowedProps}
    >
      {!props?.dangerouslySetInnerHTML ? children : null}
    </Box>
  );
});

BoxComponent.displayName = 'BoxComponent';

BoxComponent.defaultProps = {
  type: 'div'
};

BoxComponent.propTypes = {
  /**
   * The type for the box section, div etc.
   */
  type: PropTypes.oneOf(['section', 'div', 'main']),

  /**
   * The children element
   */
  children: PropTypes.any,

  /**
   * The dangerouslySetInnerHTML element
   */
  dangerouslySetInnerHTML: PropTypes.object,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The ref prop.
   */
  ref: PropTypes.any
};

export default BoxComponent;
