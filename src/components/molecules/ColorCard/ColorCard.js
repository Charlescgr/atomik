import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';
import Paragraph from '../../atoms/Paragraph';

function ColorCard({ color, colorName }) {
  const defaultWidth = 80;
  // -- style/css
  const { className, styles } = css.resolve`
    .color-card {
      width: ${defaultWidth}px;
    }
    .color__background {
      background-color: ${color};
      width: ${defaultWidth}px;
      height: ${defaultWidth}px;
    }
  `;

  return (
    <>
      <Box className={`color-card ${className} d--flex fd--column`}>
        <span className={`color__background ${className} d--block`}>&nbsp;</span>
        <Paragraph className="color__name fw--bold mt--small lh--1-3 fs--normal">{colorName}</Paragraph>
        <Paragraph className="color__code tt--uppercase fs--small ff--sans">{color}</Paragraph>
      </Box>

      {/* comom styles */}
      {styles}
    </>
  );
}

ColorCard.defaultProps = {
  colorName: 'LMEM primary',
  color: '#314E79',
};

ColorCard.propTypes = {

  /**
   * The color
   */
  color: PropTypes.string,

  /**
   * The color name
   */
  colorName: PropTypes.string,

};

export default ColorCard;
