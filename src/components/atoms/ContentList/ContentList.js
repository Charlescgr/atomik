import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ContentList({
  // eslint-disable-next-line no-shadow
  type: ContentList, children, type, fontFamily, ...props
}) {
  // -- theme
  const { theme, getColor } = useTheme();

  // -- allowed props
  const propsBlacklist = [
    'children',
    'className',
    'type',
    'listStyleType',
    'fontFamily'
  ];
  const allowedProps = omit(props, propsBlacklist);

  return (
    <>
      <ContentList
        className={`list-on-content mlr--x-big mtb--big c--grey-neutral-800 lh--1-8 ${handleCreateStyleClass({ ...props, fontFamily }, type)}`}
        {...allowedProps}
      >
        {children}
      </ContentList>

      <style jsx global>
        {`
        // common styles, global
        .list-on-content li{
          font-size: ${theme.fontSizes.normal};
          color: ${getColor('grey-neutral.800')};
          padding-top: ${theme.spacings.small};
          padding-bottom: ${theme.spacings.small};
          line-height: 1.8em;
        }
        .list-on-content a{
          font-size: ${theme.fontSizes.normal};
          color: ${getColor('secondary.600')};
          border-bottom-style: dotted;
          border-bottom-width: 1px;
          border-bottom-color: ${getColor('secondary.600')};
        }
      `}
      </style>
    </>
  );
}

ContentList.defaultProps = {
  type: 'ul',
  fontFamily: 'serif'
};

ContentList.propTypes = {
  /**
   * The type for the List ul or ol.
   */
  type: PropTypes.string,

  /**
   * The style of type
   */
  listStyleType: PropTypes.string,

  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The font family.
   */
  fontFamily: PropTypes.oneOf(['serif', 'sans'])
};

export default ContentList;
