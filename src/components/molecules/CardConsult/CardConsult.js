import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function CardConsult({
  idConsult, title, thumb, price, urlConsult, messages, lazy, ...props
}) {
  const isAmp = useAmp();

  // -- theme
  const { theme, colorMode, direction } = useTheme();

  // -- allowed props
  const propsBlacklist = [
    'idConsult',
    'title',
    'thumb',
    'price',
    'urlConsult',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClicked = (url) => {
    window.open(url, '_blank');
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .card-consult__thumb{
        width: 90px;
        height: auto;
      }
    }
  `;

  // -- style/css
  const { className, styles } = css.resolve`
    .card-consult__thumb{
      width: 110px;
      height: auto;
    }
  `;

  return (
    <Box
      className={`card-consult ${className} ${mediaStyles.className} br--small bs--small d--flex fd--row ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box className={`card-consult__thumb ${className} ${mediaStyles.className} br--small`}>
        <Image
          src={thumb}
          alt={`Thumb consult ${title}`}
          className={`card-consult__image ${className} ${mediaStyles.className} w--100 h--100 of--cover brl--small d--block`}
          lazy={lazy}
          layout="responsive"
          width={isAmp ? '110' : 'auto'}
          height={isAmp ? '140' : 'auto'}
        />
      </Box>
      <Box className={`card-consult__content ${className} ${mediaStyles.className} f--1 mlr--normal`}>
        <Heading type="h5" textColor="main.800" className="mtb--normal">{title}</Heading>
        <Button
          hasIcon
          rounded
          color="main.800"
          textColor={colorMode === 'dark' ? 'black' : 'white'}
          className="fw--bold mtb--normal"
          onClick={() => handleClicked(urlConsult)}
        >
          <Icon
            inline
            color={colorMode === 'dark' ? 'black' : 'white'}
            size="normal"
            prefix="bx"
            name="calendar-check"
            className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
          />
          {' '}
          {messages.scheduleConsult}
          -
          {' '}
          {price.value}
          {' '}
          €
        </Button>
      </Box>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
        @media only screen and (min-width: ${theme.medias.tablet}) {
          .card-consult__thumb div{
            height: 100%;
          }
        }
        `}
      </style>
    </Box>
  );
}

CardConsult.defaultProps = {
  lazy: true
};

CardConsult.propTypes = {
  /**
  * The ID from the consult
  */
  idConsult: PropTypes.string,

  /**
  * Return the click
  */
  returnClick: PropTypes.func,

  /**
   * The title
   */
  title: PropTypes.string.isRequired,

  /**
   * The url from consult
   */
  urlConsult: PropTypes.string.isRequired,

  /**
   * The image thumb
   */
  thumb: PropTypes.string.isRequired,

  /**
   * The price of consult
   */
  price: PropTypes.shape({
    currency: PropTypes.string,
    value: PropTypes.number
  }),

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    scheduleConsult: PropTypes.string,
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default CardConsult;
