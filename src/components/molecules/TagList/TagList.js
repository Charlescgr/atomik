import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';

function TagList({
  tags, hasLink, changeColorOnMobile, ...props
}) {
  const { theme, colorMode, direction } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  const propsBlacklist = [
    'hasLink',
    'changeColorOnMobile',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .tag-list{
        overflow-x: initial;
        white-space: initial;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .tag-list{
      overflow-x: auto;
      white-space: nowrap;
    }
    .tag-list .tag__item:first-child{
      border-radius:${direction === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px'};
    }
    .tag-list .tag__item:last-child{
      margin:0;
      border-radius:${direction === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0'};
    }
  `;

  const backgroundStyle = () => {
    if (isDesktop) {
      if (colorMode === 'dark') {
        return 'bc--main-200';
      }
      return 'bc--main-50';
    }
    if (changeColorOnMobile) {
      return 'bc--main-800';
    }
    return 'bc--main-50';
  };

  const textColor = () => {
    if (isDesktop) {
      if (colorMode === 'dark') {
        return 'main.700';
      }
      return 'main.600';
    }
    if (changeColorOnMobile) {
      return 'main.200';
    }
    return 'main.600';
  };

  const theTag = (to, label) => {
    if (hasLink) {
      return (
        <A
          key={label}
          as={to}
          to={to}
          title={label?.toLowerCase()}
          textColor={textColor()}
          className={`tag__item ${className} ${mediaStyles.className} d--inline-block lh--2 plr--medium fs--small ff--sans mtb--small m${direction === 'rtl' ? 'l' : 'r'}--medium ${backgroundStyle()}`}
        >
          {label?.toLowerCase()}
        </A>
      );
    }
    return (
      <Span
        key={label}
        textColor={textColor()}
        className={`tag__item ${className} ${mediaStyles.className} d--inline-block lh--2 plr--medium fs--small ff--sans mtb--small m${direction === 'rtl' ? 'l' : 'r'}--medium ${backgroundStyle()}`}
      >
        {label?.toLowerCase()}
      </Span>
    );
  };

  return (
    <>
      <Box
        className={`tag-list ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        {tags?.map(({ to, label }) => (theTag(to, label)))}
      </Box>

      {/* comom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

TagList.defaultProps = {
  hasLink: true,
  changeColorOnMobile: true,
};

TagList.propTypes = {
  /**
   * The tags from the list (label + to: link)
   */
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Inform if the tags are links
   */
  hasLink: PropTypes.bool,

  /**
   * Change color on mobile version
   */
  changeColorOnMobile: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default TagList;
