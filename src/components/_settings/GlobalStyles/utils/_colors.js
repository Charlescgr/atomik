import React from 'react';
import PropTypes from 'prop-types';

const buildColorClasses = (prefix, themeObj, colorMode) => {
  let propName = '';
  switch (prefix) {
    case 'c':
      propName = 'color';
      break;
    case 'bc':
      propName = 'background-color';
      break;
    default:
      propName = 'fill';
      break;
  }

  const checkColorScale = (variation) => {
    let scaleColor = '';
    if (colorMode === 'dark') {
      switch (variation) {
        case '50':
          scaleColor = '1000';
          break;
        case '100':
          scaleColor = '900';
          break;
        case '200':
          scaleColor = '800';
          break;
        case '300':
          scaleColor = '700';
          break;
        case '400':
          scaleColor = '600';
          break;
        case '600':
          scaleColor = '400';
          break;
        case '700':
          scaleColor = '300';
          break;
        case '800':
          scaleColor = '200';
          break;
        case '900':
          scaleColor = '100';
          break;
        case '1000':
          scaleColor = '50';
          break;
        default:
          scaleColor = '500';
      }
    } else {
      scaleColor = variation;
    }
    return scaleColor;
  };

  const onlyThemeColors = [themeObj.mainColor, themeObj.secondaryColor];
  if (!onlyThemeColors.includes('grey-neutral')) onlyThemeColors.push('grey-neutral');
  if (!onlyThemeColors.includes('grey-warm')) onlyThemeColors.push('grey-warm');
  if (!onlyThemeColors.includes('grey-cold')) onlyThemeColors.push('grey-cold');
  const colors = onlyThemeColors.map(
    (color) => {
      let colorNamePlus = '';
      let colorName = color.toString();
      /* this script does not create the color class when the name is the same as the main or secundary color
      ex: grey-cold-400 -> main-400 ... ping-800 -> secundary-800
      this is to reduce the number of unnecessary classes
      if (colorName === themeObj.mainColor) {
        colorName = 'main';
      } else if (colorName === themeObj.secondaryColor) {
        colorName = 'secondary';
      } else {
        colorName = color;
      }
      */
      let result = '';

      // generate all colors
      colorName = color;

      // generate just main and scundary colors
      if (colorName === themeObj.mainColor) {
        colorName = 'main';
        if (themeObj.mainColor === themeObj.secondaryColor) {
          colorNamePlus = 'secondary';
          result += Object.keys(themeObj.customColors[color]).map((variation) => ` .${prefix}--${colorNamePlus}-${variation}{${propName}:${themeObj.customColors[color][checkColorScale(variation)]}}`);
        }
      } if (colorName === themeObj.secondaryColor) {
        colorName = 'secondary';
      }

      result += Object.keys(themeObj.customColors[color]).map((variation) => ` .${prefix}--${colorName}-${variation}{${propName}:${themeObj.customColors[color][checkColorScale(variation)]}}`);

      return result.trim();
    });
  return colors.toString().replace(/,/g, '');
};

function ColorsClasses({ data, colorMode }) {
  if (process.env.STORYBOOK || colorMode) {
    const rawBuildedColors = buildColorClasses('c', data, colorMode);
    const rawBuildedBackgroundColors = buildColorClasses('bc', data, colorMode);
    const rawBuildedFillColors = buildColorClasses('f', data, colorMode);

    if (typeof document === 'undefined') {
      return '';
    }
    const id = '__globalstyle';
    let allFormatedStyles = document.getElementById(id);
    if (allFormatedStyles) {
      allFormatedStyles.innerText = rawBuildedColors + rawBuildedBackgroundColors + rawBuildedFillColors;
    } else {
      allFormatedStyles = document.createElement('style');
      allFormatedStyles.id = id;
      document.head.appendChild(allFormatedStyles);
      allFormatedStyles.innerText = rawBuildedColors + rawBuildedBackgroundColors + rawBuildedFillColors;
    }
  }

  return (
    <style jsx global>
      {`
          /* custom colors */
          ${!process.env.STORYBOOK && !colorMode ? buildColorClasses('c', data) : ''}

          /* commom colors */
          .c--white {
            color: #fff;
          }
          .c--black {
            color: #000;
          }

          /* social colors */
          .c--facebook {
            color: ${data.commomColors.facebook};
          }
          .c--twitter {
            color: ${data.commomColors.twitter};
          }
          .c--youtube {
            color: ${data.commomColors.youtube};
          }
          .c--instagram {
            color: ${data.commomColors.instagram};
          }
          .c--google {
            color: ${data.commomColors.google};
          }
          .c--pinterest {
            color: ${data.commomColors.pinterest};
          }
          .c--whatsapp {
            color: ${data.commomColors.whatsapp};
          }
          .c--linkedin {
            color: ${data.commomColors.linkedin};
          }
          .c--share-link {
            color: ${data.commomColors['share-link']};
          }

          /* custom background-colors */
          ${!process.env.STORYBOOK && !colorMode ? buildColorClasses('bc', data) : ''}

          /* commom background-colors */
          .bc--white {
            background-color: #fff;
          }
          .bc--black {
            background-color: #000;
          }
          .bc--transparent{
            background-color:transparent;
          }

          /* social background-colors */
          .bc--facebook {
            background-color: ${data.commomColors.facebook};
          }
          .bc--twitter {
            background-color: ${data.commomColors.twitter};
          }
          .bc--youtube {
            background-color: ${data.commomColors.youtube};
          }
          .bc--instagram {
            background-color: ${data.commomColors.instagram};
          }
          .bc--google {
            background-color: ${data.commomColors.google};
          }
          .bc--pinterest {
            background-color: ${data.commomColors.pinterest};
          }
          .bc--whatsapp {
            background-color: ${data.commomColors.whatsapp};
          }
          .bc--linkedin {
            background-color: ${data.commomColors.linkedin};
          }
          .bc--share-link {
            background-color: ${data.commomColors['share-link']};
          }

          /* custom Fill colors, for icons */
          ${!process.env.STORYBOOK && !colorMode ? buildColorClasses('f', data) : ''}

          .f--white {
            fill: ${data.commomColors.white};
          }

          .f--black {
            fill: ${data.commomColors.white};
          }
        `}
    </style>
  );
}

ColorsClasses.propTypes = {
  /**
  * The object customColors.
  */
  data: PropTypes.any,

  /**
  * The color mode of the theme dark || light.
  */
  colorMode: PropTypes.any
};

export default ColorsClasses;
