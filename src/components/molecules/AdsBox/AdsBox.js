import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { generateUUID } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import Box from '../../atoms/Box';

/*
Component used just on Atomik Layout.
On React-Atomik we use AdsManager or the AtomikLib
*/
function AdsBox({
  noLateralSpace, noPadding, slim, hasBackground, align, children, ads, sticky, messages, ...props
}) {
  const isAmp = useAmp();
  const { theme } = useTheme();
  // -- Hook render
  const { isDesktop } = useDeviceScreen();

  const propsBlacklist = [
    'noLateralSpace',
    'ads',
    'align',
    'slim',
    'sticky',
    'noPadding',
    'className',
    'hasBackground'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .ads-box{
        margin-left: 0px;
        margin-right: 0px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .ads-box{
      ${noLateralSpace ? `margin-left: -${theme.sizes[2]};margin-right: -${theme.sizes[2]};` : ''}
    }
    .p--sticky {
      top: 30px;
    }

    :global(.ad-label-text::before) {
      content: '${messages.advertising}';
      font-family: ${theme.fontFamilies.sans};
      text-align: center;
      display: block;
      white-space: nowrap;
      font-size: 10px;
      line-height: 15px;
      letter-spacing: 1px;
      color: #6d6d6e;
      text-transform: uppercase;
      margin: 0 auto;
    }

    @media only screen and (min-width: 851px){ // 851x393Xiaomi
      .p--sticky {
        top: 48px;
      }
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .is--sticky {
        top: 64px;
      }
    }
  `;

  const getAdsHeight = () => {
    if (isDesktop && ads?.desktop?.classSize) {
      return `ads__${ads?.desktop?.classSize}`;
    } if (!isDesktop && ads?.mobile?.classSize) {
      return `ads__${ads?.mobile?.classSize}`;
    }
    return '';
  };

  const backgroundStyle = () => {
    if (hasBackground) {
      return 'bc--grey-neutral-50';
    }
    return '';
  };
  const getAlign = () => {
    if (align === 'start') {
      return 'flex-start';
    } if (align === 'end') {
      return 'flex-end';
    }
    return align;
  };

  return (
    <>
      <Box
        className={`ads-box ${className} ${mediaStyles.className} ${backgroundStyle()} d--flex jc--center ${sticky ? 'ai--flex-start' : 'ai--center'}${noPadding ? '' : ' plr--small ptb--big'} ${getAdsHeight()}`}
        data-ads-box="true"
        id={generateUUID()}
        {...allowedProps}
      >
        <Box className={`ads-box__children ${className} ${mediaStyles.className} ${sticky ? ' p--sticky' : ''} p--relative d--flex${slim ? ` ai--${getAlign()}` : ` fd--column jc--${getAlign()}`}`}>
          <Box className={`ads-slot ad-label-text ${className}`}>
            {children}
          </Box>
        </Box>
      </Box>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

AdsBox.defaultProps = {
  noLateralSpace: false,
  slim: false,
  hasBackground: true,
  align: 'center',
  children: null,
  messages: {
    advertising: 'PUBLICIDAD'
  },
  ads: {
    desktop: { classSize: 'small' },
    mobile: { classSize: 'small' }
  }
};

AdsBox.propTypes = {
  /**
   * Informs if the component DON'T have lateral space (padding plr--big)
   * Use this prop when the component is inside a grid (<row className="plr--big"><col> component </col></row>), like a sidebar
   */
  noLateralSpace: PropTypes.bool,

  /**
   * Informs if the banners have background color
   */
  hasBackground: PropTypes.bool,

  /**
   * The rel attribute specifies the relationship between the current document and the linked document.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Informs if the banners is on slim mode, with Advertising text on 270deg
   */
  slim: PropTypes.bool,

  /**
   * Informs if the ads have padding with your  div parent
   */
  noPadding: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    advertising: PropTypes.string
  }),

  /**
   * Informs if the banners have css position/effect sticky
   */
  sticky: PropTypes.bool,

  /**
   * The children element
   */
  children: PropTypes.any,

  /**
   * The ADS images
   * desktop || mobile classSize: The size of ADs, to add an class with min-heitht to prevent LayoutShift
   */
  ads: PropTypes.object,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default AdsBox;
