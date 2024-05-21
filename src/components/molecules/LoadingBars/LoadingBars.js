import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Loading({ colorName, ...props }) {
  const propsBlacklist = [
    'colorName',
    'className'
  ];
  const { getColor } = useTheme();
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .page-transition-loading {
      transform: translateY(-200px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px
    }

    .bar {
      width: 13px;
      height: 21px;
      border-radius: 11px;
      margin: 0 7px;
      animation: 1.5s bounce ease infinite;
    }

    .bar--primary {
      background-color: ${getColor(`${colorName}.300`)};
    }

    .bar--secondary {
      background-color: ${getColor(`${colorName}.500`)};
      animation-delay: 250ms;
    }

    .bar--tertiary {
      background-color: ${getColor(`${colorName}.700`)};
      animation-delay: 500ms;
    }

    .bar--quaternary {
      background-color: ${getColor(`${colorName}.900`)};
      animation-delay: 750ms;
    }

    @keyframes bounce {
      50% {
        transform: translateY(5px);
        height: 50px;
      }
    }
  `;

  return (
    <>
      <div
        {...allowedProps}
        className={`${className} page-transition-loading ${handleCreateStyleClass(props)}`}
      >
        <span className={`${className} bar bar--primary`}></span>
        <span className={`${className} bar bar--secondary`}></span>
        <span className={`${className} bar bar--tertiary`}></span>
        <span className={`${className} bar bar--quaternary`}></span>
      </div>
      {/* common styles */}
      {styles}
    </>
  );
}

Loading.defaultProps = {
  colorName: 'secondary',
};

Loading.propTypes = {
  /**
   * The color of background
   */
  colorName: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,
};

export default Loading;
