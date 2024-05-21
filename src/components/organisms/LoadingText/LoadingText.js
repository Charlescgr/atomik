import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Span from '../../atoms/Span';

function LoadingText({ messages, color, ...props }) {
  const propsBlacklist = [
    'messages',
    'className',
    'color'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const { getColor } = useTheme();
  const colorHEX = getColor(color);

  const { className, styles } = css.resolve`
    .loading__text{
      color: ${colorHEX};
    }
    .loading__text:after {
      content: ' .';
      animation: dots 1s steps(5, end) infinite;
    }

    @keyframes dots {
      0%, 20% {
        color: rgba(0,0,0,0);
        text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
      }
      40% {
        color: ${colorHEX};
        text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);
      }
      60% {
        text-shadow: .25em 0 0 ${colorHEX}, .5em 0 0 rgba(0,0,0,0);
      }
      80%, 100% {
        text-shadow: .25em 0 0 ${colorHEX}, .5em 0 0 ${colorHEX};
      }
    }
  `;

  return (
    <>
      <Span
        className={`loading__text ${className}`}
        {...allowedProps}
      >
        {messages.loading}
      </Span>
      {styles}
    </>
  );
}

LoadingText.defaultProps = {
  color: 'main.400',
  messages: {
    loading: 'Loading'
  }
};

LoadingText.propTypes = {
  /**
   * Text for component
   */
  messages: PropTypes.shape({
    loading: PropTypes.string
  }),

  /**
   * The custom classnames
   */
  className: PropTypes.string,

  /**
   * Dot color
   */
  color: PropTypes.string
};

export default LoadingText;
