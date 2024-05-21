import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Button from '../../atoms/Button';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

export default function TableOfContent({
  title, items, loadOpen, ...props
}) {
  const isAmp = useAmp();

  // -- blacklist
  const propsBlacklist = [
    'title',
    'items',
    'loadOpen',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme
  const { getColor, direction } = useTheme();

  // -- state
  const [open, setOpen] = useState(loadOpen);
  const [elementMaxHeight, setElementMaxHeight] = useState(isAmp ? 450 : null);

  // -- scripts
  useEffect(() => {
    const elementRef = document.querySelector('.table-of-content__content');

    function handleResizing() {
      if (elementRef) {
        setElementMaxHeight(elementRef.getBoundingClientRect().height);
      }
    }
    handleResizing();
    window.addEventListener('resize', handleResizing);

    return () => {
      window.removeEventListener('resize', handleResizing);
    };
  }, []);

  const { className, styles } = css.resolve`
    .table-of-content {
      height: 55px;
      transition: all 0.3s ease;
      background-color: ${getColor(open ? 'main.100' : 'main.400')};
      border-radius: 8px;
    }

    .table-of-content.is--open:hover{
      background-color: ${getColor('main.100')};
    }

    .table-of-content.is--hidding:hover{
      background-color: ${getColor('main.300')};
    }

    .table-of-content.is--open {
      height: ${elementMaxHeight + 58}px;
      transition: all 0.3s ease;
    }

    .table-of-content__item{
      border-bottom: 1px dashed ${getColor('main.300')};
    }
    .table-of-content__item:last-child{
      border-bottom: none;
    }

    .table-of-content__link:hover {
      background-color: ${getColor('main.200')};
    }
  `;

  return (
    <Box
      className={`table-of-content ${className} ${open ? ' is--open' : ' is--hidding'} ptb--small o--hidden ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Button
        hasicon
        rounded
        size="medium"
        textColor={open ? 'main.700' : 'white'}
        onClick={() => setOpen(!open)}
        className="fw--bold w--100"
      >
        <Icon
          color={open ? 'main.700' : 'white'}
          name={open ? 'minus' : 'plus'}
          className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
        />
        {title}
      </Button>
      <Box className={`table-of-content__content ${className} plr--big pb--small`}>
        <List>
          {items.map(({ to, label }) => (
            <li
              key={to}
              className={`table-of-content__item ${className}`}
            >
              <A
                to={to}
                as={to}
                title={label}
                textColor="main.800"
                className={`table-of-content__link ${className} d--flex ai--center jc--space-between ff--sans fs--normal ptb--normal plr--normal`}
              >
                {label}
                <Icon
                  color="main.800"
                  name={`chevron${direction === 'rtl' ? '-left' : '-right'}`}
                />
              </A>
            </li>
          ))}
        </List>
      </Box>

      {/* styles */}
      {styles}
    </Box>
  );
}

TableOfContent.defaultProps = {
  loadOpen: true,
};

TableOfContent.propTypes = {
  /**
    * The content of the list
  */
  title: PropTypes.any.isRequired,

  /**
    * Inform if the component load opened or closed
  */
  loadOpen: PropTypes.bool,

  /**
   * The items from breadcrumb (label + to: link)
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
    * The custom classname prop.
  */
  className: PropTypes.string,
};
