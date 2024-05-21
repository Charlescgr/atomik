import chroma from 'chroma-js';

const colorsData = [
  { baseColor: '#314E79', baseColorName: 'lmem-primary', colorMode: 'rgb' },
  { baseColor: '#2CB3AA', baseColorName: 'lmem-secondary', colorMode: 'rgb' },
  { baseColor: '#3990B0', baseColorName: 'mcs-primary', colorMode: 'rgb' },
  { baseColor: '#A9D42D', baseColorName: 'mcs-secondary', colorMode: 'rgb' },
  { baseColor: '#DD5371', baseColorName: 'em-primary', colorMode: 'rgb' },
  { baseColor: '#B11E31', baseColorName: 'em-secondary', colorMode: 'rgb' },

  { baseColor: '#7D7D7D', baseColorName: 'grey-neutral', colorMode: 'rgb' },
  { baseColor: '#87877D', baseColorName: 'grey-warm', colorMode: 'rgb' },
  { baseColor: '#7D8791', baseColorName: 'grey-cold', colorMode: 'rgb' },
  { baseColor: '#FF7978', baseColorName: 'red', colorMode: 'rgb' },
  { baseColor: '#FF78B9', baseColorName: 'pink', colorMode: 'rgb' },
  { baseColor: '#B378FF', baseColorName: 'purple', colorMode: 'rgb' },
  { baseColor: '#486DB7', baseColorName: 'indigo', colorMode: 'rgb' },
  { baseColor: '#4EC0DF', baseColorName: 'blue', colorMode: 'rgb' },
  { baseColor: '#7BE1C9', baseColorName: 'acqua', colorMode: 'rgb' },
  { baseColor: '#61CF6C', baseColorName: 'green', colorMode: 'rgb' },
  { baseColor: '#AECF61', baseColorName: 'lime', colorMode: 'rgb' },
  { baseColor: '#FEDF70', baseColorName: 'yellow', colorMode: 'rgb' },
  { baseColor: '#FF912C', baseColorName: 'orange', colorMode: 'rgb' }
];

const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const buildColors = (prefix, prop) => {
  const colors = colorsData.map((color) => {
    const lowerColor = chroma(color.baseColor).luminance(0.99, color.colorMode);
    const upperColor = chroma(color.baseColor).luminance(0.01, color.colorMode);
    const colorsScale = chroma
      .scale([lowerColor, color.baseColor, upperColor])
      .mode(color.colorMode)
      .cache(false);
    return colorSteps.map(
      (scale) => ` .${prefix}--${color.baseColorName}-${parseInt(
        scale,
        10
      )}{${prop}: ${colorsScale(scale / 1000).hex()}}`
    );
  });

  return colors.toString().replace(/,/g, '');
};
