import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function Breadcrumb({ items, ...props }) {
  if (items.length <= 1) return null;

  const { getColor, direction, colorMode } = useTheme();
  const propsBlacklist = [
    'items',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- state
  const [hovered, setHovered] = useState(false);

  // -- scripts
  const toggleHover = () => setHovered(!hovered);

  const textColor = () => (colorMode === 'dark' ? 'grey-neutral.500' : 'grey-neutral.300');

  // -- component
  const breadCrumbDivision = (index, total) => (index < total) && <Icon prefix="bx" size="normal" name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="secondary.700" className={`p--absolute ${direction === 'rtl' ? 'r' : 'l'}--0`} />;

  // -- css style
  const hoverColor = 'secondary.700';
  const { className, styles } = css.resolve`
    .breadcrumb {
      width: 100%;
    }

    .breadcrumb__link:hover{
      color: ${getColor(hoverColor)}
    }
  `;

  return (
    <Box
      className={`breadcrumb ${handleCreateStyleClass(props)} ${className}`}
      {...allowedProps}
    >
      <List type="ol" className="breadcrumb__list pt--big pb--normal">
        {items.map(({
          to, label, active, externalLink
        }, index) => (
          <li key={to} className={`breadcrumb__item ${className} d--inline${direction === 'rtl' ? '-block' : ''}`}>
            {index === 0 ? (
              <A
                to={to}
                as={to}
                title={label}
                className={`breadcrumb__link p--relative p${direction === 'rtl' ? 'r' : 'l'}--big`}
                externalLink={externalLink}
              >
                <Icon
                  prefix="bxs"
                  size="small"
                  name="home"
                  color={hovered ? hoverColor : textColor()}
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
                  className={`breadcrumb__home ${className} p--absolute l--0 mt--${direction === 'rtl' ? '0' : 'small'}`}
                />
              </A>
            ) : (
              <A
                to={to}
                as={to}
                title={label}
                textColor={active ? 'secondary.600' : textColor()}
                className={`breadcrumb__link ${className} fs--small lh--1-7 fw--bold ff--sans tt--uppercase p--relative p${direction === 'rtl' ? 'r' : 'l'}--x-big`}
                externalLink={externalLink}
              >
                {breadCrumbDivision(index, items.length)}
                {label}
              </A>
            )}
          </li>
        ))}
      </List>

      {/* custom styles */}
      {styles}
    </Box>
  );
}

Breadcrumb.propTypes = {
  /**
   * The items from breadcrumb (label + to: link)
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string
};

export default Breadcrumb;
