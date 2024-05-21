import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function List({
  // eslint-disable-next-line no-shadow
  type: List, children, ...props
}) {
  const { theme } = useTheme();

  const propsBlacklist = [
    'children',
    'className',
    'type'
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <>
      <List
        className={handleCreateStyleClass(props)}
        {...allowedProps}
      >
        {children}
      </List>

      <style jsx global>
        {`
        // common styles, global
        li {
          font-size: ${theme.fontSizes.normal};
        }
      `}
      </style>
    </>
  );
}

List.defaultProps = {
  type: 'ul'
};

List.propTypes = {
  /**
   * The type for the List ul or ol.
   */
  type: PropTypes.string,

  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default List;
