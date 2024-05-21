import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import List from '../../atoms/List';

function LegalItems({ textColor, legalLinks, ...props }) {
  const { theme } = useTheme();
  const isAmp = useAmp();

  if (legalLinks.length === 0) {
    return null;
  }

  const propsBlacklist = [
    'textColor',
    'legalLinks',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      // ---
      .legal-links{
        text-align: center;
        margin-top:${theme.spacings.big};
        margin-bottom:${theme.spacings.big};
      }
      .legal-links__item{
        margin-left:${theme.spacings['x-big']};
        margin-right:${theme.spacings['x-big']};
        display: inline-block
      }
    }
  `;

  return (
    <>
      <List
        className={`legal-links ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >

        {legalLinks?.map(({
          ID, title, link
        }) => (
          <li
            key={ID}
            className={`legal-links__item ${mediaStyles.className}`}
          >
            <A
              externalLink
              to={link}
              target={'_blank'}
              title={title}
              className={`legal-links__link ${mediaStyles.className} p--normal fs--normal lh--1-5 ff--sans d--inline-block`}
              textColor={textColor}
              hoverColor="main.300"
            >
              {title}
            </A>
          </li>
        ))}
      </List>

      {/* styles */}
      {!isAmp && mediaStyles.styles}
    </>
  );
}
LegalItems.defaultProps = {
  textColor: 'main.800',
  legalLinks: []
};

LegalItems.propTypes = {
  /**
   * The link color
   */
  textColor: PropTypes.string,

  /**
   * List of items
   */
  legalLinks: PropTypes.array,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default LegalItems;
