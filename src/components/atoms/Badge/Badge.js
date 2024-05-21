import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Badge({
  children, ...props
}) {
  const { theme, getColor } = useTheme();

  const propsBlacklist = [
    'children',
    'className',
    'textColor',
    'rounded',
    'color',
    'size',
    'hasIcon',
    'rounded',
    'onlyIcon'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .badge{
      font-family: ${theme.fontFamilies.sans};
      align-items:center;
      ${props.textColor && `color:${getColor(props.textColor)};`}
      ${props.color && `background-color:${getColor(props.color)};`}
    }

    .is--rounded {
      border-radius: ${theme.configBase['border-radius']};
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
    .is--only-icon.is--small {
      padding: ${theme.spacings.small};
    }
    .is--only-icon.is--normal {
      padding: ${theme.spacings.normal};
    }
    .is--only-icon.is--medium {
      padding: ${theme.spacings.medium};
    }
    .is--only-icon.is--big {
      padding: ${theme.spacings.big};
    }
  `;

  return (
    <>
      <div
        className={`badge d--inline-block ${className} ${handleCreateStyleClass(props, 'badge')}`}
        {...allowedProps}
      >
        {children}
      </div>

      {/* common styles */}
      {styles}
    </>
  );
}

Badge.defaultProps = {
  rounded: false,
  size: 'normal',
  color: 'main.800',
  textColor: 'white',
};

Badge.propTypes = {
  /**
   * The background color of the button
   */
  color: PropTypes.string,

  /**
   * The text color of the button
   */
  textColor: PropTypes.string,

  /**
   * The text for the button
   */
  children: PropTypes.any.isRequired,

  /**
   * If the button is rounded or no.
   */
  rounded: PropTypes.bool,

  /**
   * The scale to be used for the font size (small, medium or big)
   */
  size: PropTypes.string,

  /**
   * If the button has only icon as children
   */
  onlyIcon: PropTypes.bool,

  /**
   * If the button has icon
   */
  hasIcon: PropTypes.bool,

  /**
   * ClassNames
   */
  className: PropTypes.string
};

export default Badge;
