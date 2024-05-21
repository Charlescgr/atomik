import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../atoms/Image';
import Box from '../../atoms/Box';
import Paragraph from '../../atoms/Paragraph';
import A from '../../atoms/A';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function HONCodeBox({ code, messages, textColor }) {
  if (code === '') {
    return null;
  }
  const { colorMode, direction } = useTheme();

  return (
    <Box className="hon-area ff--serif d--flex ai--center ptb--normal mlr--x-big">
      <Box className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}>
        <Image src={`https://www.honcode.ch/HONcode/Seal/${code}_hr1.gif`} layout="fixed" alt={messages.honCodeImgDesc} width="47" height="68" lazy />
      </Box>
      <Paragraph textColor={textColor} size="small" className="lh--1-4">
        {messages.honCodeAccreditation}
        {' '}
        HONCode.
        <br />
        <A externalLink rel="noreferrer noopener" to={`https://www.healthonnet.org/HONcode/Conduct.html?${code}`} target="_blank" textColor={`main.${colorMode === 'dark' ? '700' : '300'}`} className="pt--normal d--inline-block">{messages.honCodeLinkText}</A>
      </Paragraph>
    </Box>
  );
}

HONCodeBox.defaultProps = {
  code: '',
  messages: {
    honCodeAccreditation: 'Esta página cumple con los estándares de calidad informativa',
    honCodeLinkText: 'Compruébelo aquí.',
    honCodeImgDesc: 'Nosotros subscribimos Los Principios del código HONcode de la Fundación Salud en la Red'
  },
};

HONCodeBox.propTypes = {
  /**
   * The orientation of the list
   */
  code: PropTypes.string,

  /**
   * Text color
   */
  textColor: PropTypes.string,

  /**
   * Texts for HONCode banner
   */
  messages: PropTypes.object
};

export default HONCodeBox;
