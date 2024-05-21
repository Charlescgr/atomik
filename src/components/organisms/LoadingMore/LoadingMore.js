import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Button from '../../atoms/Button';

import Loading from '../../molecules/Loading';

function LoadingMore({
  color, textColor, onClick, loading, children, ...props
}) {
  const { colorMode, direction } = useTheme();
  const handleClick = () => {
    onClick();
  };

  const { className, styles } = css.resolve`
    .loading-more{
      overflow-anchor: none;
    }
  `;

  return (
    <>
      <Box
        className={`loading-more ${className} d--flex jc--center ${handleCreateStyleClass(props)}`}
      >
        <Button
          hasIcon
          rounded
          withAnimation
          onClick={handleClick}
          size="normal"
          color={color}
          textColor={colorMode === 'dark' ? 'black' : textColor}
          className="fw--bold"
        >
          <Loading
            type="rotate"
            size="normal"
            name="refresh"
            color={colorMode === 'dark' ? 'black' : textColor}
            loading={loading}
            className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
          />
          { children }
        </Button>
      </Box>

      {/* custom styles */}
      {styles}
    </>
  );
}

LoadingMore.defaultProps = {
  padding: 'x-big',
  color: 'secondary.600',
  textColor: 'white',
  loading: false
};

LoadingMore.propTypes = {
  /**
   * The padding top and bottom
   */
  padding: PropTypes.string,

  /**
   * The color of background
   */
  color: PropTypes.string,

  /**
   * The color of the text
   */
  textColor: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The click event.
   */
  onClick: PropTypes.func,
  /**
   * The loading flag
   */
  loading: PropTypes.bool,

  /**
   * The text of the button
   */
  children: PropTypes.any.isRequired
};

export default LoadingMore;
