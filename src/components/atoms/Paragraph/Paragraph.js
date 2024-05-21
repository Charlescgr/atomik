import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Paragraph({ children, ...props }) {
  const { theme } = useTheme();

  const propsBlacklist = [
    'children',
    'className',
    'size',
    'textColor'
  ];
  const allowedProps = omit(props, propsBlacklist);

  return (
    <>
      <p
        className={`${handleCreateStyleClass(props, 'text')}`}
        {...allowedProps}
      >
        {children}
      </p>

      <style jsx global>
        {`
          // commom styles, global
          p {
            font-family: ${theme.fontFamilies.serif};
            font-size: ${theme.fontSizes.normal};
            line-height: 2em;
            letter-spacing: 0.02em;
          }
        `}
      </style>
    </>
  );
}

Paragraph.defaultProps = {
  textColor: 'grey-neutral.800'
};

Paragraph.propTypes = {
  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The font size
   */
  size: PropTypes.string,

  /**
   * Text color
   */
  textColor: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Paragraph;
