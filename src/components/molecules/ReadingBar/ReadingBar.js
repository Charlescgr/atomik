import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ReadingBar({ container, id, ...props }) {
  const [position, setPosition] = useState(0);
  const { theme, colorMode } = useTheme();

  useEffect(() => {
    if (!isBrowser()) return;
    setTimeout(() => {
      const e = container ? document.querySelector(`.${container}`) : document.body;

      const handleScroll = () => {
        const contentSize = e?.offsetHeight || 0;

        const headerHeight = 75;
        const scrolledAmount = headerHeight - e?.getBoundingClientRect().top;

        const st = scrolledAmount >= 0 ? scrolledAmount : 0;
        const scrollPercent = (st * 100) / contentSize;

        setPosition(`${scrollPercent > 100 ? 100 : scrollPercent}%`);
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      // eslint-disable-next-line consistent-return
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, 500);
  }, [id]);

  const { className, styles } = css.resolve`
    .reading-bar {
      height: ${theme.sizes['0-5']};
      bottom: -${theme.sizes['0-5']};
      width: 100%;
    }
    .reading-bar--indicador{
      height: 100%;
      width: ${position};
      will-change: width;
    }
  `;

  const backgroundStyle = () => {
    if (colorMode === 'dark') {
      return 'bc--secondary-800';
    }
    return 'bc--secondary-200';
  };

  return (
    <Box
      className={`reading-bar ${className} bc--grey-cold-100 d--block ${handleCreateStyleClass(
        props
      )}`}
    >
      <Box className={`reading-bar--indicador ${className} ${backgroundStyle()}`}>&nbsp;</Box>
      {/* common styles */}
      {styles}
    </Box>
  );
}

ReadingBar.propTypes = {

  /**
   * Id to monitoring the reading bar
   */
  id: PropTypes.any,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * Container for calculate reading progress
   */
  container: PropTypes.string.isRequired,
};

export default ReadingBar;
