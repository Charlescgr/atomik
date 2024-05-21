import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import Box from '../../atoms/Box';
import Image from '../../atoms/Image';
import Paragraph from '../../atoms/Paragraph';

import Container from '../../atoms/Container';

import TitleCustom from '../TitleCustom';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Hero({
  titleIsSpan, title, text, image, customImage, ...props
}) {
  const { theme, cdnPath } = useTheme();
  const isAmp = useAmp();

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .hero__figure {
        width: 288px;
        height: 136px;
      }
      .hero__content {
        flex: 1;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .hero {
      padding-top: ${image ? '96px' : '8px'};
    }
    .hero__figure {
      width: 100%;
      position: relative;
    }
  `;

  return (
    <>
      <Box className={`hero ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} p--relative`}>
        <Box className="bc--main-50 w--100">
          <Container wrap className={`hero__container ${className} ${mediaStyles.className} ${image ? 'd--flex fw--wrap jc--space-between' : 'ptb--normal'} plr--big`}>
            {image && (
              <figure className={`hero__figure ${className} ${mediaStyles.className} d--flex`}>
                <Image
                  src={!customImage ? image : `${cdnPath}themes/${theme.base}/${image}`}
                  alt="Category Illustration"
                  className={`hero__image ${className} ${mediaStyles.className} t--0`}
                  width="256"
                  height="200"
                  lazy
                  layout="fixed"
                />
              </figure>
            )}
            <Box className={`hero__content ${className} ${mediaStyles.className} mtb--normal d--flex ai--flex-start jc--center fd--column`}>
              <TitleCustom
                titleIsSpan={titleIsSpan}
                type="h1"
                textColor="main.800"
                className="lh--1-3"
              >
                {title}
              </TitleCustom>
              <Paragraph size="normal" textColor="main.800" className="lh--2">
                {text}
              </Paragraph>
            </Box>

          </Container>
        </Box>
      </Box>

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`

          .hero__figure div:nth-child(2) {
            margin-top: -78px;
            margin-left: auto;
            margin-right: auto;
          }

          @media only screen and (min-width: ${theme.medias.tablet}){
            .hero__figure div:nth-child(2) {
              margin-top: -65px;
            }
          }
        `}
      </style>
    </>
  );
}

Hero.defaultProps = {
  titleIsSpan: false,
  customImage: false,
};

Hero.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * Informs if the component receives a customized image
   */
  customImage: PropTypes.bool,

  /**
   * The title / name category / etc
   */
  title: PropTypes.string,

  /**
   * The text content
   */
  text: PropTypes.string,

  /**
   * The image from hero
   */
  image: PropTypes.string,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string
};

export default Hero;
