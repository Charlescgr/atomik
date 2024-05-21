import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import ContentList from './ContentList';

export default {
  title: 'Components/Atoms/ContentList',
  component: ContentList,
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
  <ContentList>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
  </ContentList>
);

export const WithProps = () => (
  <ContentList type="ul" listStyleType="disc">
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
  </ContentList>
);
