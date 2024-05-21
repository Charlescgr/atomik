import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import throttle from '@charlescgr/underline/dist/throttle';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, generateUUID } from '../../_settings/Utils';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

function AdsFloating({ children, ...props }) {
  const [showAds, setShowAds] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clickedClose, setClickedClose] = useState(false);
  const { getColor, colorMode } = useTheme();

  const propsBlacklist = [
    'scrollPosition',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  useEffect(() => {
    if (!isBrowser()) return;

    // scroll
    const handleScroll = throttle(() => {
      const d = document.documentElement;
      const e = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      setScrollPosition(Math.round(((d[st] || e[st]) / ((d[sh] || e[sh]) - d.clientHeight)) * 100));
    }, 500);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 10 && !clickedClose) {
      setShowAds(true);
    } else {
      setShowAds(false);
    }
  }, [scrollPosition]);

  const handleClose = () => {
    setShowAds(false);
    setClickedClose(true);
  };

  const { className, styles } = css.resolve`
    .ads-floating {
      border-top: 1px solid ${getColor('grey-cold.100')};
      transition: transform 1s ease;
      box-shadow: 1px 1px 8px rgb(0, 0, 0, 0.20);
      padding: 3px 0 0 0;
    }

    .ads-floating__button{
      padding: 2px;
      top: -30px;
      border-radius: 8px 0 0 0;
      border-top: 1px solid ${getColor('grey-cold.100')};
      box-shadow: -2px -2px 4px rgb(0, 0, 0, 0.10);
    }

    .is--visible {
      transform: translateY(0px);
    }

    .is--hidden {
      transform: translateY(150px);
    }
  `;

  return (
    <>
      <Box
        className={`ads-floating ${className} ${handleCreateStyleClass(props)} ${showAds ? 'is--visible ' : 'is--hidden '}${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--grey-neutral-50'} b--0 ta--center p--fixed zi--8 w--100`}
        data-ads-box="true"
        id={generateUUID()}
        {...allowedProps}
      >
        <Button
          onlyIcon
          onClick={handleClose}
          color={colorMode === 'dark' ? 'grey-neutral.200' : 'grey-neutral.50'}
          size="custom"
          className={`ads-floating__button ${className} p--absolute r--0`}
        >
          <Icon name="x" color="grey-cold.500" />
        </Button>
        {children}
      </Box>

      {/* custom styles */}
      {styles}
    </>
  );
}

AdsFloating.propTypes = {

  /**
   * The content of the modal
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,
};

export default AdsFloating;
