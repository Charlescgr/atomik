/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { useAmp } from 'next/amp';
import ImageNext from 'next/image';
import omit from 'object.omit';
import get from '@charlescgr/underline/dist/get';
import getSiteDomain from '@charlescgr/underline/dist/getSiteDomain';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

const BlurLoadingImage = ({ loadingType, children, ...props }) => {
  if (loadingType === 'background') {
    return (
      <div {...props}>
        {children}
      </div>
    );
  }

  return children;
};

BlurLoadingImage.propTypes = {
  loadingType: PropTypes.oneOfType(['background', 'without']),
  children: PropTypes.any
};

function Image(props) {
  const { domains, absolutUrl } = useTheme();
  const {
    alt,
    className,
    maxHeight,
    maxWidth,
    style,
    width,
    height,
    sizes,
    layout,
    title,
    background,
    loadingType,
    amp,
    objectFit,
    imageSizeClassName,
    lazy
  } = props;
  let { src, srcSet } = props;
  const propsBlacklist = ['loadingType', 'maxHeight', 'maxWidth', 'background', 'srcSet', 'amp', 'imageSizeClassName', 'coverHeight', 'onError'];
  const allowedProps = omit(props, propsBlacklist);
  const { isMobile } = useDeviceScreen();

  if (!src) return null;

  if (typeof src === 'object') {
    const images = Object.keys(src).map((size) => {
      switch (size) {
        case 'big-size_mobile': {
          return `${src[size]} 425w`;
        }
        case 'medium_large': {
          return `${src[size]} 768w`;
        }
        case 'large': {
          return `${src[size]} 1024w`;
        }
        default: {
          return null;
        }
      }
    }).filter(Boolean);

    src = isMobile && src['big-size_mobile']
      ? src['big-size_mobile']
      : src?.medium_large || src?.large;

    srcSet = images.toString();
  }

  const handleCreateStyle = (styles) => {
    if (maxWidth) styles.maxWidth = maxWidth;
    if (maxHeight) styles.maxHeight = maxHeight;
    return styles;
  };

  const myLoader = (value) => {
    value = {
      ...value,
      src: value.src.indexOf('?url=') !== -1 ? value.src.split('?url=')[1] : value.src
    };
    return `${value.src}?auto=webp&quality=${value.quality || 45}&width=${width || value.width}&crop=16:9,smart,safe`;
  };

  const img = () => {
    if (useAmp()) {
      return (
        <amp-img
          src={src}
          srcSet={srcSet || `${src} 1024w`}
          width={width || amp?.width}
          height={height || amp?.height}
          sizes={sizes}
          alt={alt}
          layout={layout}
          title={title}
          class={`amp__image with-${objectFit} ${handleCreateStyleClass({ ...props, className })}`}
        />
      );
    }

    const removeQuot = (url) => {
      if (url.charAt(0) === '"' && url.charAt(url.length - 1) === '"') return url.substring(1, url.length - 1);
      return url;
    };
    let imageDomain;
    try {
      imageDomain = src.indexOf('http') >= 0 ? getSiteDomain(removeQuot(src)) : false;
    } catch {
      imageDomain = false;
    }

    const validDomain = domains ? domains.includes(imageDomain) : true;
    if (!process.env.STORYBOOK) {
      const nextImageSrc = !imageDomain || domains?.length === 0 || validDomain ? src : `${absolutUrl}?url=${src}`;

      return (
        <>
          <noscript>
            <img
              alt={alt}
              className={handleCreateStyleClass({ ...props, className })}
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              width={width}
              height={height}
              title={title}
              style={handleCreateStyle(style)}
            />
          </noscript>
          <BlurLoadingImage
            loadingType={lazy ? loadingType : 'without'}
            className={`${get(background, 'className', '')} LazyImage ${imageSizeClassName}`}
            {...background}
          >
            <ImageNext
              {...allowedProps}
              loader={myLoader}
              src={nextImageSrc}
              className={handleCreateStyleClass({ ...props, className })}
              style={handleCreateStyle(style)}
              priority={!lazy || false}
            />
          </BlurLoadingImage>
        </>
      );
    }

    return (
      <img
        alt={alt}
        className={handleCreateStyleClass({ ...props, className })}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        title={title}
        style={handleCreateStyle(style)}
      />
    );
  };

  return (
    <>
      {img()}
      <style jsx global>
        {`
          // commom styles, global
          img {
            max-width: 100%;
          }
          .amp__image.with-${objectFit} img {
            ${objectFit ? `object-fit: ${objectFit}` : ''}
            ${objectFit === 'contain' ? 'object-position: left center' : ''}
          }
        `}
      </style>
    </>
  );
}

Image.defaultProps = {
  style: {},
  layout: 'responsive',
  srcSet: null,
  title: '',
  background: {
    style: {
      background: '#edeff4 no-repeat center center',
      height: '100%',
      width: '100%',
    }
  },
  loadingType: 'none',
  amp: {
    width: 310,
    height: 180,
  },
  onError: null,
  imageSizeClassName: ''
};

Image.propTypes = {

  /**
   * The classname prop
   */
  className: PropTypes.string,
  /**
   * The alt tag
   */
  alt: PropTypes.string.isRequired,

  /**
   * The title tag
   */
  title: PropTypes.string,

  /**
   * The max height of the image (rhythm units)
   */
  maxHeight: PropTypes.number,

  /**
   * The max width of the image (rhythm units)
   */
  maxWidth: PropTypes.number,

  /**
   * The image src
   */
  src: PropTypes.any.isRequired,

  /**
   * Custom styles
   */
  style: PropTypes.object,

  /**
   * Sets image according to user connection quality (`${small-image} 300w, ${medium-image} 768w, ${large-image} 1280w`)
   */
  srcSet: PropTypes.string,

  /**
   * For image width
   */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * For image height
   */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * For image sizes ((min-width: 765px) 50vw, 100vw)
   */
  sizes: PropTypes.string,

  /**
   * For image (responsive)
   */
  layout: PropTypes.string,

  /**
   * For cover image none, cover
   */
  objectFit: PropTypes.string,

  /**
   * Optional children that will be rendered when loading, instead of the constructicon loading dots
   * */
  children: PropTypes.any,

  /**
   * Set Lazy Loading Background props
   */
  background: PropTypes.object,

  /**
   * loading types
   */
  loadingType: PropTypes.oneOf(['none', 'background']),

  /**
   * For use next/image lazy component
   */
  lazy: PropTypes.bool,

  /**
   * For AMP image height (300px)
   */
  amp: PropTypes.shape({
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),

  /**
   * ClassName of image size used in ArticleFigure component
   */
  imageSizeClassName: PropTypes.string,

  /**
   * Used just on Avatar component
   */
  onError: PropTypes.func,

};

export default Image;
