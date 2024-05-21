import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Button from '../../atoms/Button';

import Container from '../../atoms/Container';

function SubscriptionPlans({
  title, messages, premiumLink, medicTeamLink, newsletterLink, ...props
}) {
  // -- theme
  const {
    theme, getColor, colorMode, direction
  } = useTheme();

  // -- hooks
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'premiumLink',
    'medicTeamLink',
    'newsletterLink',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClick = (url) => {
    window.location = url;
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .subscription__title{
        max-width: 370px;
      }
      .subscription__button{
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;
        min-width: auto;
        flex: 0 1 auto;
      }
      .subscription__button.has--divider:after{
        right: -6%;
      }
      .subscription__button.has--divider:before{
        left: -6%;
      }
    }
    @media only screen and (min-width: 1024px){
      // --
      .subscription__button.has--divider:after{
        content: '';
        height: 100%;
        position: absolute;
        top: 0;
        right: -12%;
        border-left: 2px solid ${getColor('grey-cold.100')};
      }
      .subscription__button.has--divider:before{
        content: '';
        position: absolute;
        height: 100%;
        top: 0;
        left: -12%;
        border-left: 2px solid ${getColor('grey-cold.100')};
      }
    }
  `;

  // -- style css
  const { className, styles } = css.resolve`
    .subscription-plans .container{
      flex-flow: row;
      overflow-x: auto;
    }
    .subscription__button{
      min-width: 196px;
      max-width: 203px;
      flex: 1 1 32%;
    }
  `;

  return (
    <>
      <Box
        className={`subscription-plans ${className} ${mediaStyles.className} ${isDesktop ? 'bc--grey-cold-50 ptb--big' : 'ptb--normal o--scroll'} d--flex ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        <Container wrap className={`d--flex ${isDesktop ? 'jc--space-between' : 'jc--flex-start'} ai--center plr--big`}>
          {isDesktop && (
            <Span className={`subscription__title ${className} ${mediaStyles.className} ff--sans d--block c--grey-cold-600 fs--xx-medium lh--1-3 ls--medium fw--regular`}>{title}</Span>
          )}
          {premiumLink && (
            <Button rounded onClick={() => handleClick(premiumLink)} color={colorMode === 'dark' ? 'yellow.400' : 'yellow.600'} textColor="white" className={`subscription__button ${className} ${mediaStyles.className} d--flex m${direction === 'rtl' ? 'l' : 'r'}--normal`}>
              <Icon inline prefix="bxs" name="trophy" color="yellow.500" />
              <Span className={`ta--left lh--1 m${direction === 'rtl' ? 'r' : 'l'}--normal`} textColor="white">
                {isDesktop && (
                  <>
                    {messages.subscriptionButton.simpleText}
                    <br />
                  </>
                )}
                <strong>{messages.subscriptionButton.contrastText}</strong>
              </Span>
            </Button>
          )}
          {medicTeamLink && (
            <Button rounded onClick={() => handleClick(medicTeamLink)} color="grey-cold.50" textColor="grey-cold.600" className={`subscription__button has--divider ${className} ${mediaStyles.className} d--flex  m${direction === 'rtl' ? 'l' : 'r'}--normal ${!isDesktop && ('fd--row-reverse jc--flex-end')}`}>
              <Icon inline prefix="bxs" name="user-detail" color="grey-cold.300" />
              <Span className={`ta--left lh--1  ${!isDesktop ? `m${direction === 'rtl' ? 'l' : 'r'}--normal` : `m${direction === 'rtl' ? 'r' : 'l'}--normal`}`} textColor="grey-cold-600">
                {isDesktop && (
                  <>
                    {messages.contact.simpleText}
                    <br />
                  </>
                )}
                <strong>{messages.contact.contrastText}</strong>
              </Span>
            </Button>
          )}
          {newsletterLink && (
            <Button rounded onClick={() => handleClick(newsletterLink)} color="grey-cold.50" textColor="grey-cold.600" className={`subscription__button ${className} ${mediaStyles.className} d--flex ${!isDesktop && ('fd--row-reverse jc--flex-end')}`}>
              <Icon inline name="envelope" color="grey-cold.300" />
              <Span className={`ta--left lh--1  ${!isDesktop ? `m${direction === 'rtl' ? 'l' : 'r'}--normal` : `m${direction === 'rtl' ? 'r' : 'l'}--normal`}`} textColor="grey-cold-600">
                {isDesktop && (
                  <>
                    {messages.subscriptionMail.simpleText}
                    <br />
                  </>
                )}
                <strong>{messages.subscriptionMail.contrastText}</strong>
              </Span>
            </Button>
          )}
        </Container>
      </Box>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

SubscriptionPlans.propTypes = {
  /**
   * The title
   */
  title: PropTypes.string,

  /**
   * The link of premium page
   */
  premiumLink: PropTypes.string,

  /**
   * The link of professional page list
   */
  medicTeamLink: PropTypes.string,

  /**
   * The link of newsletter subscribe page
   */
  newsletterLink: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Page Messages.
   */
  messages: PropTypes.shape({
    subscriptionButton: PropTypes.shape({
      simpleText: PropTypes.string,
      contrastText: PropTypes.string
    }),
    contact: PropTypes.shape({
      simpleText: PropTypes.string,
      contrastText: PropTypes.string
    }),
    subscriptionMail: PropTypes.shape({
      simpleText: PropTypes.string,
      contrastText: PropTypes.string
    })
  }).isRequired
};

export default SubscriptionPlans;
