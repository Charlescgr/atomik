import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import throttle from '@charlescgr/underline/dist/throttle';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, generateUUID } from '../../_settings/Utils';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

function ConsultContactFloating({
  email, telephone, messages, ...props
}) {
  const [showAds, setShowAds] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { colorMode } = useTheme();

  const propsBlacklist = [
    'email',
    'telephone',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  useEffect(() => {
    if (!isBrowser()) return;

    // scroll
    const handleScroll = throttle(() => {
      const d = document.documentElement;
      const e = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      setScrollPosition(Math.round(((d[st] || e[st]) / ((d[sh] || e[sh]) - d.clientHeight)) * 100));
    }, 500);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 1) {
      setShowAds(true);
    } else {
      setShowAds(false);
    }
  }, [scrollPosition]);

  const handleGo = (val) => {
    if (!val.includes('@')) {
      window.open(`tel:${val}`);
    } else {
      window.open(`mailto:${val}`, '_blank');
    }
  };

  const { className, styles } = css.resolve`
    .consult-contact-floating {
      transition: transform 1s ease;
      box-shadow: 1px 1px 8px rgb(0, 0, 0, 0.20);
    }

    .is--visible {
      transform: translateY(0px);
    }

    .is--hidden {
      transform: translateY(150px);
    }
  `;

  return (
    <Box
      className={`consult-contact-floating ${className} ${handleCreateStyleClass(props)} ${showAds ? 'is--visible ' : 'is--hidden '}${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--grey-neutral-50'} d--flex ai--center jc--center ptb--normal l--0 b--0 ta--center p--fixed zi--8 w--100`}
      data-ads-box="true"
      id={generateUUID()}
      {...allowedProps}
    >
      {telephone && (
        <Button hasIcon rounded onClick={() => handleGo(telephone)} textColor="white" color="main.800" size="normal" className="fw--bold mlr--medium">
          <Icon inline color="white" size="normal" prefix="bx" name="phone-call" className="mr--normal" />
          {' '}
          {messages?.call}
        </Button>
      )}
      {email && (
        <Button hasIcon rounded onClick={() => handleGo(email)} textColor="white" color="blue.600" size="normal" className="fw--bold mlr--medium">
          <Icon inline color="white" size="normal" prefix="bxs" name="chat" className="mr--normal" />
          {' '}
          {messages?.contact}
        </Button>
      )}
      {/* custom styles */}
      {styles}
    </Box>
  );
}

ConsultContactFloating.propTypes = {

  /**
 * The email
 */
  email: PropTypes.string,

  /**
  * The phone number
  */
  telephone: PropTypes.string,

  /**
  * Texts content
  */
  messages: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    call: PropTypes.string,
    onlineService: PropTypes.string,
    costPerSession: PropTypes.string,
    presentialAssistance: PropTypes.string
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default ConsultContactFloating;
