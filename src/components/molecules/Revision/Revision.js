import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import Paragraph from '../../atoms/Paragraph';
import ToolTip from '../../atoms/ToolTip';
import Avatar from '../../atoms/Avatar';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Revision({
  from: {
    name, role, avatar, date, permalink, description
  },
  authorToolTip,
  compactVersion,
  messages,
  sessionLink,
  lazy,
  showDate,
  ...props
}) {
  const [showToolTip, setShowToolTip] = useState(false);
  const isAmp = useAmp();

  // -- theme context
  const { direction } = useTheme();

  const mediaStyles = css.resolve`
    @media only screen and (min-width: 600px){
      .link-tool-tip {
        position: relative;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .link-tool-tip {
      position: static;
    }
    .link-tool-tip .tool-tip {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .link-tool-tip:hover .tool-tip {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.5s ease;
    }
  `;

  const toolTipContent = () => (
    <ToolTip className={`${className} ${mediaStyles.className}`}>
      <Avatar src={avatar} alt={name} size="big" className={`${direction === 'rtl' ? 'f--right ml--normal' : 'f--left mr--normal'}`} />
      <div className="fs--small c--gray-neutral-600 ff--sans" dangerouslySetInnerHTML={{ __html: description }} />
    </ToolTip>
  );

  return (
    <Box className={`revision ${handleCreateStyleClass(props)} d--flex ${compactVersion ? 'ai--flex-start' : 'ai--center'} p--relative`}>
      {!compactVersion ? (
        <A to={permalink} target="_self" textColor="grey-neutral.800">
          <Avatar src={avatar} alt={name} size="big" />
        </A>
      ) : (
        <Icon inline color="secondary.600" size="small" prefix="bx" name="calendar-check" className={`mt--small m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
      )}

      {sessionLink ? (
        <>
          <Paragraph size="small" textColor="grey-neutral.800" className={`m${direction === 'rtl' ? 'r' : 'l'}--normal lh--1-7`}>
            {messages?.writtenBy}
            {' '}
            {role}
            {' '}
            <A
              to={permalink}
              onMouseOver={() => setShowToolTip(true)}
              onFocus={() => {}}
              onMouseOut={() => setShowToolTip(false)}
              onBlur={() => {}}
              underlineColor="main.600"
              lineType="dotted"
              textColor="grey-neutral.800"
              className={`link-tool-tip ${className} ${mediaStyles.className}`}
            >
              {showToolTip && authorToolTip ? toolTipContent() : ''}
              <strong>
                {name}
              </strong>
            </A>
            {showDate && (
              <>
                {' '}
                {messages?.in}
                {' '}
                {date}
                {' '}
              </>
            )}
            •
            {' '}
            <A to={sessionLink} textColor="secondary.600" lineType="solid" className="d--inline-block">
              <strong>
                {messages?.makeAppointmentOnline}
              </strong>
            </A>
          </Paragraph>
        </>
      ) : (
        <Paragraph size="small" className={`m${direction === 'rtl' ? 'r' : 'l'}--normal lh--1-7`}>
          {messages?.reviewedApprovedBy}
          {' '}
          {role}
          {' '}
          <A
            to={permalink}
            onMouseOver={() => setShowToolTip(true)}
            onFocus={() => {}}
            onMouseOut={() => setShowToolTip(false)}
            onBlur={() => {}}
            underlineColor="main.600"
            lineType="dotted"
            textColor="grey-neutral.800"
            className={`link-tool-tip ${className} ${mediaStyles.className}`}
          >
            {showToolTip && authorToolTip ? toolTipContent() : ''}
            <strong>{name}</strong>
          </A>
          {showDate && (
            <>
              {' '}
              {messages?.in}
              {' '}
              {date}
            </>
          )}
          .
        </Paragraph>
      )}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

Revision.defaultProps = {
  sessionLink: false,
  lazy: true,
  authorToolTip: false,
  compactVersion: false,
  from: {
    role: ''
  },
  showDate: true
};

Revision.propTypes = {
  /**
   * The object with info from writer or revisor of the article
   */
  from: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    avatar: PropTypes.string,
    role: PropTypes.string,
    date: PropTypes.string.isRequired,
    permalink: PropTypes.string,
  }),

  /**
   * The link to schedule a session with the writer
   */
  sessionLink: PropTypes.string,

  /**
   * The custom className
   */
  className: PropTypes.string,

  /**
   * Inform if the author name have a tooltip info
   */
  authorToolTip: PropTypes.bool,

  /**
   * show a compact version
   */
  compactVersion: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    writtenBy: PropTypes.string,
    in: PropTypes.string,
    makeAppointmentOnline: PropTypes.string,
    reviewedApprovedBy: PropTypes.string
  }),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool,

  showDate: PropTypes.bool
};

export default Revision;
