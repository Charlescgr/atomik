import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import InputField from '../../atoms/InputField';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function InputRangeDouble({
  minValue, maxValue, returnRange, ...props
}) {
  const { getColor } = useTheme();

  // -- states
  const [currentMinVal, setCurrentMinVal] = useState(minValue + 50);
  const [currentMaxVal, setCurrentMaxVal] = useState(maxValue - 50);

  const [posMinDrop, setPosMinDrop] = useState(0);
  const [posMaxDrop, setPosMaxDrop] = useState(100);

  // -- allowed props
  const propsBlacklist = [
    'minValue',
    'maxValue',
    'returnRange',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- css/style
  const widthDrop = 30;
  const { className, styles } = css.resolve`
    .drop{
      width: ${widthDrop}px;
      height: ${widthDrop}px;
      border-radius: 50% 50% 50% 0;
      background: ${getColor('main.500')};
      transform: rotate(-45deg);
      left: 0%;
      top: 0%;
    }
    .drop__text{
      transform: rotate(45deg);
    }
    .range-bar{
      height: 8px;
      top: 45px;
      border-radius: 8px;
      background: ${getColor('main.500')};
    }
    .input-range{
      border: 1px solid ${getColor('grey-cold.100')};;
      height: 64px;
    }
    .input-range__element{
      border: 1px solid ${getColor('grey-cold.100')};
      height: 8px;
      top: 45px;
      pointer-events: none;
    }

    .input-range__element::-webkit-slider-thumb {
      height: 16px;
      width: 16px;
      border-radius: 24px;
      -webkit-appearance: none;
    }
    .input-range__element::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 24px;
    }
    .input-range__element::-ms-thumb {
      height: 16px;
      width: 16px;
      border-radius: 24px;
    }

    .input-range__element:focus::-webkit-slider-thumb{
      outline: 2px solid ${getColor('grey-cold.100')};
      outline-offset: 3px;
    }
    .input-range__element:focus::-moz-range-thumb{
      outline: 2px solid ${getColor('grey-cold.100')};
      outline-offset: 3px;
    }
    .input-range__element:focus::-ms-thumb{
      outline: 2px solid ${getColor('grey-cold.100')};
      outline-offset: 3px;
    }

    _:-ms-lang(x), .input-range__element {
      display: inline;
      pointer-events: all;
    }
    .input-range__element::-webkit-slider-thumb {
      pointer-events: all;
    }
    .input-range__element::-moz-range-thumb {
      pointer-events: all;
    }
    .input-range__element::-ms-thumb {
      pointer-events: all;
    }
    .input-range__element::-moz-range-thumb {
      background-color: #999;
      pointer-events: all;
    }
    .input-range__element::-ms-thumb {
      pointer-events: all;
    }

    .input__min{
      background-color: transparent;
    }
    .input__min::-webkit-slider-thumb {
      background: green;
    }
    .input__min::-moz-range-thumb {
      background: green;
    }
    .input__min::-ms-thumb {
      background: green;
    }
    .input__max{
      background-color: transparent;
      border: none;
    }
    .input__max::-webkit-slider-thumb {
      background: red;
    }
    .input__max::-moz-range-thumb {
      background: red;
    }
    .input__max::-ms-thumb {
      background: red;
    }
  `;

  // -- scripts
  const handleMinRange = (v) => {
    returnRange(v);
    setPosMinDrop((((v - widthDrop / 2) * 100) / maxValue));
    setCurrentMinVal(v);
  };

  const handleMaxRange = (v) => {
    returnRange(v);
    setPosMaxDrop((((v - widthDrop / 2) * 100) / maxValue));
    setCurrentMaxVal(v);
  };

  return (
    <Box
      className={`input-range__double ${className} p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box
        className={`drop drop--min ${className} d--flex ai--center jc--center p--absolute m--0`}
        style={{ left: `${posMinDrop}%` }}
      >
        <Span className={`drop__text ${className} ff--sans c--white`}>{currentMinVal}</Span>
      </Box>
      <Box
        className={`drop drop--max ${className} d--flex ai--center jc--center p--absolute m--0`}
        style={{ left: `${posMaxDrop}%` }}
      >
        <Span className={`drop__text ${className} ff--sans c--white`}>{currentMaxVal}</Span>
      </Box>
      <Box
        className={`range-bar ${className} p--absolute`}
        style={{ left: `${posMinDrop}%`, width: `${(posMaxDrop - posMinDrop)}%` }}
      >
      </Box>
      <InputField
        type="range"
        min={minValue}
        step="1"
        vvalue={currentMinVal}
        max={maxValue}
        onChange={(v) => handleMinRange(v)}
        className={`input-range__element input__min ${className} p--absolute p--0 m--0 w--100 l--0 d--block`}
      />
      <InputField
        type="range"
        min={minValue}
        step="1"
        vvalue={currentMaxVal}
        max={maxValue}
        onChange={(v) => handleMaxRange(v)}
        className={`input-range__element input__max ${className} p--absolute p--0 m--0 w--100 l--0 d--block`}
      />

      {/* custom styles */}
      {styles}
    </Box>
  );
}

InputRangeDouble.propTypes = {
  /**
   * min value from range
   */
  minValue: PropTypes.number,

  /**
   * Max value from range
   */
  maxValue: PropTypes.number,

  /**
   * Return selected filters
   */
  returnRange: PropTypes.func,

  /**
   * The custom classnames
   */
  className: PropTypes.string
};

export default InputRangeDouble;
