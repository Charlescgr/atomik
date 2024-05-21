import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Heading({
  children,
  // eslint-disable-next-line no-shadow
  type: Heading,
  lineType,
  lineColor,
  ...props
}) {
  const { theme, getColor } = useTheme();

  const lineColorHex = (lineColor) ? getColor(lineColor) : 'transparent';

  const propsBlacklist = [
    'children',
    'className',
    'type',
    'size',
    'textColor',
    'lineType',
    'lineColor'
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <>
      <Heading
        className={`${handleCreateStyleClass({ ...props, lineType }, 'text')}`}
        {...allowedProps}
      >
        {children}
      </Heading>

      <style jsx>
        {`
          // custom styles
          .has--divider-solid {
            background-image: linear-gradient(to right, ${lineColorHex} 0%, ${lineColorHex} 10%);
            background-size: 10px 1px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
          .has--divider-dashed {
            background-image: linear-gradient(to right, ${lineColorHex} 45%, transparent 0%);
            background-size: 7px 1px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
          .has--divider-dotted {
            background-image: linear-gradient(to right, transparent 75%, ${lineColorHex} 5%);
            background-size: 4.5px 1.50px;
            background-position: bottom;
            background-repeat: repeat-x;
          }
        `}
      </style>
      <style jsx global>
        {`
          // commom styles
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${theme.fontFamilies.sans};
          }

          h1 {
            font-size: ${theme.fontSizes['x-big']};
            line-height: 1;
            letter-spacing: -0.02em;
            font-weight: 700;
          }

          h2 {
            font-size: ${theme.fontSizes.big};
            line-height: 1.25;
            letter-spacing: 0.01em;
            font-weight: 700;
          }

          h3 {
            font-size: ${theme.fontSizes['xx-medium']};
            line-height: 1.2;
            letter-spacing: 0.02em;
            font-weight: 700;
          }

          h4 {
            font-size: ${theme.fontSizes.medium};
            line-height: 1.4;
            letter-spacing: 0.01em;
            font-weight: 700;
          }

          h5 {
            font-size: ${theme.fontSizes.normal};
            line-height: 1.5;
            letter-spacing: 0.04em;
            font-weight: 700;
          }

          h6 {
            font-size: ${theme.fontSizes.normal};
            line-height: 2;
            letter-spacing: 0.04em;
            font-weight: 400;
          }
        `}
      </style>
    </>
  );
}

Heading.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  type: 'h1',
  textColor: 'main.800'
};

Heading.propTypes = {
  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The heading level type
   */
  type: PropTypes.string,

  /**
   * The font size
   */
  size: PropTypes.string,

  /**
   * The color of text
   */
  textColor: PropTypes.string,

  /**
   * The type of underline eg: dotted, dashed, solid
   */
  lineType: PropTypes.string,

  /**
   * The color of underline
   */
  lineColor: PropTypes.string
};

export default Heading;
