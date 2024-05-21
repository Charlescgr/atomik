import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Loading from '../../molecules/Loading';

function LoadingContent({
  dots, pulsing, iconName, messages, ...props
}) {
  const propsBlacklist = [
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const { getColor } = useTheme();
  const colorHEX = getColor('main.200');

  const { className, styles } = css.resolve`
    .dots{
      margin-top: 22px;
    }
    .pulsing{
      animation: pulse 3s linear infinite;
    }
    @keyframes pulse{
      0% {opacity:1.0}
      20% {opacity:0.25}
      40% {opacity:1.0}
    }
  `;

  return (
    <Box
      className={`loading-content ${className} ${pulsing ? 'pulsing ' : ''}d--flex ai--center jc--center p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Loading
        type="rotate"
        size={iconName !== 'refresh' ? 'medium' : 'big'}
        name={iconName}
        color="main.200"
        loading
        className="mr--normal"
      />
      {messages?.loading && (
        <>
          <Span className={`loading__text ${className} ff--sans fw--bold ta--center fs--big c--main-200`}>
            {messages.loading}
          </Span>
          {dots && (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 100 100" className={`dots ${className} d--inline-block ml--small`}>
              <circle fill={colorHEX} stroke="none" cx="6" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="2s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill={colorHEX} stroke="none" cx="26" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="2s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.2"
                />
              </circle>
              <circle fill={colorHEX} stroke="none" cx="46" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="2s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
            </svg>
          )}
        </>
      )}
      {/* custom styles */}
      {styles}
    </Box>
  );
}

LoadingContent.defaultProps = {
  iconName: 'refresh',
  pulsing: false,
  dots: true
};

LoadingContent.propTypes = {
  /**
   * The icon name
   */
  iconName: PropTypes.string,

  /**
   * Inform if the compenet the three points (...)
   */
  dots: PropTypes.string,

  /**
   * Inform if the compenet have pulse animation
   */
  pulsing: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    loading: PropTypes.string
  }),

  /**
   * The custom classes
   */
  className: PropTypes.string
};

export default LoadingContent;
