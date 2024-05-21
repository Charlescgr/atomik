import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import Container from '../../atoms/Container';
import Paragraph from '../../atoms/Paragraph';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Image from '../../atoms/Image';
import Box from '../../atoms/Box';

function NoteBox({
  title, figure, description, button, ...props
}) {
  const { theme, direction, colorMode } = useTheme();
  const isAmp = useAmp();
  const { isDesktop } = useDeviceScreen();

  const propsBlacklist = [
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const handleClick = (url) => { window.location.href = url; };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .note-box{
        padding-top: 60px;
      }
      .note-box__image {
        ${direction === 'rtl' ? `margin-left:${theme.spacings['x-big']};` : `margin-right:${theme.spacings['x-big']};`}
        margin-bottom: 0;
      }
      .note-box__main{
        margin-top: -60px;
        padding-right: ${theme.spacings['x-big']};
        padding-left: ${theme.spacings['x-big']};
      }
      .note-box__content{
        flex: 1;
      }
      .note-box__thumb {
        width: 264px;
        height: 309px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .note-box{
      padding-top: 115px;
    }
    .note-box__main{
      margin-top: -115px;
    }
    .note-box__image {
      margin-bottom: ${theme.spacings.big};
      margin-left: auto;
      margin-right: auto;
    }
    .note-box__thumb {
      width: 264px;
      height: 264px;
      margin: 0 auto;
    }
  `;

  return (
    <Box
      className={`note-box ${className} ${mediaStyles.className} p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box className="bc--main-50 p--abolute b--0 w--100">
        <Container wrap className={`ptb--big ${isDesktop ? 'plr--x-big' : 'plr--big'}`}>

          <Box className={`note-box__main ${className} ${mediaStyles.className} d--flex fw--wrap ai--center jc--space-between`}>
            <Box className={`note-box__thumb ${className} ${mediaStyles.className}`}>
              <Image
                {...figure}
                className={`note-box__image ${className} ${mediaStyles.className}`}
              />
            </Box>
            <Box className={`note-box__content ${className} ${mediaStyles.className} ${isDesktop && ('pl--x-big')}`}>
              <Heading type="h3" textColor="main.800" className="mtb--normal">{title}</Heading>
              <Paragraph textColor="main.800" size="normal">{description}</Paragraph>
              <Button
                rounded
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                onClick={() => handleClick(button.url)}
                className={`mtb--normal ${!isDesktop && ('mlr--auto d--table')}`}
              >
                {button.label}
              </Button>
            </Box>
          </Box>

        </Container>
      </Box>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

NoteBox.propTypes = {
  /**
   * The title
   */
  title: PropTypes.string,

  /**
   * The content
   */
  description: PropTypes.string,

  /**
   * Image properties
   */
  figure: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }),

  /**
   * The button props
   */
  button: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default NoteBox;
