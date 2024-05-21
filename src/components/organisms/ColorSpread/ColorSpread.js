import React, { useState } from 'react';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import css from 'styled-jsx/css';

import Box from '../../atoms/Box';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import ColorCard from '../../molecules/ColorCard';

function ColorSpread({
  baseColor, baseColorName, colorMode
}) {
  // -- state
  const [isExpandedCode, setIsExpandedCode] = useState(false);

  // -- scripts
  const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const lowerColor = chroma(baseColor).luminance(0.99, colorMode);
  const upperColor = chroma(baseColor).luminance(0.01, colorMode);
  // const lowerColor = chroma(baseColor).set('hcl.l', 100);
  // const upperColor = chroma(baseColor).set('hcl.l', 5);
  const colorsScale = chroma.scale([lowerColor, baseColor, upperColor]).mode(colorMode).cache(false);
  // const colorsScale = chroma.scale([lowerColor, upperColor]).mode(colorMode).correctLightness().cache(false);
  // console.log(chroma(baseColor).get('hcl.l'));
  // const colorsScale = (color) => (
  //   chroma.scale(['#fff', color])
  //     .mode('hsl')
  //     .correctLightness()
  //     .cache(false));
  const colorObj = {
    [baseColorName]:
      colorSteps.map((step) => (
        { [parseInt(step, 10)]: colorsScale(step / 1000).hex() }
      )).reduce((r, c) => ({ ...r, ...c }), {})
  };

  // -- style/css
  const { className, styles } = css.resolve`
    .color__mini {
      width: 16px;
      height: 16px;
      background-color: ${baseColor};
    }
    .pre {
      border: 1px solid #e5e5e5;
    }
  `;

  return (
    <>
      <Box className="color-spread">
        <Paragraph className="color__name d--flex ai--center fw--bold mt--small ff--sans">
          <span className={`color__mini ${className} mr--normal br--small d--inline-block`}></span>
          {`${baseColorName} - ${baseColor} `}
          <Button rounded size="custom" color="grey-cold.100" onClick={() => setIsExpandedCode(!isExpandedCode)} className="ml--big">Toggle Code / Palette</Button>
        </Paragraph>
        { isExpandedCode
        && (
          <pre className="ff--sans m--big p--normal br--small bc--grey-cold-50 p--x-big">
            {
              JSON.stringify(colorObj, null, 2)
            }
          </pre>
        )}
        { !isExpandedCode
        && (
          <Box className="color-steps d--flex">
            {
              colorSteps.map((step) => (
                <React.Fragment key={step}>
                  <ColorCard color={colorsScale(step / 1000).hex()} colorName={`${baseColorName}-${step}`} />
                </React.Fragment>
              )
              )
            }
          </Box>
        )}
      </Box>

      {/* comom styles */}
      {styles}
    </>
  );
}

ColorSpread.defaultProps = {
  baseColor: '#123456',
  baseColorName: 'Weird Gray',
  colorMode: 'hsl'
};

ColorSpread.propTypes = {

  /**
   * The base color of the ColorSpread
   */
  baseColor: PropTypes.string,

  /**
   * The base color name of the ColorSpread
   */
  baseColorName: PropTypes.string,

  /**
   * The base colorMode to generate the ColorSpread
   */
  colorMode: PropTypes.string,

};

export default ColorSpread;
