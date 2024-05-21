import React from 'react';

import SocialButton from './SocialButton';

export default {
  title: 'Components/Molecules/SocialButton',
  component: SocialButton,
  args: {
    sharingInformation: {
      title: 'Some Test',
      link: 'https://beta.mejorconsalud.com/wp-content/uploads/2019/07/edema-pulmonar.jpg',
    },
    socialMediaName: 'facebook',
    fullRounded: true
  }
};

export const Default = (props) => (
  <SocialButton {...props} />
);
Default.argTypes = {};
