import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';

function InputSelect({
  id,
  name,
  options,
  ...props
}) {
  const propsBlacklist = [
    'id',
    'name',
    'options',
    'className'
  ];

  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve``;

  return (
    <select
      {...allowedProps}
      id={id}
      className={`input-select ${className} ${handleCreateStyleClass(props)}`}
      name={name}
    >
      {options.map(({ value, label }) => (
        <option key={label} value={value}>{label}</option>
      ))}

      {styles}
    </select>
  );
}

InputSelect.defaultProps = {
  className: ''
};

InputSelect.propTypes = {
  /**
   * The className prop
   */
  className: PropTypes.string,

  /**
   * The name of the field
   */
  name: PropTypes.string.isRequired,

  /**
   * The options list
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,

  /**
   * The id of the field
   */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Full width box
   */
  full: PropTypes.bool,

  /**
   * Render size of the field
   */
  size: PropTypes.string,

};

export default InputSelect;
