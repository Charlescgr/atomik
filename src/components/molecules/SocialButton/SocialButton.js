import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import capitalize from '@charlescgr/underline/dist/capitalize';

import { useAmp } from 'next/amp';

import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

function SocialButton({
  socialMediaName,
  sharingInformation,
  fullRounded,
  socialMediaIconSize,
  noBackGroundColor,
  color,
  clickExtensionRef,
  ...props
}) {
  const { isAmp } = useAmp();
  const { isDesktop } = useDeviceScreen();

  const hasOgImage = `&media=${encodeURIComponent(sharingInformation.ogImage || sharingInformation.link)}`;
  const utmParams = '?utm_source=mcpin&utm_medium=post&utm_campaign=atomik_share';

  const socialBrands = [
    { name: 'facebook', link: `https://www.facebook.com/sharer/sharer.php?u=${sharingInformation.link}&t=${sharingInformation.title}` },
    { name: 'twitter', link: `https://twitter.com/intent/tweet?text=${sharingInformation.title} - ${sharingInformation.link}` },
    { name: 'pinterest', link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(sharingInformation.link + utmParams)}${hasOgImage}&description=${encodeURI(sharingInformation.description)}` },
    { name: 'whatsapp', link: `https://wa.me?text=${sharingInformation.title} - ${sharingInformation.link}` }
  ];

  const openWindow = (link, title) => {
    const mWidth = 500;
    const mHeight = 300;
    const pLeft = window.screen.width / 2 - mWidth / 2;
    const pTop = window.screen.height / 2 - mHeight / 2;
    const features = `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${mWidth},height=${mHeight},top=${pTop},left=${pLeft}`;
    window.open(link, title, features);
  };

  const handleOpenSocialMedia = () => {
    openWindow(socialBrands.find((item) => item.name === socialMediaName).link, socialMediaName);
  };

  useEffect(() => {
    if (clickExtensionRef && !isDesktop) {
      clickExtensionRef.current.addEventListener('click', handleOpenSocialMedia);
    }
    return () => {
      if (clickExtensionRef && !isDesktop) {
        clickExtensionRef.current.removeEventListener('click', handleOpenSocialMedia);
      }
    };
  }, [isDesktop]);

  return (
    <>
      {isAmp ? (
        <amp-social-share
          id={`${socialMediaName}-shared`}
          data-with-google-events="true"
          data-google-events={JSON.stringify({
            type: 'social',
            data: {
              socialNetwork: capitalize(socialMediaName),
              socialAction: 'share',
              socialTarget: `${sharingInformation.link}`
            }
          })}
          type="whatsapp"
          width="45"
          height="45"
        >
        </amp-social-share>
      ) : (
        <Button
          color={color}
          rounded={!!isDesktop}
          onlyIcon
          noBackGroundColor={noBackGroundColor}
          fullRounded={fullRounded}
          onClick={handleOpenSocialMedia}
          className={`p--normal ${handleCreateStyleClass(props)}`}
          data-with-google-events="true"
          data-google-events={JSON.stringify({
            type: 'social',
            data: {
              socialNetwork: capitalize(socialMediaName),
              socialAction: 'share',
              socialTarget: `${sharingInformation.link}`
            }
          })}
          aria-label={socialMediaName}
        >
          <Icon id="socialMediaIcon" inline color="white" size={!isDesktop ? socialMediaIconSize : 'medium'} prefix="bxl" name={socialMediaName} />
        </Button>
      )}
    </>
  );
}

SocialButton.defaultProps = {
  sharingInformation: {
    ogImage: ''
  },
  fullRounded: false,
  socialMediaIconSize: 'normal',
  noBackGroundColor: false,
  color: 'facebook',
};

SocialButton.propTypes = {
  socialMediaName: PropTypes.oneOf([
    'facebook',
    'twitter',
    'pinterest',
    'whatsapp'
  ]),
  sharingInformation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string.isRequired,
    ogImage: PropTypes.string
  }),
  fullRounded: PropTypes.bool,
  socialMediaIconSize: PropTypes.oneOf([
    'small',
    'normal',
    'medium',
    'big'
  ]),
  color: PropTypes.string,
  noBackGroundColor: PropTypes.bool,
  clickExtensionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) })
  ])
};

export default SocialButton;
