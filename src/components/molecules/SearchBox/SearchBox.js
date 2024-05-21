import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import InputField from '../../atoms/InputField';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

import TitleCustom from '../TitleCustom';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function SearchBox({
  placeholderText, onKeyPressEnter, basePath, textColor, messages, titleType, titleColor, bgColor, onType, onSubmit, noLateralSpace, searchQuery, ...props
}) {
  // -- states
  const [search, setSearch] = useState(searchQuery);

  // -- theme
  const {
    theme, publicUrl, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'titleColor',
    'textColor',
    'placeholderText',
    'className',
    'bgColor',
    'basePath'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .search-form{
        margin-left: 0;
        margin-right: 0;
      }
    }
  `;

  // -- css/style
  const { className, styles } = css.resolve`
    .delete__icon {
      cursor: pointer;
    }

    .search-form{
      ${noLateralSpace ? `margin-left: -${theme.sizes[2]};margin-right: -${theme.sizes[2]};` : ''}
    }
    .search-box__input {
      border-color: transparent;
      padding-${direction === 'rtl' ? 'left' : 'right'}: 60px;
      padding-${direction === 'rtl' ? 'right' : 'left'}: 24px;
    }
    .search-box__button {
      top: 6px;
      bottom: 6px;
      ${direction === 'rtl' ? 'left' : 'right'}: 6px;
    }
  `;

  const backgroundColor = () => {
    if (bgColor) {
      return (colorMode === 'dark' ? 'bc--main-100' : 'bc--main-50');
    }
  };

  // -- scripts
  const handleInput = (typedValue) => {
    setSearch({
      searchOn: typedValue?.length > 0,
      searchQuery: typedValue
    });

    if (onType) onType(typedValue);
  };

  const handleClearSearch = () => {
    setSearch({
      searchOn: false,
      searchQuery: ''
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.searchQuery && search.searchQuery.length > 0) {
      onSubmit();
    }
  };

  useEffect(() => {
    setSearch({
      searchOn: searchQuery?.searchQuery?.length > 0,
      searchQuery: searchQuery?.searchQuery
    });
  }, [searchQuery]);

  return (
    <>
      <form
        action={`${basePath.replace(publicUrl, '')}s`}
        method="get"
        target="_top"
        className={`search-form ${className} ${mediaStyles.className} ${backgroundColor()} p--relative ${handleCreateStyleClass(props)}`}
      >
        {messages?.titles && (
          <TitleCustom
            titleIsSpan={false}
            type={titleType}
            textColor={titleColor}
            className="mb--normal"
          >
            {search.searchOn ? messages?.titles.results : messages?.titles.default}
          </TitleCustom>
        )}
        <Box
          className={`search-box ${className} ${mediaStyles.className} p--relative br--small bc--white`}
          {...allowedProps}
        >
          {search.searchOn && (
            <Icon
              name="x-circle"
              color="grey-cold.300"
              prefix="bxs"
              className={`${className} ${mediaStyles.className} delete__icon m${direction === 'rtl' ? 'l' : 'r'}--small mt--big t--0 ${direction === 'rtl' ? 'r' : 'l'}--normal p--absolute p${direction === 'rtl' ? 'r' : 'l'}--small mt--big t--0 ${direction === 'rtl' ? 'r' : 'l'}--0 zi--5`}
              onClick={handleClearSearch}
            />
          )}
          <InputField
            type="search"
            name="s"
            id="search"
            value={search.searchQuery}
            className={`search-box__input ${className} ${mediaStyles.className} bc--transparent b--none zi--1 p${direction === 'rtl' ? 'r' : 'l'}--normal`}
            placeholder={placeholderText}
            size="big"
            textColor={textColor}
            full
            onChange={handleInput}
            onKeyPress={onKeyPressEnter}
            required
            borderColor="transparent"
          />
          <Button
            type="submit"
            color="secondary.400"
            textColor="white"
            rounded
            onlyIcon
            onClick={handleSearch}
            className={`search-box__button ${className} ${mediaStyles.className} p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 zi--5`}
          >
            <Icon size="normal" prefix="bx" color="white" name="search-alt" />
          </Button>
        </Box>
      </form>

      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

SearchBox.defaultProps = {
  basePath: '/',
  placeholderText: '¿Qué estabas buscando?',
  onKeyPressEnter: () => {},
  searchQuery: {
    searchOn: false,
    searchQuery: ''
  }
};

SearchBox.propTypes = {
  /**
   * Informs if the component DON'T have lateral space (padding plr--big)
   * Use this prop when the component is inside a grid (<row className="plr--big"><col> component </col></row>), like a sidebar
   */
  noLateralSpace: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    titles: PropTypes.shape({
      default: PropTypes.string,
      results: PropTypes.any
    })
  }),

  /**
   * The title tyle h1, h2, h3
   */
  titleType: PropTypes.string,

  /**
   * Inform if the componenet has the default background-color
   */
  bgColor: PropTypes.bool,

  /**
   * The title color
   */
  titleColor: PropTypes.string,

  /**
   * The placeholder text
   */
  placeholderText: PropTypes.string,

  /**
   * The color of the text from input and placeholder
   */
  textColor: PropTypes.string.isRequired,

  /**
   * The custom classnames
   */
  className: PropTypes.string,

  /**
   * Path for home page
   */
  basePath: PropTypes.string,

  /**
   * Return the query to the father component, to use in live search
   */
  onType: PropTypes.func.isRequired,

  /**
   * Submit the form
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Typed Query
   */
  searchQuery: PropTypes.shape({
    searchOn: PropTypes.bool,
    searchQuery: PropTypes.string
  }),

  /**
   * Event when clicking the enter button
   */
  onKeyPressEnter: PropTypes.func
};

export default SearchBox;
