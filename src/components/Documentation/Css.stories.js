/* eslint-disable no-undef */
import React from 'react';

import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

export default {
  title: 'Documentation/CSS',
  parameters: {
    options: {
      selectedPanel: false,
      showPanel: false,
      showNav: true,
      isToolshown: false
    }
  }
};

export const ClassNames = () => (
  <Container wrap>
    <Heading>CSS styles examples</Heading>
    <Paragraph>See below the naming rules for styles</Paragraph>

    <Heading type="h2">Simple name CSS properties</Heading>
    <Paragraph>When the CSS property has a simple name (composed of just one word)</Paragraph>

    <code>
      padding
      <br />
      margin
      <br />
      position
      <br />
      color
      <br />
      display
    </code>

    <Paragraph>Use only the first letter</Paragraph>
    <code>
      .p--
      <br />
      .m--
      <br />
      .p--
      <br />
      .c--
      <br />
      .d--
    </code>

    <Heading type="h2">CSS properties with compound name</Heading>
    <Paragraph>When the CSS property has a compound name (composed of two words)</Paragraph>

    <code>
      text-align
      <br />
      font-family
      <br />
      font-weight
      <br />
      font-size
      <br />
      margin-bottom
      <br />
      padding-top
      <br />
      background-color
      <br />
      border-color
      <br />
      margin-top + margin-bottom
      <br />
      padding-top + padding-bottom
      <br />
    </code>

    <Paragraph>Use the first two letters</Paragraph>
    <code>
      .ta--
      <br />
      .ff--
      <br />
      .fw--
      <br />
      .fs--
      <br />
      .mb--
      <br />
      .pt--
      <br />
      .bg--
      <br />
      .bc--
      <br />
      .mtb--
      <br />
      .ptb--
    </code>

    <Heading type="h2">Value names for properties</Heading>

    <Paragraph>Simple name values</Paragraph>
    <code>
      --0
      <br />
      --light
      <br />
      --bold
      <br />
      --auto
      <br />
      --blue
      <br />
    </code>

    <Paragraph>Compound named values (use camelCase)</Paragraph>
    <code>
      --sans-serif
      <br />
      --inline-block
      <br />
      --space-between
      <br />
      --inline-flex
    </code>
  </Container>
);
