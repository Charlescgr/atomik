import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

import TitleCustom from '../TitleCustom';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ArticleRate({
  titleIsSpan,
  onSubmit,
  messages,
  ...props
}) {
  const [success, setSuccess] = useState(false);

  // -- theme
  const { colorMode, direction } = useTheme();

  const handleSubmit = (v) => {
    setSuccess(true);
    onSubmit(v);
  };

  return (
    <Box className={`article-rate ta--center ${handleCreateStyleClass(props)}`}>
      {success ? (
        <TitleCustom titleIsSpan={titleIsSpan} type="h4" textColor={colorMode === 'dark' ? 'grey-cold.500' : 'grey-cold.400'} className="mtb--normal">{messages?.successText}</TitleCustom>
      ) : (
        <>
          <TitleCustom titleIsSpan={titleIsSpan} type="h4" textColor="grey-cold.400" className="mb--normal">{messages?.title}</TitleCustom>
          <Box className="d--flex ai--center jc--center">
            <Button
              rounded
              color="transparent"
              borderColor="green.500"
              textColor="green.500"
              hasIcon
              className="fw--bold mlr--x-medium"
              onClick={() => handleSubmit('yes')}
            >
              <Icon
                name="like"
                color="green.500"
                className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
              />
              {' '}
              {messages?.yesText}
            </Button>
            <Button
              rounded
              color="transparent"
              borderColor="red.500"
              textColor="red.500"
              hasIcon
              className="fw--bold mlr--x-medium"
              onClick={() => handleSubmit('no')}
            >
              <Icon
                name="dislike"
                color="red.500"
                className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
              />
              {' '}
              {messages?.noText}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

ArticleRate.defaultProps = {
  titleIsSpan: false
};

ArticleRate.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The function that will be executed on submit of the valorization article
   */
  onSubmit: PropTypes.func,

  /**
   * The custom classnames.
   */
  className: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    successText: PropTypes.string,
    title: PropTypes.string,
    yesText: PropTypes.string,
    noText: PropTypes.string
  })
};

export default ArticleRate;
