import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Label({
  children, inputId, required, ...props
}) {
  const propsBlacklist = ['children', 'className', 'for', 'required', 'textColor', 'inputId'];
  const allowedProps = omit(props, propsBlacklist);

  const { theme } = useTheme();

  return (
    <label
      className={`label ${handleCreateStyleClass(props)}`}
      htmlFor={inputId}
      {...allowedProps}
    >
      {children}
      {required && <span title="*">*</span>}
      <style jsx global>
        {`
          label {
            cursor: pointer;
            font-family: ${theme.fontFamilies.serif};
            font-size: ${theme.fontSizes.normal};
          }
        `}
      </style>
    </label>
  );
}

Label.defaultProps = {
  textColor: 'grey-neutral.300'
};

Label.propTypes = {
  /**
   * The label
   */
  children: PropTypes.any.isRequired,

  /**
   * The className of the label
   */
  className: PropTypes.string,

  /**
   * The id of the related input
   */
  inputId: PropTypes.string,

  /**
   * The color of text
   */
  textColor: PropTypes.string,

  /**
   * Whether the field is required
   */
  required: PropTypes.bool
};

export default Label;
