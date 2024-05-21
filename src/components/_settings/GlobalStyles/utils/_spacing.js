import React from 'react';
import PropTypes from 'prop-types';

const buildSpacingClasses = (prefix, obj) => {
  const spacingKeys = ['0', 'small', 'normal', 'medium', 'x-medium', 'big', 'x-big'];
  const propName = prefix === 'p' ? 'padding' : 'margin';

  const spacings = spacingKeys.map(

    (key) => (`
      .${prefix}--${key}{
        ${propName}:${obj[key]};
      }

      .${prefix}t--${key}{
        ${propName}-top:${obj[key]};
      }

      .${prefix}b--${key}{
        ${propName}-bottom:${obj[key]};
      }

      .${prefix}tb--${key}{
        ${propName}-top:${obj[key]};
        ${propName}-bottom: ${obj[key]};
      }

      .${prefix}l--${key}{
        ${propName}-left:${obj[key]};
      }

      .${prefix}r--${key}{
        ${propName}-right:${obj[key]};
      }

      .${prefix}lr--${key}{
        ${propName}-left: ${obj[key]};
        ${propName}-right: ${obj[key]};
      }
    `)
  );
  return spacings.toString().replace(/,/g, '').replace(/\s+/g, '').trim();
};

let allFormattedStyles = '';
function SpacingClasses({ data }) {
  if (process.env.STORYBOOK) {
    const rawBuiltMargin = buildSpacingClasses('m', data.spacings);
    const rawBuiltPadding = buildSpacingClasses('p', data.spacings);

    if (typeof document === 'undefined') {
      return '';
    }

    allFormattedStyles = document.createElement('style');

    document.head.appendChild(allFormattedStyles);
    allFormattedStyles.innerText = rawBuiltMargin + rawBuiltPadding;
  }
  return (
    <style jsx global>
      {`

      // margins
      .mlr--auto {
        margin-right: auto;
        margin-left: auto;
      }

      .ml--auto {
        margin-left: auto;
      }

      .mr--auto {
        margin-right: auto;
      }

      ${!process.env.STORYBOOK ? buildSpacingClasses('m', data.spacings) : null}


      // paddings
      ${!process.env.STORYBOOK ? buildSpacingClasses('p', data.spacings) : null}

      { style-jsx: enable }

      // format grid padding
      @media only screen and (min-width: ${data.medias.tablet}) {
        .two__columns__padding > .column:nth-child(odd) {
          padding-right: 10px;
          padding-left: 0;
        }
        .two__columns__padding > .column:nth-child(even) {
          padding-right: 0;
          padding-left: 10px;
        }

        .two__columns__padding-reverse > .column:nth-child(odd){
          padding-left: 10px;
          padding-right: 0;
        }
        .two__columns__padding-reverse > .column:nth-child(even){
          padding-left: 0;
          padding-right: 10px;
        }

        .three__columns__padding > .column:first-child {
          padding-right: 16px;
          padding-left: 0px;
        }
        .three__columns__padding > .column:nth-child(2) {
          padding-right: 8px;
          padding-left: 8px;
        }
        .three__columns__padding > .column:last-child {
          padding-right: 0px;
          padding-left: 16px;
        }
      }
    `}
    </style>
  );
}

SpacingClasses.propTypes = {
  /**
  * The object spacing.
  */
  data: PropTypes.any
};

export default SpacingClasses;
