import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';
import isBrowser from '@charlescgr/underline/dist/isBrowser';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Image from '../../atoms/Image';

import SearchBox from '../SearchBox';
import TitleCustom from '../TitleCustom';

import Container from '../../atoms/Container';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

const KEY = {
  enter: 13
};

function HeadingPageError({
  children, error: { number, text }, basePath, messages, ...props
}) {
  const propsBlacklist = [
    'error',
    'basePath',
    'returnQuery',
    'className'
  ];
  const router = useRouter();
  const isAmp = useAmp();
  const allowedProps = omit(props, propsBlacklist);
  const [querySearch, setQuerySearch] = useState(isBrowser() ? {
    searchOn: document.getElementById('search')?.value.length > 0,
    searchQuery: document.getElementById('search')?.value
  } : {
    searchOn: false,
    searchQuery: ''
  });

  // -- hook
  const { isDesktop } = useDeviceScreen();

  // -- theme
  const {
    theme, cdnPath, publicUrl, colorMode
  } = useTheme();

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .header-error{
        margin-top: 0px;
      }
      .header-error__col-image{
        order: 2;
        height: 350px;
      }
      .header-error__figure{
        margin-top: 0;
        height: 350px;
      }
    }
  `;

  // -- css / style
  const { className, styles } = css.resolve`
    .header-error{
      margin-top: 175px;
    }
    .header-error__figure{
      margin-top: -110px;
      width: 100%;
      height: 240px;
    }
  `;

  // -- scripts
  const handleOnChange = (value) => {
    setQuerySearch(({
      searchOn: value?.length > 0,
      searchQuery: value
    }));
  };

  const handleSearchSubmit = () => {
    router.push(`${basePath.replace(publicUrl, '')}s?s=${querySearch.searchQuery}`);
  };

  return (

    <Box
      className={`header-error ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} ${colorMode === 'dark' ? 'bc--main-50' : 'bc--main-50'} p--relative d--flex fd--column`}
      {...allowedProps}
    >
      <Container wrap className="plr--big">
        <Row>
          <Col colSize="7" className={`header-error__col-image ${className} ${mediaStyles.className} ptb--normal d--flex fd--column ${!isDesktop ? 'ai--center' : 'jc--center  ai--flex-end'}`}>
            <figure className={`header-error__figure ${className} ${mediaStyles.className} p--relative`}>
              <Image
                src={`${cdnPath}themes/${theme.base}/illustration__error-${number}.svg`}
                alt={`Error ${number}`}
                layout="fill"
                className={`header-error__image ${className} ${mediaStyles.className}`}
              />
            </figure>
          </Col>
          <Col colSize="5" className={`header-error__col-content ${className} ${mediaStyles.className} d--flex jc--center fd--column`}>
            <TitleCustom
              titleIsSpan
              type="h6"
              textColor={colorMode === 'dark' ? 'main.400' : 'main.300'}
              className="mt--medium"
            >
              {number}
              {' '}
              -
              {' '}
              {text}
            </TitleCustom>
            {children}
            <SearchBox
              onType={handleOnChange}
              onSubmit={handleSearchSubmit}
              placeholderText={messages.inputPlaceHolder}
              textColor="grey-cold.300"
              className={`${className} ${mediaStyles.className} ${isDesktop ? 'mb--x-big' : 'mb--big'}`}
              basePath={basePath}
              onKeyPressEnter={(event) => event.keyCode === KEY.enter && handleSearchSubmit()}
              searchQuery={querySearch}
            />
          </Col>
        </Row>
      </Container>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

HeadingPageError.defaultProps = {
  basePath: '/',
  messages: {
    inputPlaceHolder: 'What were you looking for?'
  }
};

HeadingPageError.propTypes = {
  /**
   * The children -> custom message
   */
  children: PropTypes.any.isRequired,

  /**
   * The error object data
   */
  error: PropTypes.shape({
    number: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Path for home page
   */
  basePath: PropTypes.string,

  /**
   * Function  to return the query
   */
  returnQuery: PropTypes.func,

  /**
   * Input placeholder message
   */
  messages: PropTypes.shape({
    inputPlaceHolder: PropTypes.string
  })

};

export default HeadingPageError;
