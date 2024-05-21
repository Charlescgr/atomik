import React from 'react';
import PropTypes from 'prop-types';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Paragraph from '../../atoms/Paragraph';

import { handleCreateStyleClass } from '../../_settings/Utils';
import A from '../../atoms/A';

function AuthorAndDate({
  author, date, messages, permalink, showDate, ...props
}) {
  return (
    <Box className={`${handleCreateStyleClass(props)} d--flex ai--flex-start`}>
      <Icon inline color="secondary.600" size="small" prefix="bx" name="pencil" className="mt--normal mr--normal" />
      <Paragraph size="small" textColor="grey-neutral.800" className="lh--1-7 ff--serif fs--small">
        {messages?.writtenBy}
        {' '}
        <A to={permalink} externalLink target="_self" textColor="main.800">
          <strong>
            {author}
          </strong>
        </A>
        {showDate && (
          <>
            ,
            {' '}
            {date}
          </>
        )}
      </Paragraph>
    </Box>
  );
}

AuthorAndDate.defaultProps = {
  showDate: true,
};

AuthorAndDate.propTypes = {
  /**
   * The author's name
   */
  author: PropTypes.string.isRequired,

  /**
   * The created time
   */
  date: PropTypes.string.isRequired,

  /**
   * The custom classNames
   */
  className: PropTypes.string,

  /**
   * The link to author profile
   */
  permalink: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    writtenBy: PropTypes.string
  }),

  showDate: PropTypes.bool
};

export default AuthorAndDate;
