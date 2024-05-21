import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import TitleCustom from '../../molecules/TitleCustom';

function Address({
  title, titleType, showOpenAddress, showOpenCloseControl, address, messages, ...props
}) {
  // -- theme
  const { theme, direction } = useTheme();

  // -- amp
  const isAmp = useAmp();

  // -- black list allowedProps
  const propsBlacklist = [
    'title',
    'showOpenAddress',
    'showOpenCloseControl',
    'titleType',
    'address',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- refs
  const heightList = useRef(null);

  // -- states
  const [runFirstTime, setRunFirstTime] = useState(true);
  const [open, setOpen] = useState(showOpenAddress ? 'open' : '');
  const [heightSize, setHeightSize] = useState(0);

  // -- scripts
  const handleGo = (url) => {
    window.open(url, '_blank');
  };

  // toggle open/close review
  const handleToggle = () => {
    setOpen(open === '' ? 'open' : '');
    setHeightSize(open === 'open' ? 0 : heightList.current.scrollHeight);
  };

  useEffect(() => {
    setHeightSize(showOpenAddress ? heightList.current.scrollHeight : 0);
    setTimeout(() => { setRunFirstTime(false); }, 2000);
  }, []);

  // -- component
  const titleAddress = () => {
    if (showOpenCloseControl) {
      return (
        <Button
          size="custom"
          color="transparent"
          className="p--relative p--0 w--100"
          onClick={handleToggle}
        >
          <TitleCustom type="h3" textColor="main.800" className="mt--normal">{title}</TitleCustom>
          <Icon inline color="main.800" size="normal" prefix="bx" name={`chevron-${open !== '' ? 'up' : 'down'}`} className={`p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 mt--small`} />
        </Button>
      );
    }
    return <TitleCustom type="h3" textColor="main.800" className="mt--normal">{title}</TitleCustom>;
  };

  // -- styles
  const mediaStyles = css.resolve`
  `;

  const { className, styles } = css.resolve`
    .map{
      margin-left: -16px;
      margin-right: -16px;
      width: calc(100% + 32px);
    }

    .address__group {
      transition: max-height ${runFirstTime && showOpenAddress ? '0' : '1'}s ease 0s;
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .map{
        margin-left: 0px;
        margin-right: 0px;
        width: 100%;
      }
    }
  `;

  return (
    <>
      {titleAddress()}
      <div
        ref={heightList}
        style={{ maxHeight: `${heightSize}px` }}
        className={`address__group ${className} ${open !== '' ? 'is--open ' : ''}o--hidden p--relative mb--normal`}
        {...allowedProps}
      >
        <Paragraph textColor="main.800" className="mt--normal mb--big">{address}</Paragraph>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?123456"
          width="100%"
          height="250"
          className={`map ${className} ${mediaStyles.className} mb--normal`}
        >
        </iframe>
        <Box className={`d--flex ai--center jc--center ${messages.call || messages.contact ? 'mt--big' : ''}`}>
          {messages.call && (
            <Button hasIcon rounded onClick={() => handleGo(messages?.call.url)} textColor="white" color="main.800" size="normal" className="fw--bold mlr--medium">
              <Icon inline color="white" size="normal" prefix="bx" name="phone-call" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
              {' '}
              {messages?.call.label}
            </Button>
          )}
          {messages.contact && (
            <Button hasIcon rounded onClick={() => handleGo(messages?.contact.url)} textColor="white" color="blue.600" size="normal" className="fw--bold mlr--medium">
              <Icon inline color="white" size="normal" prefix="bxs" name="chat" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
              {' '}
              {messages?.contact.label}
            </Button>
          )}
        </Box>
      </div>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

Address.defaultProps = {
  showOpenAddress: true
};

Address.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * Show address open/close controls
   */
  showOpenCloseControl: PropTypes.bool,

  /**
  * Show address open or closed
  */
  showOpenAddress: PropTypes.bool,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The list of social links
   */
  social: PropTypes.objectOf(PropTypes.string),

  /**
   * The clinics infos (array of objects)
   */
  address: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number
  }).isRequired,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    addressTitle: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string
      })
    ),
    call: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }),
    contact: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  })
};

export default Address;
