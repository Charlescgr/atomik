import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import AdsBox from './AdsBox';
import Image from '../../atoms/Image';

export default {
  title: 'Components/Molecules/AdsBox',
  component: AdsBox,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

export const Default = () => (
  <AdsBox
    ads={{
      desktop: { classSize: 'medium' },
      mobile: { classSize: 'medium' }
    }}
    className="mtb--x-medium"
  >
    <Image src="../img/storybook_examples/ads__300x250_2.jpg" alt="Mobile Ads 320x270" width="320" height="270" />
  </AdsBox>
);
export const WithProps = () => {
  const { isDesktop } = useDeviceScreen();
  return (
    <AdsBox
      slim
      hasBackground
      ads={{
        desktop: { classSize: 'normal' },
        mobile: { classSize: 'medium' }
      }}
      className="mtb--x-medium"
    >
      { isDesktop ? (
        <Image src="../img/storybook_examples/ads__728x90.jpg" alt="Mobile Ads 728x90" width="728" height="110" />
      ) : (
        <Image src="../img/storybook_examples/ads__300x250_2.jpg" alt="Mobile Ads 320x270" width="320" height="270" />
      ) }
    </AdsBox>
  );
};
