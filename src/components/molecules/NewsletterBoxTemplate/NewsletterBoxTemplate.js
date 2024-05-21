import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import { v4 as uuid } from 'uuid';

import InputField from '../../atoms/InputField';
import Paragraph from '../../atoms/Paragraph';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';

import TitleCustom from '../TitleCustom';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, validateEmail } from '../../_settings/Utils';

function NewsletterBoxTemplate({
  noLateralSpace,
  onSubmit,
  list,
  messages,
  withImage,
  directionRender,
  ...props
}) {
  const [newsLetterValues, setNewsLetterValues] = useState({
    name: '',
    email: '',
    acceptedTerms: false,
    checkedCategories: [],
    submited: false
  });
  const [email, setEmail] = useState({
    isValid: true,
    showInvalidMsg: false
  });

  const {
    theme, cdnPath, direction, colorMode
  } = useTheme();

  const validatedItemsToSubmit = useMemo(() => {
    if (!newsLetterValues.acceptedTerms) return false;
    if (newsLetterValues.checkedCategories.length <= 0) return false;

    return true;
  }, [newsLetterValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(newsLetterValues.email)) {
      setEmail({ isValid: false, showInvalidMsg: true });

      setTimeout(() => setEmail((oldValue) => ({ ...oldValue, showInvalidMsg: false })), 2000);
      return;
    }
    onSubmit(newsLetterValues);
    setNewsLetterValues({ ...newsLetterValues, submited: true });
  };

  const uid = uuid();

  const propsBlacklist = [
    'noLateralSpace',
    'onSubmit',
    'title',
    'description',
    'withImage',
    'list',
    'className'
  ];

  const allowedProps = omit(props, propsBlacklist);

  const widthLabels = () => {
    if (directionRender === 'horizontal') {
      if (withImage) {
        return 33;
      }
      return 25;
    }
    return 100;
  };

  // -- styles
  const { className, styles } = css.resolve`
    .newsletter-template{
      ${noLateralSpace ? `margin-left: -${theme.sizes[2]};margin-right: -${theme.sizes[2]};` : ''}
    }
    .newsletter__checkbox-group {
      width: ${widthLabels()}%;
      height: 27px;
    }

    .newsletter__notification__container {
      width: 100%;
      position: relative;
    }

    .newsletter__notification {
      padding: 4px 8px;
      background: #bd081c;
      border-radius: 4px;
      color: #fff;

      position: absolute;
      bottom: -26px;
      left: 0px;
      z-index: 20;
      transition: all 0.4s;
      display: ${email.showInvalidMsg ? 'block' : 'none'};
    }

    .newsletter__notification:after {
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      top: -4px;
      left: 18px;
      background: inherit;
      border-radius: 1px;

      transform: rotate(45deg);
    }

    .newsletter__input--is-invalid {
      border: 1px solid #bd081c;
      color: #bd081c;
      background: rgb(247, 227, 226);
    }

    .newsletter__input--is-invalid::placeholder {
      color: #bd081c;
    }

    .newsletter__button {
      width: 100%;
    }
  `;

  // -- scripts
  const handleValues = (key = '', value) => {
    switch (key) {
      case 'name': {
        setNewsLetterValues((oldValues) => ({ ...oldValues, name: value }));
        break;
      }

      case 'email': {
        setNewsLetterValues((oldValues) => ({ ...oldValues, email: value }));

        if (!email.isValid && validateEmail(value)) {
          setEmail((oldValues) => ({ ...oldValues, isValid: true }));
        }
        break;
      }

      case 'acceptedTerms': {
        setNewsLetterValues((oldValues) => ({ ...oldValues, acceptedTerms: !newsLetterValues[key] }));
        break;
      }

      case 'checkedCategories': {
        const itemIndex = newsLetterValues.checkedCategories.findIndex((it) => it.id === value.id);

        if (itemIndex >= 0) {
          const newListitems = newsLetterValues.checkedCategories.filter((it) => it.id !== value.id);
          setNewsLetterValues((oldValues) => ({ ...oldValues, checkedCategories: newListitems }));
          break;
        }

        const newListitems = [...newsLetterValues.checkedCategories, value];
        setNewsLetterValues((oldValues) => ({ ...oldValues, checkedCategories: newListitems }));
        break;
      }

      default: {
        break;
      }
    }
  };

  // -- components
  const checksGroup = useMemo(() => {
    const singleId = uuid();

    return (
      list?.map((listItem) => (
        <Box
          key={`${listItem.id}-${singleId}`}
          className={`newsletter__checkbox-group ${className} d--flex ai--center`}
        >
          <InputField
            borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
            type="checkbox"
            id={`category-${listItem.id}-${singleId}`}
            name={`category-${listItem.id}-${singleId}`}
            checked={!!newsLetterValues.checkedCategories.find((it) => it.id === listItem.id)}
            onChange={() => handleValues('checkedCategories', listItem)}
            className="d--inline-block bc--white"
            bgColor="white"
          />
          <Label htmlFor={`category-${listItem.id}-${singleId}`} textColor="main.800">
            <Span className="lh--0 fs--normal ff--sans fw--semibold">{listItem.label}</Span>
          </Label>
        </Box>
      ))
    );
  }, [newsLetterValues.checkedCategories, list, email.showInvalidMsg]);

  const buttonSubmit = () => (
    <Button
      hasIcon
      type="submit"
      color={colorMode === 'dark' ? 'secondary.400' : 'secondary.600'}
      textColor="white"
      rounded
      className={`newsletter__button ${className} ${directionRender === 'vertical' ? 'mtb--medium w--100 fw--bold' : 'mb--normal'}`}
      disabled={!validatedItemsToSubmit}
    >
      <Icon
        name="mail-send"
        color="white"
        className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
      />
      {directionRender === 'horizontal' ? messages.buttonTextCompact : messages.buttonTextFull}
    </Button>
  );

  const justInputs = useMemo(() => (
    <>
      <InputField
        type="text"
        name="name"
        id={`text-${uid}`}
        value={newsLetterValues.name}
        className={`newsletter__input ${className} ${directionRender === 'vertical' ? 'mtb--normal' : 'mb--normal'} plr--big`}
        placeholder={messages.inputPlaceholderText}
        size="medium"
        textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'main.300'}
        full
        onChange={(e) => handleValues('name', e)}
        borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
      />

      <Box className={`newsletter__notification__container ${className} ${directionRender === 'vertical' ? 'mt--normal mb--medium' : 'mb--normal mlr--normal'}`}>
        <InputField
          type="text"
          name="email"
          id={`email-${uid}`}
          value={newsLetterValues.email}
          className={`newsletter__input ${className} ${!email.isValid ? ' newsletter__input--is-invalid ' : ''} plr--big`}
          placeholder={messages.inputPlaceholderEmail}
          size="medium"
          textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'main.300'}
          full
          onChange={(e) => handleValues('email', e)}
          borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
        />
        <Span className={`newsletter__notification ff--sans fs--small ${className}`}>{messages.invalidEmail}</Span>
      </Box>
    </>
  ), [newsLetterValues.email, newsLetterValues.name, email]);

  return (
    <Box
      className={`
        newsletter-template bc--main-50 mtb--x-big ${noLateralSpace ? '' : 'br--small'} p--big ${className} ${directionRender === 'horizontal' ? 'd--flex ai--center jc--flex-start' : ' '} ${handleCreateStyleClass(props)}
      `}
      {...allowedProps}
    >
      {withImage && (
        <figure
          className={`newsletter__image ${className} d--table mlr--auto d--flex ai--center jc--center mtb--big`}
        >
          <Image
            src={`${cdnPath}themes/${theme.base}/illustration__newsletter.svg`}
            alt="Newsletter Illustration"
            width="220"
            height="160"
            layout="fixed"
          />
        </figure>
      )}
      <Box
        className={`newsletter__content ${className}`}
      >
        <TitleCustom titleIsSpan type="h3" textColor="main.700" className={`${withImage && directionRender === 'horizontal' ? 'ta--left' : 'ta--center'} lh--1-3`}>
          {messages.title}
        </TitleCustom>
        <Paragraph size="normal" textColor="main.700" className={`${withImage && directionRender === 'horizontal' ? 'ta--left' : 'ta--center'} lh--1-5 mtb--normal`}>
          {messages?.description}
        </Paragraph>
        {!newsLetterValues.submited ? (
          <form onSubmit={handleSubmit} action="#" method="get" target="_top">
            {directionRender === 'horizontal' ? (
              <>
                <Box className={`newsletter__group-checkbox ${className} d--flex jc--flex-start fw--wrap mb--medium`}>{checksGroup}</Box>
                <Box className="d--flex ai--center jc--speace-between">
                  {justInputs}
                </Box>
                {buttonSubmit()}
              </>
            ) : (
              <>
                {justInputs}
                {checksGroup}
                {buttonSubmit()}
              </>
            )}
            <Box className={`newsletter__terms ${className} d--flex ${direction === 'rtl' ? 'jc--flex-end' : 'jc--flex-start'} ${directionRender === 'vertical' ? 'mt--big ' : ' '}mb--normal`}>
              <InputField
                borderColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.200'}
                type="checkbox"
                id={`terms-${uid}`}
                name="terms"
                checked={newsLetterValues.acceptedTerms}
                onChange={() => handleValues('acceptedTerms')}
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
            className={`newsletter__terms--success ${className} c--secondary-600 fw--bold ta--center ff--sans p--big mt--medium br--small plr--big lh--1-5`}
          >
            {messages.registrationConfirmationMessage}
          </Paragraph>
        )}
      </Box>
      {/* common and custom styles */}
      {styles}
    </Box>
  );
}

NewsletterBoxTemplate.defaultProps = {
  noLateralSpace: false,
  withImage: false,
  directionRender: 'vertical',
  messages: {
    title: '¡Suscríbete a nuestra newsletter!',
    description: 'Selecciona entre las 6 categorías de las que te gustaría recibir artículos.',
    buttonTextFull: 'Suscribierse ahora',
    buttonTextCompact: 'Suscribierse',
    acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
    registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
    inputPlaceholderText: 'Tu nombre (opcional)',
    inputPlaceholderEmail: 'Insere tu correo',
    invalidEmail: 'Insere un e-mail valido'
  }
};

NewsletterBoxTemplate.propTypes = {
  /**
   * Informs if the component DON'T have lateral space (padding plr--big)
   * Use this prop when the component is inside a grid (<row className="plr--big"><col> component </col></row>), like a sidebar
   */
  noLateralSpace: PropTypes.bool,

  /**
   * Shows or not the illustration
   */
  withImage: PropTypes.bool,

  /**
   * How the component render -- or ||
   */
  directionRender: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * Name of the list, to register the e-mail
   */
  list: PropTypes.array.isRequired,

  /**
   * The function that will be executed on form submission
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * The custom classnames
   */
  className: PropTypes.string,

  /**
   * The text from the component
   */
  messages: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    buttonTextFull: PropTypes.string,
    buttonTextCompact: PropTypes.string,
    acceptNewsletterTerms: PropTypes.string,
    registrationConfirmationMessage: PropTypes.string,
    inputPlaceholderText: PropTypes.string,
    inputPlaceholderEmail: PropTypes.string,
    invalidEmail: PropTypes.string
  })
};

export default NewsletterBoxTemplate;
