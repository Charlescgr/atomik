/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Heading from '../../atoms/Heading';

function TitleCustom({
  children,
  type,
  lineType,
  lineColor,
  titleIsSpan,
  className,
  ...props
}) {
  const { textColor, size } = props;
  const { getColor } = useTheme();

  const lineColorHex = (lineColor) ? getColor(lineColor) : 'transparent';

  const propsBlacklist = [
    'className',
    'type',
    'size',
    'textColor',
    'lineType',
    'lineColor',
    'titleIsSpan'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const handleCreateClassSpan = () => {
    let classSpan = '';
    if (size === 'x-small') {
      classSpan = 'fs--x-small fw--bold lh--2 ls--medium';
    } else if (size === 'small') {
      classSpan = 'fs--small fw--bold lh--2 ls--big';
    } else if (type === 'h6') {
      classSpan = 'fs--normal fw--bold lh--2 ls--big';
    } else if (size === 'normal' || type === 'h5') {
      classSpan = 'fs--normal fw--bold lh--1-5 ls--big';
    } else if (size === 'medium' || type === 'h4') {
      classSpan = 'fs--medium fw--bold lh--1-3 ls--normal';
    } else if (size === 'x-medium') {
      classSpan = 'fs--x-medium fw--bold lh--1-2 ls--medium';
    } else if (size === 'xx-medium' || type === 'h3') {
      classSpan = 'fs--xx-medium fw--bold lh--1-2 ls--medium';
    } else if (size === 'big' || type === 'h2') {
      classSpan = 'fs--big fw--bold lh--1-2 ls--normal';
    } else {
      classSpan = 'fs--x-big fw--bold lh--1 ls--small'; // h1
    }
    return classSpan;
  };
  return (
    <>
      {titleIsSpan ? (
        <>
          <span
            className={`${handleCreateClassSpan()} ff--sans d--block ${className} ${handleCreateStyleClass({ ...props, lineType }, 'text')}`}
            {...allowedProps}
          >
            {!props?.dangerouslySetInnerHTML ? children : null}
          </span>
        </>
      ) : (
        <Heading
          type={type}
          size={size}
          textColor={textColor}
          lineType={lineType}
          lineColor={lineColor}
          className={className}
          {...allowedProps}
        >
          {!props?.dangerouslySetInnerHTML ? children : null}
        </Heading>
      )}
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
    </>
  );
}

TitleCustom.defaultProps = {
  textColor: 'grey-neutral.600',
  titleIsSpan: true
};

TitleCustom.propTypes = {
  /**
   * The children element
   */
  children: PropTypes.any,

  /**
   * The dangerouslySetInnerHTML element
   */
  dangerouslySetInnerHTML: PropTypes.object,

  /**
   * The heading level type
   */
  type: PropTypes.string.isRequired,

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
  lineColor: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

};

export default TitleCustom;
