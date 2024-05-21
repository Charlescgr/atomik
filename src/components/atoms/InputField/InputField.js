import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Icon from '../Icon';

function InputField({
  id,
  type,
  label,
  placeholder,
  name,
  onBlur,
  onChange,
  value,
  validate,
  required,
  input,
  borderColor,
  bgColor,
  textColor,
  setRef,
  checked,
  ...props
}) {
  const propsBlacklist = [
    'children',
    'id',
    'size',
    'type',
    'full',
    'validate',
    'required',
    'validate',
    'value',
    'onChange',
    'onBlur',
    'name',
    'placeholder',
    'textColor',
    'label',
    'borderColor'
  ];

  const allowedProps = omit(props, propsBlacklist);
  const inputId = id || name || (input && input.name);
  const Tag = type === 'textarea' ? 'textarea' : 'input';
  const isBoolean = (typeOf) => ['radio', 'checkbox'].indexOf(typeOf) > -1;
  const handleOnChange = onChange || (input && input.onChange) || null;
  const handleOnBlur = onBlur || (input && input.onBlur) || null;
  const inputName = name || (input && input.name);

  const {
    theme, getColor, direction, colorMode
  } = useTheme();

  const [showPass, setShowPass] = useState(false);

  const borderColorValue = borderColor !== 'transparent' ? getColor(borderColor) : 'transparent';
  const hexTextColor = getColor(textColor);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const { className, styles } = css.resolve`
  .is--small {
    padding: ${theme.spacings.small};
  }

  .is--medium {
    padding: ${theme.spacings.medium};
  }

  .is--full {
    width: 100%;
  }

  .is--big {
    padding: ${theme.spacings.big};
  }

  .input-field {
    color: ${hexTextColor};
  }
  ::-webkit-input-placeholder {
    color: ${hexTextColor};
  }
  ::-moz-placeholder {
    color: ${hexTextColor};
  }
  :-ms-input-placeholder {
    color: ${hexTextColor};
  }
  :-moz-placeholder {
    color: ${hexTextColor};
  }
  `;
  const borderColors = css.resolve`
    .input__password,
    input,
    textarea {
      border: 1px solid ${borderColorValue};
    }
    .input__password {
      padding: 0;
    }
    .input__password input {
      margin: 0;
      background: transparent;
      border: transparent;
    }
    input[type="checkbox"] ~ :global(.label:before),
    input[type="radio"] ~ :global(.label:before) {
      border: 1px solid ${borderColorValue};
    }
  `;

  const renderInput = () => {
    const component = (
      <>
        <Tag
          {...allowedProps}
          id={inputId}
          className={`input-field ${className} ${borderColors.className} ${handleCreateStyleClass(props)}`}
          name={inputName}
          value={value}
          checked={checked}
          onChange={(e) => handleOnChange && handleOnChange(isBoolean(type) ? e.target.checked : e.target.value)}
          onBlur={(e) => handleOnBlur && handleOnBlur(isBoolean(type) ? e.target.checked : e.target.value)}
          placeholder={placeholder}
          type={showPass ? 'text' : type}
          required={required}
          ref={setRef}
          {...input}
        />
      </>
    );
    if (type === 'password') {
      return (
        <div className={`input__password ${className} ${borderColors.className} ${handleCreateStyleClass(props)} ai--center jc--space-between`}>
          {component}
          <Icon name={!showPass ? 'show-alt' : 'hide'} color={borderColor} onClick={toggleShowPass} className="mr--normal" />
        </div>
      );
    }
    return component;
  };

  return (
    <React.Fragment>
      {renderInput()}

      {/* custom styles */}
      {styles}
      {borderColors.styles}

      {/* common styles */}
      <style jsx global>
        {`
          .input__password,
          input,
          textarea {
            border-radius: ${theme.configBase['border-radius']};
            -webkit-appearance: none;
            font-family: ${theme.fontFamilies.sans};
            font-size: ${theme.fontSizes.normal};
            display: block;
            max-width: 100%;
            outline: 0;
            padding: ${theme.spacings.normal};
            position: relative;
            transition: background 0.2s, border 0.2s, box-shadow 0.2s,
              color 0.2s;
          }
          .input__password {
            padding: 0;
            display: flex;
          }
          .input__password input{
            border: none;
            margin: 0;
            max-width: calc(100% - 30px);
          }

          textarea {
            min-height: 100px;
          }

          input:focus,
          textarea:focus {
            border-width: 1px;
            border-color: ${getColor('main.500')};
          }

          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(${colorMode === 'dark' ? 1 : 0});
          }

          input[type="checkbox"],
          input[type="radio"] {
            clip: rect(0, 0, 0, 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            position: absolute;
            width: 1px;
          }

          input[type="checkbox"] ~ .label,
          input[type="radio"] ~ .label {
            display: block;
            line-height: 1.2rem;
            position: relative;
            padding-${direction === 'rtl' ? 'right' : 'left'}: 26px;
          }

          input[type="checkbox"] ~ .label:before,
          input[type="radio"] ~ .label:before {
            box-sizing: border-box;
            content: "";
            display: inline-block;
            width: 18px;
            height: 18px;
            position: absolute;
            ${direction === 'rtl' ? 'right' : 'left'}: 0;
            top: 50%;
            background-color: ${bgColor};
            transform: translateY(-50%);
            transition: background-color 0.3s ease, border-color 0.3s ease,
              border-color 0.3s ease;
          }

          input[type="checkbox"] ~ .label:before {
            border-radius: ${theme.configBase['border-radius']};
          }

          input[type="radio"] ~ .label:before {
            border-radius: 16px;
          }

          input[type="checkbox"]:checked ~ .label:before {
            content: "✓";
            color: #fff;
            font-size: 0.7rem;
            text-align: center;
            line-height: 1.5;
            border-color: transparent;
            background-color: ${getColor('main.300')};
          }

          input[type="radio"]:checked ~ .label:before {
            border-width: 5px;
            border-color: ${getColor('main.400')};
          }

          input[type="checkbox"].is--small ~ .label,
          input[type="radio"].is--small ~ .label {
            padding-${direction === 'rtl' ? 'right' : 'left'}: 20px;
          }

          input[type="checkbox"].is--small ~ .label:before,
          input[type="radio"].is--small ~ .label:before {
            width: 14px;
            height: 14px;
          }

          input[type="checkbox"].is--small:checked ~ .label:before,
          input[type="radio"].is--small:checked ~ .label:before {
            font-size: 0.6rem;
            line-height: 1.4;
          }

          input[type="checkbox"].is--big ~ .label,
          input[type="radio"].is--big ~ .label {
            padding-${direction === 'rtl' ? 'right' : 'left'}: 34px;
          }

          input[type="checkbox"].is--big ~ .label:before,
          input[type="radio"].is--big ~ .label:before {
            width: 24px;
            height: 24px;
          }

          input[type="checkbox"].is--big:checked ~ .label:before,
          input[type="radio"].is--big:checked ~ .label:before {
            font-size: 1rem;
            line-height: 1.4;
          }

          input[type=search]::-ms-clear,
          input[type=search]::-ms-reveal {
            display: none;
            width: 0;
            height: 0;
          }
          input[type="search"]::-webkit-search-decoration,
          input[type="search"]::-webkit-search-cancel-button,
          input[type="search"]::-webkit-search-results-button,
          input[type="search"]::-webkit-search-results-decoration {
            -webkit-appearance:none;
          }
        `}
      </style>
    </React.Fragment>
  );
}

InputField.defaultProps = {
  size: 'normal',
  validate: true,
  type: 'input',
  textColor: 'main.500',
  bgColor: 'transparent',
  borderColor: 'grey-neutral.200'
};

InputField.propTypes = {
  /**
   * The label of input
   */
  label: PropTypes.string,

  /**
   * The className prop
   */
  className: PropTypes.string,

  /**
   * The style prop
   */
  style: PropTypes.object,

  /**
   * Render size of the field
   */
  size: PropTypes.string,

  /**
   * Indicate if should render message validators
   */
  validate: PropTypes.bool,

  /**
   * Indicate if should render message validators
   */
  checked: PropTypes.bool,

  /**
   * The placeholder of the field
   */
  placeholder: PropTypes.string,

  /**
   * The placeholder of the field
   */
  borderColor: PropTypes.string,

  /**
   * The background of the input
   */
  bgColor: PropTypes.string,

  /**
   * The color of text and placeholder
   */
  textColor: PropTypes.string,

  /**
   * The id of the field
   */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The name of the field
   */
  name: PropTypes.string,

  /**
   * The current value
   */
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),

  /**
   * An input element, usually used together redux-form
   */
  input: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),

  /**
   * If field is required.
   */
  required: PropTypes.bool,

  /**
   * The type of field
   */
  type: PropTypes.string,

  /**
   * The change handler that will receive the updated value as it's only param
   */
  onChange: PropTypes.func,

  /**
   * The blur handler that will receive the updated value as it's only param
   */
  onBlur: PropTypes.func,

  /**
   * Full width box
   */
  full: PropTypes.bool,

  /**
   * An ref element
   */
  setRef: PropTypes.any
};

export default InputField;
