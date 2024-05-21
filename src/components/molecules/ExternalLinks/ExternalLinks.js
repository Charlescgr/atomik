/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import List from '../../atoms/List';
import Box from '../../atoms/Box';
import A from '../../atoms/A';
import Image from '../../atoms/Image';

import TitleCustom from '../TitleCustom';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ExternalLinks({
  links, className, messages, utm, ...props
}) {
  if (links.length === 0) {
    return null;
  }
  const { theme, cdnPath, colorMode } = useTheme();

  const propsBlacklist = [
    'messages',
    'links',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const getImageSrc = (link = {}) => {
    const hasClass = !!(link?.classes && Array.isArray(link.classes) && link?.classes?.length > 0);

    if (hasClass) {
      return `${cdnPath}themes/${theme.base}/${link?.classes[0]}.svg`;
    }

    return '';
  };

  return (
    <Box className={`websites-area ${className}`} {...allowedProps}>
      <TitleCustom titleIsSpan type="h3" textColor={`main.${colorMode === 'dark' ? '700' : '300'}`} lineType="dashed" lineColor={`main.${colorMode === 'dark' ? '700' : '300'}`} className="pb--normal">
        {messages.otherSites}
      </TitleCustom>
      <List className="websites-area__list d--flex jc--flex-start fw--wrap">
        {links?.map((link) => (
          <li key={link.ID} className="mlr--medium">
            <A
              utm={utm}
              to={link.link}
              externalLink
              target="_blank"
              className="websites-area__link pt--big pb--normal d--block lh--1-5"
              rel={link.relation ? link.relation : 'noopener noreferrer'}
            >
              <Image
                className="websites-area__icon o--50"
                src={getImageSrc(link)}
                alt={`logo icon ${theme.base}`}
                width={32}
                height={32}
                layout="intrinsic"
                lazy
              />
            </A>
          </li>
        ))}
      </List>
    </Box>
  );
}

ExternalLinks.defaultProps = {
  links: [],
};

ExternalLinks.propTypes = {

  /**
   * The orientation of the list
   */
  links: PropTypes.array,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    otherSites: PropTypes.string,
  }),

  /**
   * UTM informations
   */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),
};

export default ExternalLinks;
