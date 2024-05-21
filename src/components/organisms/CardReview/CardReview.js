import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import TitleCustom from '../../molecules/TitleCustom';
import StarsPoints from '../../molecules/StarsPoints';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

function CardReview({
  author: { name, thumb }, text, date, stars, messages, lazy, ...props
}) {
  // -- theme
  const { theme, colorMode } = useTheme();

  // -- Hook render
  const { isDesktop } = useDeviceScreen();

  // -- refs
  const heightReview = useRef(null);

  // -- states
  const [open, setOpen] = useState('');
  const [heightSize, setHeightSize] = useState('');

  // -- scripts
  const transformDate = (dateJson) => {
    const dateA = dateJson.split('T');
    const dateB = dateA[0].split('-');
    return `${dateB[2]}.${dateB[1]}.${dateB[0]}`;
  };

  // check text size
  const checkLargeText = () => {
    if (text.length > 150) return true;
    return false;
  };
  const checkTextHeight = () => {
    if (checkLargeText()) {
      return '80px';
    }
    return `${heightReview.current.scrollHeight}px`;
  };

  // toggle open/close review
  const handleToggle = () => {
    setOpen(open === '' ? 'open' : '');
    setHeightSize(open === 'open' ? checkTextHeight() : `${heightReview.current.scrollHeight}px`);
  };

  useEffect(() => {
    setHeightSize(checkTextHeight());
  }, []);

  // -- allowed props
  const propsBlacklist = [
    'author',
    'text',
    'date',
    'stars',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const checkDarkMode = () => (colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white);

  // -- style/css
  const { className, styles } = css.resolve`
    .card-review__thumb{
      width: ${theme.sizes[6]};
      height: ${theme.sizes[6]};
      display: none;
    }
    .card-review__text{
      transition: max-height 1s ease 0s;
    }
    .card-review__content:after{
      content:'';
      background-image: linear-gradient(180deg, rgba(${hexToRgb(checkDarkMode())}, 0), rgba(${hexToRgb(checkDarkMode())}, 1) 80%);
      padding: 70px 0 10px 0;
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: 4;
      width: ${checkLargeText() ? '100%' : '0'};
      transition: all 1s ease 0s;
    }
    .card-review__content.is--open:after{
      padding: 10px 0 10px 0;
    }
    .card-review__button {
      overflow-anchor: none;
      font-family: ${theme.fontFamilies.serif};
    }

    @media only screen and (min-width: ${theme.medias.mobile}) {
      .card-review__thumb {
        display: ${thumb ? 'block' : 'none'};
      }
    }
  `;

  return (
    <>
      <Box
        className={`card-review ${className} d--flex fd--row ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        {thumb && (
          <Box className={`card-review__thumb ${className} br--50 mr--normal mt--normal p--relative`}>
            <Image
              src={thumb}
              alt={`Thumb user ${name}`}
              layout="fill"
              loadingType="none"
              lazy={false}
              objectFit="fill"
              className={`card-consult__image ${className} br--50`}
            />
          </Box>
        )}
        <Box className={`card-review__content ${open !== '' ? 'is--open ' : ''} ${className} p--relative d--table f--1 mr--normal`}>
          <TitleCustom type="h4" textColor="main.800" className={`${isDesktop ? '' : 'mt--small'}`}>{name}</TitleCustom>
          <Box className="d--flex ai--center mtb--small">
            <span className={`${colorMode === 'dark' ? 'c--grey-cold-500' : 'c--grey-cold-300'} fs--small`}>{transformDate(date)}</span>
            <span className="c--main-800  fs--small mlr--normal"> • </span>
            <StarsPoints stars={stars} size="small" />
          </Box>
          <div
            ref={heightReview}
            style={{ maxHeight: `${heightSize}` }}
            className={`card-review__text ${className} o--hidden c--main-800 fs--medium lh--1-5`}
          >
            <Paragraph>
              {text}
            </Paragraph>
          </div>

          {checkLargeText() && (
            <Button
              color="transparent"
              size="custom"
              textColor="secondary.600"
              className={`card-review__button ${className} fw--bold fs--normal plr--0`}
              onClick={handleToggle}
            >
              {open !== '' ? messages.readLess : messages.readMore}
            </Button>
          )}
        </Box>
      </Box>

      {/* common styles */}
      {styles}
    </>
  );
}

CardReview.defaultProps = {
  lazy: true,
  messages: {
    readMore: 'Leer más',
    readLess: 'Leer menos',
  }
};

CardReview.propTypes = {
  /**
   * The author object data
   */
  author: PropTypes.shape({
    name: PropTypes.string.isRequired, // the name of the author of review
    thumb: PropTypes.string, // the image thumb
  }),

  /**
   * The content
   */
  text: PropTypes.string,

  /**
   * The date of review
   */
  date: PropTypes.string,

  /**
   * The stars points object
   */
  stars: PropTypes.shape({
    veracity: PropTypes.number,
    communicatibility: PropTypes.number,
    punctuality: PropTypes.number,
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    readMore: PropTypes.string,
    readLess: PropTypes.string
  }),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default CardReview;
