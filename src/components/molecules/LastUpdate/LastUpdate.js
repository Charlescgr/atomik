import React from 'react';
import PropTypes from 'prop-types';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Paragraph from '../../atoms/Paragraph';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function LastUpdate({ date, messages, ...props }) {
  const { direction } = useTheme();
  return (
    <Box className={`${handleCreateStyleClass(props)} d--flex ai--flex-start`}>
      <Icon inline color="secondary.600" size="small" prefix="bx" name="calendar-check" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal mt--normal`} />
      <Paragraph textColor="grey-neutral.800" size="small" className="lh--1-7 ptb--small">
        <strong>{messages?.lastUpdate}</strong>
        {' '}
        {date}
      </Paragraph>
    </Box>
  );
}

LastUpdate.propTypes = {
  /**
   * The date of last update. eg.: '24 Junio, 2020'
   */
  date: PropTypes.string.isRequired,

  /**
   * The custom classNames for the LastUpdate component
   */
  className: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    lastUpdate: PropTypes.string
  })
};

export default LastUpdate;
