import React from 'react';
import PropTypes from 'prop-types';

function TextClasses({ data }) {
  return (
    <style jsx global>
      {`

      .ls--small{
        letter-spacing: -0.02em;
      }

      .ls--normal{
        letter-spacing: 0.01em;
      }

      .ls--medium{
        letter-spacing: 0.02em;
      }

      .ls--big{
        letter-spacing: 0.04em;
      }

      .ls--x-big{
        letter-spacing: 0.08em;
      }

      .tt--uppercase {
        text-transform: uppercase;
      }
      .tt--capitalize {
        text-transform: capitalize;
      }

      .ta--center {
        text-align: center;
      }

      .ta--left {
        text-align: start;
      }

      .ta--right {
        text-align: end;
      }

      .fs--italic {
        font-style: italic;
      }

      .fs--x-big {
        font-size: ${data.fontSizes['x-big']}; // size like original h1
      }

      .fs--big {
        font-size: ${data.fontSizes.big}; // size like original h2
      }

      .fs--x-medium {
        font-size: ${data.fontSizes['x-medium']}; // size like original h3
      }

      .fs--xx-medium {
        font-size: ${data.fontSizes['xx-medium']}; // size like original h3
      }

      .fs--medium {
        font-size: ${data.fontSizes.medium}; // size like original h4
      }

      .fs--x-normal {
        font-size: ${data.fontSizes['x-normal']};
      }

      .fs--normal {
        font-size: ${data.fontSizes.normal}; // size like original h5, h6 and 'p'
      }

      .fs--small {
        font-size: ${data.fontSizes.small}; // 0.875 of the size of 'p'
      }

      .fs--x-small {
        font-size: ${data.fontSizes['x-small']}; // 0.75 of the size of 'p'
      }

      .lh--0 {
        line-height: 0;
      }

      .lh--1 {
        line-height: 1;
      }

      .lh--1-2 {
        line-height: 1.2;
      }

      .lh--1-3 {
        line-height: 1.3;
      }

      .lh--1-4 {
        line-height: 1.4;
      }

      .lh--1-5 {
        line-height: 1.5;
      }

      .lh--1-6 {
        line-height: 1.6;
      }

      .lh--1-7 {
        line-height: 1.7;
      }

      .lh--1-8 {
        line-height: 1.8;
      }

      .lh--2 {
        line-height: 2;
      }

      .ff--serif {
        font-family: ${data.fontFamilies.serif};
      }

      .ff--sans {
        font-family: ${data.fontFamilies.sans};
      }

      .fw--thin {
        font-weight: 200;
      }

      .fw--light {
        font-weight: 300;
      }

      .fw--regular {
        font-weight: 400;
      }

      .fw--medium {
        font-weight: 500;
      }

      .fw--semibold {
        font-weight: 600;
      }

      .fw--bold {
        font-weight: 700;
      }
    `}
    </style>
  );
}

TextClasses.propTypes = {
  /**
  * The object theme.
  */
  data: PropTypes.any
};

export default TextClasses;
