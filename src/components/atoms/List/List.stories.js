import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import css from 'styled-jsx/css';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import List from './List';

export default {
  title: 'Components/Atoms/List',
  component: List,
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
  <List>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
    <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
  </List>
);

export const Types = () => {
  const { className, styles } = css.resolve`
    ul, ol {
      list-style: inside;
    }
    ol {
      list-style-type: decimal;
    }
    ul {
      list-style-type: disc;
    }
  `;
  return (
    <>
      <List type="ul" className={`${className} ff--sans`}>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      </List>
      <br />
      <br />
      <List type="ol" className={`${className} ff--sans`}>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
        <li><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      </List>
      {styles}
    </>
  );
};

export const WithClasses = () => {
  const { className, styles } = css.resolve`
    ol {
      list-style: inside;
      list-style-type: decimal;
    }
  `;
  return (
    <List type="ol" className={`${className} ff--sans fw--bold`}>
      <li className="p--small fs--medium c--orange-100"><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      <li className="p--small fs--medium c--orange-300"><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      <li className="p--small fs--medium c--orange-500"><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      <li className="p--small fs--medium c--orange-700"><FormattedMessage tagName={React.Fragment} {...messages.textList} /></li>
      {styles}
    </List>
  );
};
