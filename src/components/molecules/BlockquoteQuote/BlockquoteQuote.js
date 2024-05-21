import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from '../../atoms/Paragraph';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function BlockquoteQuote({ text, author, ...props }) {
  const { theme, getColor } = useTheme();

  return (
    <Box
      className={`article-quote quote bc--secondary-50 ptb--big p--relative ${handleCreateStyleClass(
        props
      )}`}
    >
      <span className="quote__icon bc--secondary-50 br--50 pt--small p--absolute ta--center">
        <Icon color="secondary.500" size="normal" prefix="bxs" name="quote-right" />
      </span>
      <blockquote className="plr--big pt--big">
        <Paragraph
          className="quote__text ta--center fs--italic lh--2 fs--normal ff--serif ls--medium c--secondary-800"
        >
          {text}
        </Paragraph>
      </blockquote>
      { author && (
        <footer className="fw--bold lh--1-5 ta--center c--secondary-800 mtb--x-medium ff--serif fs--small">
          ~
          {' '}
          {author}
          {' '}
          ~
        </footer>
      )}
      <style jsx>
        {`
          // commom styles
          .quote__icon{
            width:${theme.sizes['5']};
            height:${theme.sizes['5']};
            padding: 8px;
            top:-20px;
            left: calc(50% - 20px);
          }
        `}
      </style>
      <style jsx global>
        {`
          .quote__text,
          .quote__text p{
            color: ${getColor('secondary.800')};
          }
          .quote__text a{
            color: ${getColor('secondary.600')};
            font-weight: bold;
            border-bottom: 1px dotted ${getColor('secondary.600')}
          }
        `}
      </style>
    </Box>
  );
}

BlockquoteQuote.propTypes = {
  /**
   * The text of quote/citation
   */
  text: PropTypes.string.isRequired,

  /**
   * The author from quote/citation
   */
  author: PropTypes.string.isRequired,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string
};

export default BlockquoteQuote;
