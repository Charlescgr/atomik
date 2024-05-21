import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, lightenDarkenColor } from '../../_settings/Utils';

function Button({
  children, invertOnHover, withAnimation, type, ...props
}) {
  const {
    color, borderColor, textColor
  } = props;
  const { theme, getColor } = useTheme();

  const colorHex = (color) ? getColor(color) : 'white';
  const borderColorHex = (borderColor) ? getColor(borderColor) : getColor(color);

  const propsBlacklist = [
    'type',
    'children',
    'className',
    'textColor',
    'borderColor',
    'rounded',
    'color',
    'size',
    'hasIcon',
    'invertOnHover',
    'withAnimation',
    'onlyIcon'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .button{
      display: flex;
      align-items: center;
      appearance: none;
      outline: none;
      cursor: pointer;
      font-family: ${theme.fontFamilies.sans};
      align-items:center;
      transition: background 200ms ease, transform 200ms ease, box-shadow 400ms ease-out;
    }

    .button:focus,
    .button:active {
      outline: none;
    }

    .is--rounded {
      border-radius: ${theme.configBase['border-radius']};
    }

    .hover-effect--shadow {
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    }

    .hover-effect--shadow:hover:not(.is--disabled) {
      box-shadow: -5px 5px 0px 0px rgba(0, 0, 0, 0.3);
    }

    .button.is--disabled,
    .button:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    // sizes
    .is--small {
      font-size: ${theme.fontSizes.small};
      padding-top: ${theme.spacings.small};
      padding-bottom: ${theme.spacings.small};
      padding-left: ${theme.spacings.normal};
      padding-right: ${theme.spacings.normal};
    }
    .is--normal {
      padding-top: ${theme.spacings.normal};
      padding-bottom: ${theme.spacings.normal};
      padding-left: ${theme.spacings.big};
      padding-right: ${theme.spacings.big};
      font-size: ${theme.fontSizes.normal};
      line-height:1.5
    }
    .is--medium {
      padding-top: ${theme.spacings.medium};
      padding-bottom: ${theme.spacings.medium};
      padding-left: ${theme.spacings['x-medium']};
      padding-right: ${theme.spacings['x-medium']};
      font-size: ${theme.fontSizes.medium};
    }
    .is--big {
      padding-top: ${theme.spacings.big};
      padding-bottom: ${theme.spacings.big};
      padding-left: ${theme.spacings['x-big']};
      padding-right: ${theme.spacings['x-big']};
      font-size: ${theme.fontSizes.big};
    }

    // onlyIcon
    .is--action.is--small {
      padding: ${theme.spacings.small};
    }
    .is--action.is--normal {
      padding: ${theme.spacings.normal};
    }
    .is--action.is--medium {
      padding: ${theme.spacings.medium};
    }
    .is--action.is--big {
      padding: ${theme.spacings.big};
    }

    .is--full-rounded {
      padding: 0;
      border-radius: 50%;
    }
  `;
  const colors = css.resolve`
    .button__background-color {
      background-color: ${colorHex};
    }
    .button__text-color {
      ${textColor && `color: ${getColor(textColor)};`}
    }
  `;

  const hoverColor = () => {
    const invertedStyles = `color: ${getColor(color)}; background-color: ${getColor(textColor)};`;
    let styleHover = '';
    if (withAnimation) {
      if (colorHex === 'transparent') {
        styleHover = 'opacity: 0.5;';
      } else if (invertOnHover) {
        styleHover = invertedStyles;
      } else {
        styleHover = `background-color: ${getColor('main.400')};`;
      }
    } else if (invertOnHover) {
      styleHover = invertedStyles;
    } else if (colorHex === 'transparent' || colorHex === '#fff') {
      styleHover = 'opacity: 0.5;';
    } else {
      styleHover = `background-color: ${lightenDarkenColor(`${colorHex}`, -30)};`;
    }
    return styleHover;
  };

  return (
    <>
      <button
        className={`button ${className} ${colors.className} button__background-color button__text-color ${handleCreateStyleClass({ ...props, withAnimation })}`}
        // eslint-disable-next-line react/button-has-type
        type={type || 'button'}
        {...allowedProps}
      >
        {children}
      </button>

      <style jsx>
        {`
          // custom styles
          .button:hover:not(.is--disabled):not(.no-background-collor):not(.is--active)  {
            ${hoverColor()}
          }

          .button.has--animation:hover:not(.is--disabled):not(.no-background-collor):not(.is--active) {
            ${hoverColor()}
            box-shadow: -6px 6px 0px 0px rgba(0, 0, 0, 0.20);
          }
          .button.has--animation.is--active:hover:not(.is--disabled):not(.no-background-collor) {
            box-shadow: -6px 6px 0px 0px rgba(0, 0, 0, 0.20);
          }

          .has--border.has--animation:not(.is--disabled):not(.no-background-collor):hover {
            background-color: ${colorHex};
          }

          .has--border{
            border: 1px solid ${borderColorHex || colorHex};
          }

          @media only screen and (max-width: ${theme.medias.tablet}){
            .button-filled {
              position: inherit;
            }
          }
        `}
      </style>
      {/* common styles */}
      {styles}
      {colors.styles}
    </>
  );
}

Button.defaultProps = {
  type: 'button',
  rounded: false,
  size: 'normal',
  borderColor: 'transparent',
  color: 'transparent',
  textColor: 'main.800',
  withAnimation: false,
  invertOnHover: false,
  disabled: false
};

Button.propTypes = {
  /**
   * The type the button
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),

  /**
   * The background color of the button
   */
  color: PropTypes.string,

  /**
   * The text color of the button
   */
  textColor: PropTypes.string,

  /**
   * The background color of the button
   */
  borderColor: PropTypes.string,

  /**
   * The text for the button
   */
  children: PropTypes.any.isRequired,

  /**
   * If the button is rounded or no.
   */
  rounded: PropTypes.bool,

  /**
   * Trigger the disable state
   */
  disabled: PropTypes.bool,

  /**
   * The scale to be used for the font size (small, medium or big)
   */
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'big', 'custom']),

  /**
   * The click function
   */
  onClick: PropTypes.func,

  /**
   * If the button has only icon as children
   */
  onlyIcon: PropTypes.bool,

  /**
   * If the button has icon
   */
  hasIcon: PropTypes.bool,

  /**
   * If the button has hover animation
   */
  withAnimation: PropTypes.bool,

  /**
   * Invert colors on hover (textColor become color(bg), and color(bg) become textColor)
   */
  invertOnHover: PropTypes.bool,

  /**
   * ClassNames
   */
  className: PropTypes.string,
};

export default Button;
