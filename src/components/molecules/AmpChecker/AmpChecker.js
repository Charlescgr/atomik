import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Icon from '../../atoms/Icon';
import Paragraph from '../../atoms/Paragraph';

export default function AmpChecker({
  children, text, redirectToIfAmp, ...props
}) {
  const { getColor } = useTheme();
  const isAmp = useAmp();

  const propsBlacklist = [
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .amp-checker{
      width: 100%;
      height: 145px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: ${getColor('grey-neutral.50')};
      border: 2px dashed ${getColor('grey-neutral.200')};
      transition: background-color 250ms ease-out;
      cursor: pointer;
    }

    .amp-checker:hover{
      background-color: ${getColor('grey-neutral.100')};
    }
  `;

  return (
    <>
      { isAmp ? (
        <a
          className={`amp-checker ${className} ${handleCreateStyleClass(props)}`}
          {...allowedProps}
          href={redirectToIfAmp}
          target="_self"
        >
          <Icon prefix="bx" name="message-square-error" color="grey-neutral.400" size="medium" />
          <Paragraph className="ff--sans mt--medium" textColor="grey-neutral.500">{text}</Paragraph>
        </a>
      ) : (
        children
      )}
      {/* styles */}
      {styles}
    </>
  );
}

AmpChecker.propTypes = {
  /**
    * The content of the modal
  */
  children: PropTypes.any.isRequired,

  /**
    * The error message.
  */
  text: PropTypes.string.isRequired,

  /**
    * The custom classname prop.
  */
  className: PropTypes.string,

  /**
    * URL for redirection if AMP
  */
  redirectToIfAmp: PropTypes.string.isRequired
};
