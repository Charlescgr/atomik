import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import throttle from '@charlescgr/underline/dist/throttle';

import { useAmp } from 'next/amp';

import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import A from '../../atoms/A';

import SocialButton from '../SocialButton';

import { fixCharsString, handleCreateStyleClass } from '../../_settings/Utils';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

function ShareButtons({
  column, post, messages, ...props
}) {
  const { theme, getColor, direction } = useTheme();
  const [showTag, setShowTag] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMobileShareFloating, setShowMobileShareFloating] = useState(false);
  const { isDesktop } = useDeviceScreen();
  const { isAmp } = useAmp();
  const {
    copyLinkAlert, copyLinkAriaLabel, shareMobileAriaLabel, nextButton
  } = messages;

  const propsBlacklist = [
    'scrollPosition',
    'className',
    'messages',
  ];
  const allowedProps = omit(props, propsBlacklist);

  const socialBrands = [
    'facebook',
    'twitter',
    'pinterest',
    'whatsapp',
  ];

  const copyToClipboard = (url) => {
    const createCopy = (e) => {
      e.clipboardData.setData('text/plain', url);
      e.preventDefault();
    };
    document.addEventListener('copy', createCopy);
    document.execCommand('copy');
    document.removeEventListener('copy', createCopy);
  };
  const handleClickShare = () => {
    setShowTag(true);
    setTimeout(() => { setShowTag(false); }, 2500);
    copyToClipboard(window.location.href);
  };

  const GerericSharedButton = () => {
    if (isAmp) {
      return (
        <amp-social-share
          type="system"
          width="45"
          height="45"
        >
        </amp-social-share>
      );
    }

    const shareMobile = (event) => {
      event.preventDefault();
      navigator.share({
        title: post.title,
        text: fixCharsString(post.excerpt),
        url: post.link
      });
    };

    return (
      <Button rounded={!!isDesktop} onlyIcon onClick={(e) => shareMobile(e)} color="grey-cold.500" className="button__copied p--normal" aria-label={shareMobileAriaLabel}>
        <Icon inline color="white" size={!isDesktop ? 'normal' : 'medium'} name="link" />
      </Button>
    );
  };

  const NextButton = () => {
    if (post.previous_post && (nextButton != null || useAmp())) {
      return (

        <A
          to={post.previous_post.permalink}
          id={'next-shared'}
          data-with-google-events="true"
          data-google-events={JSON.stringify({
            data: {
              action: 'click',
              category: 'Next article',
              label: `${post.link}`
            }
          })}
          className={'c--main-900 d--flex ai--center jc--flex-end w--100 h--100 ff--sans'}
        >
          {nextButton}
          <Icon className="icon next-shared" name="chevron-right" />
        </A>
      );
    }

    return null;
  };

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
    if (scrollPosition > 3) {
      setShowMobileShareFloating(true);
    } else {
      setShowMobileShareFloating(false);
    }
  }, [scrollPosition]);

  const { className, styles } = css.resolve`
    // commom styles
    .share-buttons {
      transition: transform 1s ease;
    }
    .next-button {
      width:100%;
      height:42px;
      padding-${direction === 'rtl' ? 'lelft' : 'right'} : 20px;
    }

    .is--fixed {
      margin-${direction === 'rtl' ? 'right' : 'left'}: -60px;
      position: fixed; // this style can be replaced by a helper class
      z-index: 5; // this style can be replaced by a helper class
    }

    .is--visible {
      transform: translateY(0px);
    }

    .is--hidden {
      transform: translateY(50px);
    }
  `;

  return (
    <List
      className={`share-buttons ${className} d--flex ai--center${isDesktop ? ' jc--space-between mt--normal' : ' p--fixed bc--grey-neutral-100 b--0 zi--7 w--100'}${column ? ' fd--column is--fixed' : ' fd--row'} ${showMobileShareFloating ? 'is--visible ' : 'is--hidden '} ${handleCreateStyleClass(
        props
      )}`}
      {...allowedProps}
    >
      {socialBrands.map((socialMediaName) => (
        <li key={socialMediaName} className={column ? ' mb--small' : ''}>
          <SocialButton
            socialMediaName={socialMediaName}
            sharingInformation={{
              title: post.title, description: post?.metas?.description, link: post.link, ogImage: post.metas['og:image']
            }}
            color={socialMediaName}
          />
        </li>
      ))}
      <li className="item__copied p--relative">
        {isAmp || (typeof navigator !== 'undefined' && navigator.share) ? (
          <GerericSharedButton />
        ) : (
          <>
            <Button
              rounded={!!isDesktop}
              onlyIcon
              onClick={handleClickShare}
              color="grey-cold.500"
              className="button__copied p--normal"
              data-with-google-events="true"
              data-google-events={JSON.stringify({
                data: {
                  action: 'copy',
                  category: 'Share',
                  label: `Copy ${post.link}`
                }
              })}
              aria-label={copyLinkAriaLabel}
            >
              <Icon inline color="white" size={!isDesktop ? 'normal' : 'medium'} name="link" />
            </Button>
            {
              showTag
              && (
                <span className="tag__copied d--flex ai--center jc--center p--absolute br--small p--normal bc--grey-cold-500 ta--center ff--sans fs--small c--white bs--small">
                  {copyLinkAlert}
                </span>
              )
            }
          </>
        )}
      </li>

      {post.previous_post && nextButton != null && (
        <li className={`next-button ${className}`}>
          <NextButton />
        </li>
      )}

      {/* commom styles */}
      {styles}
      <style jsx>
        {`
          .tag__copied{
            left: calc(50% - ${theme.sizes[5]});
            opacity:0;
            width: ${theme.sizes[10]};
            animation: fade 2s ease-in;
            animation-iteration-count:1;
            ${isDesktop ? `bottom: -${theme.sizes[5]};` : `top: -${theme.sizes[5]};`}
          }
          .tag__copied:before{
            content:'';
            position: absolute;
            width: 0;
            height: 0;
            // error infos from theme
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            left: calc(50% - ${theme.sizes['1-25']});
            ${isDesktop ? `border-bottom: 10px solid ${getColor('grey-cold.500')}; top:-${theme.sizes['1-25']};` : `border-top: 10px solid ${getColor('grey-cold.500')}; bottom:-${theme.sizes['1-25']};`}
          }
          @keyframes fade {
            0%,100% { opacity: 0 };
            40%,60% { opacity: 1 };
          }
        `}
      </style>
    </List>
  );
}

ShareButtons.defaultProps = {
  column: false,
  messages: {
    copyLinkAlert: 'Link copied!',
    copyLinkAriaLabel: 'Copy Link',
    shareMobileAriaLabel: 'Share'
  }
};

ShareButtons.propTypes = {
  /**
   * The custom classnames
   */
  className: PropTypes.string,

  /**
   * The orientation of the list
   */
  column: PropTypes.bool,

  /**
   * The post information
   */
  post: PropTypes.object.isRequired,

  /**
   * Messages
   */
  messages: PropTypes.shape({
    copyLinkAlert: PropTypes.string,
    nextButton: PropTypes.string,
    copyLinkAriaLabel: PropTypes.string,
    shareMobileAriaLabel: PropTypes.string
  }),

};

export default ShareButtons;
