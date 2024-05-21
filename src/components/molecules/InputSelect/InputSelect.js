import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import InputField from '../../atoms/InputField';
import Button from '../../atoms/Button';
import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';

function InputSelect({
  id,
  name,
  size,
  full,
  fontSize,
  options,
  required,
  borderColor,
  placeholder,
  onChange,
  ...props
}) {
  const propsBlacklist = [
    'id',
    'name',
    'size',
    'full',
    'rounded',
    'borderColor',
    'options',
    'onChange',
    'fontSize',
    'required',
    'className',
    'value'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { theme, getColor, colorMode } = useTheme();

  const [clicked, setClicked] = useState(false);
  const [widthSize, setWidthSize] = useState();
  const [selected, setSelected] = useState({
    value: '',
    label: placeholder || ''
  });

  const refSelect = useRef();
  const fSize = fontSize || size;
  const { rounded } = props;

  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleSelected = (value, label) => {
    setClicked(!clicked);
    setSelected({ value, label });
    setWidthSize(`${refSelect.current.scrollWidth}px`);
    onChange(value);
  };

  const { className, styles } = css.resolve`
    .select {
      border: 1px solid ${borderColor ? getColor(borderColor) : 'transparent'};
    }
    .select__list{
      top: 95%;
      max-height: 240px;
      overflow-y: scroll;
      border-top: 2px solid ${getColor('grey-neutral.50')};
      opacity: 0;
      transform: translateY(-30px);
      transition: all 200ms ease-out;
      visibility: hidden;
    }
    .select__list.opened{
      opacity: 1;
      transform: translate(0px);
      visibility: visible;
    }
    .select__icon{
      transform: rotate(0deg);
      transition: all 200ms ease-out;
    }
    .select__icon.open{
      transform: rotate(180deg);
    }
    .list__item:hover{
      background-color: ${getColor(colorMode === 'dark' ? 'main.400' : 'main.100')}
    }
    .is--rounded {
      border-radius: ${theme.configBase['border-radius']};
    }
  `;

  return (
    <Box
      {...allowedProps}
      id={id}
      className={`select ${className} ${handleCreateStyleClass(props)}`}
    >
      <div
        ref={refSelect}
        className="d--flex jc--space-between p--relative"
        style={{ width: `${widthSize}` }}
      >
        <Button
          size="custom"
          onClick={handleClick}
          textColor="main.800"
          className={`${full ? 'w--100 ' : ''}${rounded ? 'br--small ' : ''}p--${size} fs--${fSize}`}
        >
          {selected.label}
        </Button>
        <Button
          onlyIcon
          textColor="white"
          color="main.500"
          onClick={handleClick}
          className={`${rounded ? 'brr--small' : ''}`}
        >
          <Span className={`select__icon ${className} ${clicked ? 'open' : ''} lh--0`}>
            <Icon name="chevron-down" color="white" size={fSize} />
          </Span>
        </Button>
        <InputField
          borderColor="transparent"
          type="hidden"
          name={name}
          required={required}
          value={selected.value}
          className="bc--transparent p--absolute"
        />
        <List className={`select__list ${className} ${clicked ? 'opened' : ''} ${full ? ' w--100' : ''} bs--small p--absolute ${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} zi--5`}>
          <li className={`list__item ${className} m--0 p--0`}>
            <Button
              size="custom"
              textColor="main.800"
              className={`list__link ${className}${full ? ' w--100 ' : ''}p--${size} fs--${fSize}`}
              onClick={() => handleSelected('', placeholder)}
            >
              {placeholder}
            </Button>
          </li>
          {options.map(({ value, label }) => (
            <li key={label} className={`list__item ${className} m--0 p--0`}>
              <Button
                size="custom"
                textColor="main.800"
                className={`list__link ${className}${full ? ' w--100 ' : ''}p--${size} fs--${fSize}`}
                onClick={() => handleSelected(value, label)}
              >
                {label}
              </Button>
            </li>
          ))}
        </List>
      </div>

      {styles}
    </Box>
  );
}

InputSelect.defaultProps = {
  placeholder: 'Select one option',
  rounded: false,
  size: 'normal'
};

InputSelect.propTypes = {
  /**
   * The className prop
   */
  className: PropTypes.string,

  /**
   * The change handler that will receive the updated value as it's only param
   */
  onChange: PropTypes.func,

  /**
   * The size of select
   */
  size: PropTypes.string,

  /**
   * If the select buttons is rounded or no.
   */
  rounded: PropTypes.bool,

  /**
   * The font-size
   */
  fontSize: PropTypes.string,

  /**
   * If field is required.
   */
  required: PropTypes.bool,

  /**
   * The name of the field
   */
  name: PropTypes.string.isRequired,

  /**
   * The placeholder text
   */
  placeholder: PropTypes.string,

  /**
   * The options list
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * The border color style
   */
  borderColor: PropTypes.string,

};

export default InputSelect;
