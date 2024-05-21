/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { v4 as uuid } from 'uuid';

import List from '../../atoms/List';
import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Tabs({
  activeTab, children, onTabChange, ...props
}) {
  const [showTab, setShowTab] = useState(activeTab);
  const { getColor } = useTheme();

  const propsBlacklist = [
    'activeTab',
    'onTabChange',
    'activeTab',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .tab__list {
      border-bottom: 1px solid ${getColor('grey-neutral.50')};
    }
    .tab__item.active{
      border-bottom: 2px solid ${getColor('main.500')};
      font-weight: bold;
    }
    .tab__item:hover{
      background-color: ${getColor('grey-neutral.50')};
      transition: all 0.5s;
    }
  `;

  const handleClickTab = (tab) => {
    setShowTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  useEffect(() => {
    if (onTabChange) {
      onTabChange(showTab);
    }
  }, [showTab]);

  return (
    <Box
      className={`tabs ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <List className={`tab__list ${className} d--flex ai--flex-start`}>
        {children.map((child, index) => (
          <li
            key={uuid()}
            onClick={() => handleClickTab(index)}
            className={`tab__item ${className} ff--sans p--normal c--pointer c--grey-neutral-800${index === showTab ? ' active' : ''}`}
          >
            {child.props.label}
          </li>
        ))}
      </List>
      <Box className={`tab__content ${className} p--normal`}>
        {children.map((child, index) => {
          if (index !== showTab) return undefined;
          return child.props.children;
        })}
      </Box>
      {styles}
    </Box>
  );
}

Tabs.defaultProps = {
  activeTab: 0,
};

Tabs.propTypes = {
  /**
   * The index of the active tab
   */
  activeTab: PropTypes.number,

  /**
   * The callback of the tab change event
   */
  onTabChange: PropTypes.func,

  /**
   * The custom className
   */
  className: PropTypes.string,

  /**
   * The tabs content.
   */
  children: PropTypes.instanceOf(Array).isRequired,

};

export default Tabs;
