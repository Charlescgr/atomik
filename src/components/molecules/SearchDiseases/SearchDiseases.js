import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';
import Image from '../../atoms/Image';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import TitleCustom from '../TitleCustom';

import { lettersAlphabet } from './lettersAlphabet';

function SearchDiseases({
  title, titleIsSpan, titleType, messages, ...props
}) {
  const { isDesktop } = useDeviceScreen();
  const { theme, cdnPath, direction } = useTheme();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleIsSpan',
    'titleType',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: 700px){
      .disease-box{
        display: flex;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .disease__button {
      min-width: 40px;
      min-height: 40px;
    }
  `;

  return (
    <Box
      className={`disease-box ${className} ${mediaStyles.className} fw--wrap ai--center jc--space-between p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box className={`disease__image_container d--flex jc--center ${!isDesktop ? 'mb--big' : ''} ${className}`}>
        <Image src={`${cdnPath}themes/${theme.base}/illustration__desease.svg`} layout="fixed" alt="Illustration" width="288" height="200" className={`disease__image ${isDesktop ? '' : 'mlr--auto mb--small'} d--table`} />
      </Box>
      <Box className={`disease__content ${className} ${mediaStyles.className} f--1`}>
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor={`${isDesktop ? 'secondary.200' : 'transparent'}`} className="pb--normal">{title}</TitleCustom>
        {isDesktop && (
          <A to={messages.recommendations.url} textColor="grey-neutral.500" className={`link-see-more ${className} ${mediaStyles.className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
            {messages.recommendations.label}
            <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
          </A>
        )}
        <Paragraph className={`${isDesktop ? 'mt--big mb--normal' : 'mtb--small'}`}>{messages.textIntro}</Paragraph>
        <Box className="d--flex fw--wrap">
          {lettersAlphabet.map((letter) => (
            <Button key={letter} rounded size="custom" color="secondary.400" textColor="white" className={`disease__button ${className} ${mediaStyles.className} ta--center d--flex ai--center jc--center mt--normal mr--normal`}><strong>{letter}</strong></Button>
          ))}
          {!isDesktop && (<Button rounded size="custom" color="main.700" textColor="white" className={`disease__button ${className} ${mediaStyles.className} ta--center mt--normal mr--normal plr--big`}><strong>{messages.recommendations.label}</strong></Button>)}
        </Box>
      </Box>
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

SearchDiseases.defaultProps = {
  titleIsSpan: false,
  titleType: 'h2'
};
SearchDiseases.propTypes = {

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The heading level type
   */
  titleType: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    textIntro: PropTypes.string,
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired
};

export default SearchDiseases;
