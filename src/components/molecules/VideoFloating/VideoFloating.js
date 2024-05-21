/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useAmp } from 'next/amp';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/List';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function VideoFloating({ children, ...props }) {
  const propsBlacklist = [
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  const isAmp = useAmp();

  // -- theme
  const {
    theme, getColor, colorMode, direction
  } = useTheme();

  // -- state
  // eslint-disable-next-line no-unused-vars
  const [visible, setVisible] = useState(true);

  // -- scripts
  const handleClose = () => {
    setVisible(false);
  };

  // -- css style
  const mediaStyles = css.resolve`
  `;

  const { className, styles } = css.resolve`
    .video-floating {
      border-top: 1px solid ${getColor('grey-cold.100')};
      border-left: 1px solid ${getColor('grey-cold.100')};
      border-radius: ${direction === 'rtl' ? '0 8px 0 0' : '8px 0 0 0'};
      transition: transform 1s ease;
      box-shadow: 1px 1px 8px rgb(0, 0, 0, 0.20);
      width: 320px;
      height: 180px;
    }
    .video__container {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    }
    :global(.video__container .video__responsive,
    .video__container iframe,
    .video__container video) {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: ${direction === 'rtl' ? '0 8px 0 0' : '8px 0 0 0'};
    }
    .video-floating__button{
      padding: 2px;
      top: -29px;
      border-radius: ${direction === 'rtl' ? '0 8px 0 0' : '8px 0 0 0'};
      border-top: 1px solid ${getColor('grey-cold.100')};
      box-shadow: -2px -2px 4px rgb(0, 0, 0, 0.10);
    }

    .is--visible {
      transform: translateY(0px);
    }

    .is--hidden {
      transform: translateY(210px);
    }

    @media only screen and (min-width: ${theme.medias.mobile}) {
      .video-floating {
        width: 480px;
        height: 270px;
      }
      .is--hidden {
        transform: translateY(400px);
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .video-floating {
        width: 640px;
        height: 360px;
      }
      .is--hidden {
        transform: translateY(390px);
      }
    }
  `;

  return (
    <Box
      className={`video-floating ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} ${visible ? 'is--visible ' : 'is--hidden '} ${colorMode === 'dark' ? 'bc--black' : 'bc--white'} ${direction === 'rtl' ? 'l' : 'r'}--0 b--0 ta--center p--fixed zi--11`}
      {...allowedProps}
    >
      <Image />
      <Box className={`video__container ${className} ${mediaStyles.className}`}>
        {children}
      </Box>
      <Button
        onlyIcon
        color={colorMode === 'dark' ? 'black' : 'white'}
        size="custom"
        onClick={handleClose}
        className={`video-floating__button ${className} p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0`}
      >
        <Icon name="x" color="grey-cold.500" />
      </Button>

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

VideoFloating.propTypes = {
  /**
   * any video, iframe, tag
   */
  children: PropTypes.any,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string
};

export default VideoFloating;
