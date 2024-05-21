import React, { useEffect, useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';
import throttle from '@charlescgr/underline/dist/throttle';

import messages from './messages';
import AdsFloating from './AdsFloating';
import Paragraph from '../../atoms/Paragraph';

import Image from '../../atoms/Image';

import image from '../../../../example/public/img/storybook_examples/ads__320x100.jpg';

export default {
  title: 'Components/Molecules/AdsFloating',
  component: AdsFloating,
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

export const Default = () => {
  const [posScroll, setPosScroll] = useState(0);

  useEffect(() => {
    const d = document.documentElement;
    const e = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    // scroll
    const handleScroll = throttle(() => {
      const scrollPercent = ((d[st] || e[st]) / ((d[sh] || e[sh]) - d.clientHeight)) * 100;
      setPosScroll(scrollPercent);
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posScroll]);

  return (
    <div style={{ marginLeft: '-1rem' }}>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>
      <Paragraph className="m--big">
        <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
      </Paragraph>

      <AdsFloating scrollPosition={posScroll}>
        <Image
          src={image}
          alt="Mobile Ads 320x100"
          width="320"
          height="100"
        />
      </AdsFloating>

    </div>
  );
};
