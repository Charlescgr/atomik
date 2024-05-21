import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import List from '../../atoms/List';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import TitleCustom from '../TitleCustom';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function LanguageVersions({
  links, platformConfig, messages, utm
}) {
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  if (!links || links?.length === 0) {
    return null;
  }

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .languages-area{
        width:100%;
        margin-bottom: 24px;
      }
      .languages__list span.d--none{
        display:inline-block
      }
      .languages__list{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .languages__link{
        display: inline-block;
        ${direction === 'rtl' ? 'margin-left:24px;' : 'margin-right:24px;'}
      }
    }
  `;

  const { className, styles } = css.resolve`
    .languages__link{
      display:block;
      line-height:1.5;
      color: ${getColor(colorMode === 'dark' ? 'main.1000' : 'main.50')};
      font-family: ${theme.fontFamilies.sans};
    }

    .languages__list{
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `;

  return (
    <Box className={`languages-area ${className} ${mediaStyles.className} mb--big`}>
      <TitleCustom titleIsSpan type="h3" textColor={colorMode === 'dark' ? 'main.1000' : 'main.50'} className="pb--normal" lineType="dashed" lineColor={colorMode === 'dark' ? 'main.700' : 'main.200'}>
        {platformConfig.name}
        {' '}
        <span className={`c--main-${colorMode === 'dark' ? '700' : '300'} fs--xx-medium`}>
          {' '}
          {messages.isAvailableIn}
        </span>
      </TitleCustom>
      <List className={`languages__list ${className} ${mediaStyles.className} d--inline-block`}>
        {links?.map((link) => (
          <li key={link.ID}>
            <A to={link.link} utm={utm} externalLink target="_blank" rel={link.relation ? link.relation : 'noopener noreferrer'} hoverColor="main.300" className={`languages__link ${className} ${mediaStyles.className} ptb--normal`}>
              {link.title}
            </A>
          </li>
        ))}
      </List>

      {/* custonm styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx>
        {`
          .languages__link{
            display:block;
            line-height:1.5;
            color: ${getColor('main.50')};
            font-family: ${theme.fontFamilies.sans};
          }
        `}
      </style>
    </Box>
  );
}

LanguageVersions.defaultProps = {
  links: []
};

LanguageVersions.propTypes = {

  /**
   * The i18n messages
   */
  messages: PropTypes.shape({
    isAvailableIn: PropTypes.string,
  }),

  /**
   * The blog name
   */
  platformConfig: PropTypes.shape({
    name: PropTypes.string,
  }),

  /**
   * The orientation of the list
   */
  links: PropTypes.array,

  /**
   * UTM informations
   */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),
};

export default LanguageVersions;
