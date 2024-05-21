import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import uuid from 'react-uuid';
import { useAmp } from 'next/amp';

import InputField from '../../atoms/InputField';
import Paragraph from '../../atoms/Paragraph';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import Box from '../../atoms/Box';
import Container from '../../atoms/Container';

import TitleCustom from '../TitleCustom';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function NewsletterBox({
  bgColor,
  textColor,
  noLateralSpace,
  titleIsSpan,
  onSubmit,
  mainNewsletter,
  title,
  description,
  messages,
  withImage,
  customImage,
  ...props
}) {
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(false);
  const [submited, setSubmited] = useState(false);

  const {
    theme, cdnPath, direction, colorMode, getColor
  } = useTheme();
  const isAmp = useAmp();

  const uid = uuid();

  const propsBlacklist = [
    'bgColor',
    'textColor',
    'noLateralSpace',
    'titleIsSpan',
    'onSubmit',
    'mainNewsletter',
    'title',
    'description',
    'withImage',
    'list',
    'className'
  ];

  const allowedProps = omit(props, propsBlacklist);

  // -- styles
  const mediaStyles = css.resolve`
     @media only screen and (min-width: ${theme.medias.tablet}) {
      .newsletter-box{
        margin-left: 0;
        margin-right: 0;
      }
      .newsletter-box__main-container{
        padding-top: 120px;
      }
      .newsletter-box__main{
        margin-top: -85px;
      }
      .newsletter-box__image-default {
        margin-right: ${theme.spacings['x-big']};
        margin-left: 0;
      }
      .newsletter-box__content{
        flex: 1;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .newsletter-box{
      ${noLateralSpace ? `margin-left: -${theme.sizes[2]};margin-right: -${theme.sizes[2]};` : ''}
    }

    .newsletter-box__main-container{
      padding-top: 150px;
    }

    .newsletter-box__main{
      margin-top: -120px;
      padding-bottom: ${theme.spacings['x-big']};
    }

    .newsletter-box__image-default {
      margin-left: auto;
      margin-right: auto;
      margin-top: -48px;
    }

    .newsletter-box__wrapper__input {
      padding-${direction === 'rtl' ? 'left' : 'right'}: 124px;
    }
    .newsletter-box__wrapper__checkbox{
      ${direction === 'rtl' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
    }

    button {
      top: 6px;
      bottom: 6px;
      ${direction === 'rtl' ? 'left' : 'right'}: 6px;
    }

    .newsletter-box__success {
      border: 1px solid ${colorMode === 'dark' ? getColor('grey-neutral.800') : getColor('grey-neutral.200')};
    }
  `;

  const textColorStyle = () => {
    if (textColor) {
      return textColor;
    }
    return (colorMode === 'dark' ? 'grey-neutral.200' : 'grey-neutral.800');
  };

  // -- scripts
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    setSubmited(true);
  };

  const backgroundColor = () => {
    if (bgColor) {
      return (colorMode === 'dark' ? 'bc--main-1000' : 'bc--main-50');
    }
    return '';
  };

  const renderNewsletter = () => (
    <Box
      className={`newsletter-box ${mainNewsletter ? 'newsletter-box__main' : ''} d--flex fw--wrap ai--center jc--space-between ${backgroundColor()} ${className} ${mediaStyles.className} ${handleCreateStyleClass(
        props
      )}`}
      {...allowedProps}
    >
      {withImage && (
        <figure
          className={`newsletter-box__image-${customImage ? 'custom' : 'default'} ${className} ${mediaStyles.className} d--table`}
        >
          <Image
            src={`${cdnPath}themes/${theme.base}/${customImage?.src || 'illustration__newsletter.svg'}`}
            alt="Newsletter Illustration"
            width={`${customImage ? customImage.width : '340'}`}
            height={`${customImage ? customImage.height : '260'}`}
            layout="fixed"
          />
        </figure>
      )}
      <Box className={`newsletter-box__content ${className} ${mediaStyles.className}`}>
        <TitleCustom titleIsSpan={titleIsSpan} type="h3" textColor={textColorStyle()} className="lh--1-3">
          {title}
        </TitleCustom>
        <Paragraph size="normal" textColor={textColorStyle()} className="lh--2">
          {description}
        </Paragraph>
        {!submited ? (
          <form onSubmit={handleSubmit} action="#" method="get" target="_top">
            <Box
              className={`newsletter-box__wrapper ${className} ${mediaStyles.className} p--relative br--small mt--normal mb--medium`}
            >
              <InputField
                type="email"
                name={`email-${uid}`}
                id={`email-${uid}`}
                value={email}
                className={`newsletter-box__wrapper__input ${className} ${mediaStyles.className} bc--transparent`}
                placeholder={messages.inputPlaceholder}
                size="big"
                textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'main.300'}
                full
                onChange={(v) => setEmail(v)}
                borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
              />
              <Button
                type="submit"
                color={colorMode === 'dark' ? 'secondary.400' : 'secondary.600'}
                textColor="white"
                rounded
                className={`${className} ${mediaStyles.className} p--absolute`}
                disabled={!terms}
              >
                {messages.subscribe}
              </Button>
            </Box>
            <Box className={`${className} d--flex newsletter-box__wrapper__checkbox ${direction === 'rtl' ? 'jc--flex-end' : 'jc--flex-start'}`}>
              <InputField
                borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
                type="checkbox"
                id={`terms-${uid}`}
                name={`terms-${uid}`}
                checked={terms}
                onChange={() => setTerms(!terms)}
                className="d--inline-block"
              />
              <Label htmlFor={`terms-${uid}`} textColor={colorMode === 'dark' ? 'main.500' : 'main.400'} className="d--inline-block fs--small lh--2">
                {messages.acceptNewsletterTerms}
              </Label>
            </Box>
          </form>
        ) : (
          <Paragraph
            textColor="main.600"
            className={`newsletter-box__success ${className} ${mediaStyles.className} ta--center ff--sans p--big mt--medium br--small plr--big lh--1-5`}
          >
            {messages.registrationConfirmationMessage}
          </Paragraph>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {mainNewsletter ? (
        <Box className={`newsletter-box__main-container ${className} ${mediaStyles.className} p--relative`}>
          <Box className={`${colorMode === 'dark' ? 'bc--main-1000' : 'bc--main-50'} p--abolute b--0 w--100`}>
            <Container wrap className={noLateralSpace ? '' : 'plr--big'}>
              {renderNewsletter()}
            </Container>
          </Box>
        </Box>
      ) : (
        <>
          {renderNewsletter()}
        </>
      )}

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

NewsletterBox.defaultProps = {
  noLateralSpace: false,
  titleIsSpan: false,
  mainNewsletter: false,
  withImage: false,
  title: 'Suscríbete a nuestro boletín de noticias',
  description: 'Inspírate semanalmente con las novedades, los artículos más leídos, y sugerencias elegidas especialmente para ti.',
  messages: {
    subscribe: 'Suscribirse',
    acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
    registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
    inputPlaceholder: 'Insere tu correo'
  }
};

NewsletterBox.propTypes = {
  /**
   * Informs if the component DON'T have lateral space (padding plr--big)
   * Use this prop when the component is inside a grid (<row className="plr--big"><col> component </col></row>), like a sidebar
   */
  noLateralSpace: PropTypes.bool,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * Shows or not the illustration
   */
  withImage: PropTypes.bool,

  /**
   * Shows a custom image
   */
  customImage: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),

  /**
   * Build main newsleter container
   */
  mainNewsletter: PropTypes.bool,

  /**
   * Inform if the componenet has the default background-color
   */
  bgColor: PropTypes.bool,

  /**
   * The title and paragraph text color
   */
  textColor: PropTypes.string,

  /**
   * The title
   */
  title: PropTypes.string,

  /**
   * The text description
   */
  description: PropTypes.string,

  /**
   * Name of the list, to register de e-mail
   */
  list: PropTypes.string.isRequired,

  /**
   * The function that will be executed on form submission
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * The custom classnames
   */
  className: PropTypes.string,

  messages: PropTypes.shape({
    subscribe: PropTypes.string,
    acceptNewsletterTerms: PropTypes.string,
    registrationConfirmationMessage: PropTypes.string,
    inputPlaceholder: PropTypes.string
  })
};

export default NewsletterBox;
