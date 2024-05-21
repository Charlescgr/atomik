import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import Head from 'next/head';

import { useAmp } from 'next/amp';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';

function PageWrapper({
  children, ...props
}) {
  const { config } = props;
  const isAmp = useAmp();

  // -- theme
  const { theme, colorMode } = useTheme();

  const handleCreateHead = ({
    title, meta = [],
  }) => (
    <Head>
      <title>{title}</title>
      {
        meta.map((item) => (
          item && item.name && item.content
            ? <meta name={item.name} content={item.content} key={item.name} />
            : null
        ))
      }
    </Head>
  );

  const styleBoxDesktop = () => {
    if (config.hasProgress) {
      return config.wpIsLogged ? '118px' : '68px';
    }
    return config.wpIsLogged ? '114px' : '64px';
  };

  const styleBoxMobile = () => {
    if (config.hasProgress) {
      return config.wpIsLogged ? '102px' : '52px';
    }
    return config.wpIsLogged ? '98px' : '48px';
  };

  const checkDarkMode = () => (colorMode === 'dark' ? 'black' : 'white');

  const mediaStyles = css.resolve``;

  const { className, styles } = css.resolve`
    .site-main {
      margin-top: ${styleBoxMobile()};
      background: ${config.brandWeek.active ? `${checkDarkMode()} url(${config.brandWeek.brandWeekBg}) center top no-repeat` : `${checkDarkMode()}`};
      -webkit-transition: background-color 0.45s ease;
      -ms-transition: background-color 0.45s ease;
      transition: background-color 0.45s ease;
    }
    @media only screen and (min-width: ${theme.medias.tablet}){
      .site-main {
        margin-top: ${styleBoxDesktop()};
      }
    }
  `;

  return (
    <>
      <Box type="main" className={`site-main ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}>
        {handleCreateHead(config)}
        {children}
      </Box>

      {/* common styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

PageWrapper.defaultProps = {
  config: {
    title: 'Title of page',
    meta: [
      {
        name: 'description',
        content: 'Description of the page',
      },
    ],
    wpIsLogged: false,
    hasProgress: false,
    brandWeek: {
      active: false,
    },
  },
};

PageWrapper.propTypes = {
  /**
   * The custom configuration of the page wrapper.
   */
  config: PropTypes.shape({
    wpIsLogged: PropTypes.bool, // Informs if the user is logged on WordPress
    title: PropTypes.string, // Title of the page
    meta: PropTypes.array, // Config SEO meta and description
    hasProgress: PropTypes.bool, // Informs if the pague has <ReadingBar /> progress
    brandWeek: PropTypes.shape({ // Informs if the page receives the brandWeek configuration
      active: PropTypes.bool,
      brandWeekBg: PropTypes.string,
    }),
  }),

  /**
   * The children elements / content
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,
};

export default PageWrapper;
