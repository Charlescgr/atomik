import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';

function InputRange({
  id,
  name,
  onChange,
  value,
  ...props
}) {
  const { getColor, direction } = useTheme();
  const refInput = useRef(null);
  const [style, setStyle] = useState();
  const propsBlacklist = [
    'id',
    'name',
    'onChange',
    'className'
  ];

  const allowedProps = omit(props, propsBlacklist);

  const calcProgresPosition = (el) => {
    const valPos = ((el.value - el.min) / (el.max - el.min)) * 100;
    const colorBg = getColor('grey-neutral.50');
    const colorProgress = getColor('main.600');
    setStyle(`linear-gradient(to ${direction === 'rtl' ? 'left' : 'right'}, ${colorProgress} 0%, ${colorProgress} ${valPos}%, ${colorBg} ${valPos}%, ${colorBg} 100%)`);
  };
  const handleOnChange = (el) => {
    calcProgresPosition(el);
    onChange(el.value);
  };
  useEffect(() => {
    calcProgresPosition(refInput);
  }, [style]);

  return (
    <Box
      className={`input-range-wrapper ${handleCreateStyleClass(props)} d--flex ai--center jc--center`}
      {...allowedProps}
    >
      <input
        ref={refInput}
        id={id}
        name={name}
        {...allowedProps}
        type="range"
        onChange={(e) => handleOnChange(e.target)}
        className="input-range p--0 m--0"
        style={{ background: style }}
      />
      <style jsx>
        {`
          input[type='range'] {
            background: linear-gradient(to ${direction === 'rtl' ? 'left' : 'right'}, ${getColor('main.600')} 0%, ${getColor('main.600')} 50%, ${getColor('grey-neutral.100')} 50%, ${getColor('grey-neutral.100')} 100%);
            border: solid 1px ${getColor('grey-neutral.100')};
            border-radius: 16px;
            outline: none;
            transition: background 450ms ease-in;
            width:100%;
            height:8px;
            -webkit-appearance: none;
            margin:0;
            padding:0;
          }
          input[type='range']::-webkit-slider-runnable-track {
            height: 8px;
            width:95%;
          }
          input[type='range']::-moz-slider-runnable-track {
            height: 8px;
            width:95%;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            background: ${getColor('main.400')};
            border-radius: 50%;
            cursor: pointer;
            height: 20px;
            width: 20px;
            border: 0;
            margin-top: -6px;
          }

          input[type='range']::-moz-range-thumb {
            -webkit-appearance: none;
            background: ${getColor('main.400')};
            border-radius: 50%;
            cursor: pointer;
            height: 20px;
            width: 20px;
            border: 0;
            margin-top: -6px;
          }
        `}
      </style>
    </Box>
  );
}

InputRange.defaultProps = {
  className: ''
};

InputRange.propTypes = {
  /**
   * The className prop
   */
  className: PropTypes.string,

  /**
   * The change handler that will receive the updated value as it's only param
   */
  onChange: PropTypes.func,

  /**
   * The name of the field
   */
  name: PropTypes.string.isRequired,

  /**
   * The value number
   */
  value: PropTypes.number,

  /**
   * The max value from the range
   */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * The min value from the range
   */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

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

export default InputRange;
