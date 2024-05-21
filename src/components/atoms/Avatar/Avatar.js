import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import Image from '../Image';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Avatar({
  src, alt, lazy, ...props
}) {
  // -- states
  const [imgError, setImgError] = useState(false);
  const VALID_IMG_REGEX = /^.*\.(jpeg|jpg|JPG|gif|GIF|png|PNG)$/g;

  // -- hooks
  const { theme, getColor } = useTheme();
  const isAmp = useAmp();

  useEffect(() => {
    try {
      const validUrl = new URL(src);
      if (!VALID_IMG_REGEX.test(validUrl)) {
        // eslint-disable-next-line no-console
        throw console.error('Avatar URL format error');
      }
    } catch (error) {
      setImgError(true);
    }
  }, [src]);

  // eslint-disable-next-line react/destructuring-assignment
  const hasBg = props?.className && props?.className.includes('bc--');
  const propsBlacklist = ['children', 'className', 'size'];
  const allowedProps = omit(props, propsBlacklist);

  // -- styles
  const { className, styles } = css.resolve`
    // commom styles
    .avatar {
      background-color: ${!hasBg ? getColor('main.100') : 'transparent'};
      width: ${theme.sizes['6']};
      min-width: ${theme.sizes['6']};
      height: ${theme.sizes['6']};
      vertical-align: middle;
      font-size: ${theme.fontSizes.normal};
    }
    .avatar__img {
      z-index: 2;
      height: 100%;
      width: 100%;
    }

    // custom styles
    .is--small {
      font-size: ${theme.fontSizes.small};
      height: ${theme.sizes['4']};
      width: ${theme.sizes['4']};
      min-width: ${theme.sizes['4']};
    }

    .is--medium {
      font-size: ${theme.fontSizes.medium};
      height: ${theme.sizes['6']};
      width: ${theme.sizes['6']};
      min-width: ${theme.sizes['6']};
    }

    .is--big {
      font-size: ${theme.fontSizes.big};
      height: ${theme.sizes['8']};
      width: ${theme.sizes['8']};
      min-width: ${theme.sizes['8']};
    }

    .is--x-big {
      font-size: ${theme.fontSizes.big};
      height: ${theme.sizes['10']};
      width: ${theme.sizes['10']};
      min-width: ${theme.sizes['10']};
    }
    .is--xx-big {
      font-size: ${theme.fontSizes['x-big']};
      height: ${theme.sizes['15']};
      width: ${theme.sizes['15']};
      min-width: ${theme.sizes['15']};
    }

    .is--error:before {
      color: ${getColor('main.700')};
      content: attr(data-initials);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    .is--error {
      border: 1px solid ${getColor('grey-cold.200')};
    }

    .is--error img,
    .is--error amp-img {
      display: none;
    }
  `;

  if (isAmp) {
    return (
      <figure
        className={`${className} avatar ${handleCreateStyleClass(
          props
        )} p--relative ff--sans br--50 ${imgError ? 'is--error' : ''}`}
        data-initials={alt.substring(0, 2)}
        {...allowedProps}
      >
        {!imgError && (
          <amp-img
            src={src}
            width={64}
            height={64}
            alt={alt}
            layout={'responsive'}
            title={alt}
            class={`${className} avatar__img br--50 bs--small`}
          />
        )}
        {styles}
      </figure>
    );
  }

  return (
    <figure
      className={`${className} avatar ${handleCreateStyleClass(
        props
      )} bs--small p--relative ff--sans br--50 ${imgError ? 'is--error' : ''}`}
      data-initials={alt.substring(0, 2)}
      {...allowedProps}
    >
      {!imgError && (
        <Image
          src={src}
          alt={alt}
          className={`${className} avatar__img br--50`}
          lazy={lazy}
          loadingType="none"
          objectFit="cover"
          layout="fill"
          background={{
            style: {
              background: '#edeff4 no-repeat center center',
              height: '100%',
              width: '100%',
              'border-radius': '50%',
            },
          }}
        />
      )}
      {styles}
    </figure>
  );
}

Avatar.defaultProps = {
  size: 'normal',
  lazy: true,
};

Avatar.propTypes = {
  /**
   * The size of Avatar. eg: 'small', 'normal',  'big';
   */
  size: PropTypes.oneOf(['small', 'normal', 'big', 'x-big']),

  /**
   * The path for avatar image
   */
  src: PropTypes.string,

  /**
   * The alternative text for the avatar image
   */
  alt: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool,
};

export default Avatar;
