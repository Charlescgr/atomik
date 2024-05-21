import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useAmp } from 'next/amp';

import Avatar from '../../atoms/Avatar';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';
import TitleCustom from '../TitleCustom';

import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function AuthorBox({
  titleIsSpan,
  withReadMore,
  author,
  onLike,
  withConsultationButton,
  withLikeButton,
  messages,
  lazy,
  ...props
}) {
  const {
    name,
    avatar,
    bio,
    profileUrl
  } = author;
  const { isDesktop } = useDeviceScreen();
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  const [readMore, setReadMore] = useState(withReadMore);
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState('');
  const [heightSize, setHeightSize] = useState('80px');

  const refFullProfile = useRef(null);

  const propsBlacklist = [
    'titleIsSpan',
    'withReadMore',
    'author',
    'onLike',
    'withConsultationButton',
    'withLikeButton',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // toggle open/close profile
  const handleToggle = () => {
    setReadMore(!readMore);
    setOpen(open === '' ? 'open' : '');
    setHeightSize(open === 'open' ? '80px' : `${refFullProfile.current.scrollHeight}px`);
  };

  const handleLike = () => {
    setLike(!like);
    onLike(like);
  };

  const resetReadMoreOnLoad = () => {
    setReadMore(false);
  };

  useEffect(() => {
    resetReadMoreOnLoad();
  }, [author]);

  const checkDarkMode = () => (colorMode === 'dark' ? theme.commomColors.black : theme.commomColors.white);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .author-box__header{
        margin-${direction === 'rtl' ? 'left' : 'right'}: ${withConsultationButton ? '216' : '48'}px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .author-box__button {
      overflow-anchor: none;
    }
    .author-box__header{
      margin-${direction === 'rtl' ? 'left' : 'right'}:48px;
    }
    .author-box__text {
      flex: 1;
      transform: translateY(-8px);
    }
    .author__text{
      transition: max-height 1s ease 0s;
      max-height: 80px;
      overflow: hidden;
    }
    .author-box__text:after{
      content:'';
      background-image: linear-gradient(180deg, rgba(${hexToRgb(checkDarkMode())}, 0), rgba(${hexToRgb(checkDarkMode())}, 1) 80%);
      padding: 30px 0 10px 0;
      position: absolute;
      bottom:20px;
      ${direction === 'rtl' ? 'right' : 'left'}:0;
      z-index: 5;
      width: 100%;
      transition: all 1s ease 0s;
    }
    .author-box__text.is--open:after{
      padding: 10px 0 10px 0;
    }
  `;

  const backgroundStyle = () => {
    if (like) {
      return 'red.500';
    }
    if (colorMode === 'dark') {
      return 'grey-cold.800';
    }
    return 'grey-cold.50';
  };

  const textStyle = () => {
    if (colorMode === 'dark') {
      return 'black';
    }
    return 'white';
  };

  return (
    <Box
      className={`author-box p--relative ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Box className={`author-box__header ${className} ${mediaStyles.className} d--flex ai--center jc--flex-start mt--big mb--medium`}>
        <A to={profileUrl} target="_self">
          <Avatar src={avatar} alt={name} size="big" lazy={lazy} className={`m${direction === 'rtl' ? 'l' : 'r'}--big`} />
        </A>
        <A to={profileUrl} target="_self">
          <TitleCustom titleIsSpan={titleIsSpan} type="h4" textColor="grey-neutral.800">{name}</TitleCustom>
        </A>
        <Box className={`author-box__buttons p--absolute t--0 ${direction === 'rtl' ? 'l' : 'r'}--0 d--flex`}>
          { withLikeButton && (
            <Button
              color={backgroundStyle()}
              size="cutom"
              onlyIcon
              rounded
              className="ptb--small plr--normal"
              onClick={handleLike}
            >
              <Icon
                name="heart"
                size="normal"
                color={like ? 'white' : 'grey-cold.600'}
              />
            </Button>
          )}
          { withConsultationButton && isDesktop && (
            <Button
              color="secondary.600"
              textColor={textStyle()}
              size="cutom"
              hasIcon
              rounded
              className={`ptb--small plr--normal m${direction === 'rtl' ? 'r' : 'l'}--normal fw--bold fs--normal`}
            >
              <Icon
                name="calendar-check"
                size="normal"
                color={textStyle()}
                className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
              />
              { messages.consultationButtonTitle }
            </Button>
          )}
        </Box>
      </Box>
      <Box id="authorBoxText" className={`author-box__text ${open !== '' ? 'is--open ' : ''} ${className} ${mediaStyles.className}`}>
        <div
          id="authorText"
          ref={refFullProfile}
          style={{ maxHeight: `${heightSize}` }}
          className={`author__text ${className} ${mediaStyles.className} c--grey-neutral-800 mb--normal fs--normal ff--sans lh--1-5`}
        >
          {bio}
        </div>
        <Button
          type="button"
          textColor="secondary.600"
          color="transparent"
          size="custom"
          className={`author-box__button ${className} ${mediaStyles.className} p--0 m--0 fw--bold fs--normal fs--sans`}
          onClick={handleToggle}
          on="tap:authorBoxText.toggleClass(class='is--open'),authorText.toggleClass(class='author__text--open'),readMoreTitle.toggleClass(class='d--none'),readLessTitle.toggleClass(class='d--none')"
          data-with-google-events="true"
          data-google-events={JSON.stringify({
            data: {
              action: 'click',
              category: 'Button',
              label: 'Author'
            }
          })}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {useAmp() ? (
            <>
              <span id="readMoreTitle">{messages.readMoreTitle}</span>
              <span id="readLessTitle" className="d--none">{messages.readLessTitle}</span>
            </>
          ) : (
            open !== '' ? messages.readLessTitle : messages.readMoreTitle
          )}
        </Button>
      </Box>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
          // custom styles
          .author__text p{
            font-family: ${theme.fontFamilies.sans};
            line-height: 1.5;
            padding:8px 0;
            margin:0;
          }
          .author__text a{
            color: ${getColor('secondary.600')};
            border-bottom-style: dotted;
            border-bottom-width: 1px;
            border-bottom-color: ${getColor('secondary.600')};
          }
        `}
      </style>
    </Box>
  );
}

AuthorBox.defaultProps = {
  titleIsSpan: false,
  lazy: true
};

AuthorBox.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The author object. eg.: { name: '', avatar: '', bio: '' }
   */
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    bio: PropTypes.element.isRequired,
    profileUrl: PropTypes.string.isRequired
  }),

  /**
   * The function that will be executed when user press like button
   */
  onLike: PropTypes.func,

  /**
   * The custom classNames
   */
  className: PropTypes.string,

  /**
   * If has consultation button
   */
  withConsultationButton: PropTypes.bool,

  /**
   * If has like button
   */
  withLikeButton: PropTypes.bool,

  /**
   * If has read more
   */
  withReadMore: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    consultationButtonTitle: PropTypes.string,
    readMoreTitle: PropTypes.string,
    readLessTitle: PropTypes.string
  }),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default AuthorBox;
