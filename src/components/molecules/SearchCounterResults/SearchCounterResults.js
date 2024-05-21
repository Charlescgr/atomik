import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import Paragraph from '../../atoms/Paragraph';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function SearchCounterResults({
  messages, totalResults, onContent, ...props
}) {
  const { theme } = useTheme();
  // -- allowed props
  const propsBlacklist = [
    'messages',
    'totalResults',
    'onContent',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);
  return (
    <Paragraph
      textColor={onContent || !theme.isColorizedMode ? 'main.800' : 'white'}
      className={`search-counter-results ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {totalResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      {' '}
      {totalResults > 1 ? messages.results : messages.result}
    </Paragraph>
  );
}

SearchCounterResults.defaultProps = {
  onContent: true
};

SearchCounterResults.propTypes = {
  /**
   * Informs if the component is on content, or on header/other
   */
  onContent: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    results: PropTypes.string,
    result: PropTypes.string
  }),

  /**
   * The number of results
   */
  totalResults: PropTypes.number,

  /**
   * The custom classnames
   */
  className: PropTypes.string
};

export default SearchCounterResults;
