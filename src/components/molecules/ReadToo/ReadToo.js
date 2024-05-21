import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Divider from '../../atoms/Divider';
import Paragraph from '../../atoms/Paragraph';

function ReadToo({
  text, url, title, ...props
}) {
  const propsBlacklist = [
    'text',
    'url',
    'title',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  return (
    <>
      <Divider color="main.100" />
      <Box
        className={`read-too ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        <Paragraph className="fs--normal ff--serif lh--2">
          {text && (
            <strong className="c--grey-neutral-800">
              {text}
            </strong>
          )}
          {' '}
          <A to={url} title={title} aria-label={`Link for related article ${title}`} underlineColor="secondary.600" lineType="solid" textColor="secondary.600" className="fw--bold">
            {title}
          </A>
        </Paragraph>
      </Box>
      <Divider color="main.100" />
    </>
  );
}

ReadToo.propTypes = {
  /**
   * The text without link
   */
  text: PropTypes.string,

  /**
   * The url for the link
   */
  url: PropTypes.string.isRequired,

  /**
   * The text with link
   */
  title: PropTypes.string.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default ReadToo;
