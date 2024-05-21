import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import pick from 'object.pick';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

const Iframe = forwardRef(({ attribs, children }, ref) => {
  const isAmp = useAmp();
  const { theme } = useTheme();

  const { className, styles } = css.resolve`
    .iframe__container {
      width: ${attribs.width || '100%'};
      height: ${attribs.height || '200px'};
    }

    @media only screen and (min-width: ${theme.medias.mobile}){
      .iframe__container {
        height: ${attribs.height || '400px'};
      }
    }
  `;

  useEffect(() => {
    if (attribs.execOnLoad) {
      attribs.execOnLoad();
    }

    return () => {
      if (attribs.execOnDismount) {
        attribs.execOnDismount();
      }
    };
  }, []);

  if (isAmp) {
    const propsWhitelist = [
      'title', 'src', 'width', 'height', 'scrolling', 'class',
      'srcdoc', 'frameborder', 'allowfullscreen', 'allowpaymentrequest',
      'allowtransparency', 'referrerpolicy'
    ];
    const allowedProps = pick(attribs, propsWhitelist);
    allowedProps.width = allowedProps?.width === '100%' ? '600px' : allowedProps?.width;
    allowedProps.src = allowedProps.src.replace('http://', 'https://');

    return (
      <amp-iframe {...allowedProps} sandbox="allow-scripts allow-same-origin" layout="responsive">
        {children}
      </amp-iframe>
    );
  }

  return (
    <>
      <iframe ref={ref} className={`iframe__container ${className}`} title={attribs.title} {...attribs}></iframe>
      {styles}
    </>
  );
});

Iframe.displayName = 'Iframe';

Iframe.propTypes = {
  attribs: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default Iframe;
