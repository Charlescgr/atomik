import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import css from 'styled-jsx/css';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Col from './Col';
import Row from '../Row';

export default {
  title: 'Components/Atoms/Col',
  component: Col,
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
  <Col>
    <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
  </Col>
);

export const WithClasses = () => (
  <Col className="p--big m--big bc--main-500 c--white ff--sans">
    <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
  </Col>
);

export const WithProps = () => {
  const { className, styles } = css.resolve`
    .column{
      border:1px solid white
    }
    .aside-column{
      width:250px;
    }
  `;
  return (
    <Row>
      <Col colSize="4" className={`${className} p--big bc--main-500 c--white ff--sans`}>
        <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
      </Col>
      <Col colSize="4" className={`${className} p--big bc--main-500 c--white ff--sans`}>
        <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
      </Col>
      <Col colSize="4" className={`${className} p--big bc--main-500 c--white ff--sans`}>
        <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
      </Col>
      <Col colSize="auto" className={`${className} p--big bc--pink-500 c--white ff--sans`}>
        <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
      </Col>
      <Col colSize="fixed" className={`${className} aside-column p--big bc--orange-500 c--white ff--sans`}>
        <FormattedMessage tagName={React.Fragment} {...messages.textCol} />
      </Col>
      {styles}
    </Row>
  );
};
