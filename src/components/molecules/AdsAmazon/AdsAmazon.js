import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';

function AdsAmazon({
  exampleMode, title, thumb, price, url, messages, children, classesPlugin, ...props
}) {
  const propsBlacklist = [
    'exampleMode',
    'title',
    'thumb',
    'price',
    'url',
    'messages',
    'classesPlugin',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme context
  const {
    theme, colorMode, getColor, direction
  } = useTheme();

  // -- script
  const stylesForExampleEnvironment = () => (`.aawp * {
        font-family: ${theme.fontFamilies.sans};
      }
      .aawp, .aawp *, .aawp :after, .aawp :before, .aawp div, .aawp div *, .aawp div :after, .aawp div :before, .aawp span, .aawp span *, .aawp span :after, .aawp span :before {
        box-sizing: border-box;
      }
      .aawp-product {
        position: relative;
        margin: 0 0 30px;
        width: 100%;
      }

      .aawp .aawp-product--horizontal.aawp-product--style-light {
        box-shadow: 0 1px 2px rgb(0 0 0 / 30%), inset 0 0 40px rgb(0 0 0 / 10%);
      }
      .aawp .aawp-product--horizontal {
        zoom: 1;
        display: block;
        max-width: 100%;
        padding: 20px;
        background: ${colorMode === 'dark' ? getColor('grey-neutral.200') : 'white'};
        border: 1px solid ${colorMode === 'dark' ? getColor('grey-neutral.700') : '#ececec'};
        font-size: 15px;
        line-height: 1.6;
        white-space: normal;
      }
      .aawp .aawp-product--horizontal:after, .aawp .aawp-product--horizontal:before {
        content: " ";
        display: table;
      }
      .aawp .aawp-product--horizontal:after, .aawp .aawp-product--horizontal:before {
        content: " ";
        display: table;
      }
      .aawp .aawp-product--horizontal:after {
        clear: both;
      }
      .aawp .aawp-product--horizontal .aawp-product__thumb {
        float: ${direction === 'rtl' ? 'right' : 'left'};
        width: 160px;
      }
        .aawp .aawp-product--horizontal .aawp-product__image {
          display: block;
          height: auto;
          margin: 0 auto 15px;
          max-height: 200px;
          max-width: 100%;
          width: auto;
          border: none;
          box-shadow: none;
        }
      .aawp .aawp-product--horizontal .aawp-product__content {
        margin-${direction === 'rtl' ? 'right' : 'left'}: 160px;
        padding-${direction === 'rtl' ? 'right' : 'left'}: 20px;
      }
        .aawp .aawp-product--horizontal .aawp-product__title {
          display: block;
          margin: 0 0 15px;
          font-size: 18px;
          font-weight: 700;
          color: #ff9300;
        }
        .aawp-product .aawp-product__title {
          word-wrap: break-word;
        }
        .aawp .aawp-product--horizontal .aawp-product__description {
          margin: 0;
        }
        .aawp .aawp-product--horizontal .aawp-product__description ul.lst--disc{
          margin-${direction === 'rtl' ? 'right' : 'left'}: 16px;
          color: ${colorMode === 'dark' ? 'white' : 'black'};
        }
      .aawp .aawp-product--horizontal .aawp-product__footer {
        text-align: ${direction === 'rtl' ? 'left' : 'right'};
        margin-${direction === 'rtl' ? 'right' : 'left'}: 160px;
        padding-${direction === 'rtl' ? 'right' : 'left'}: 20px;
      }
        .aawp .aawp-product--horizontal .aawp-product__pricing {
          display: block;
          margin-bottom: 5px;
        }
          .aawp .aawp-product--horizontal .aawp-product__price--current {
            font-size: 20px;
            font-weight: 700;
          }
          .aawp .aawp-product--horizontal .aawp-product__price {
            display: inline-block;
            line-height: 34px;
            vertical-align: middle;
          }
          .aawp a.aawp-check-premium, .aawp a.aawp-check-premium:active, .aawp a.aawp-check-premium:focus, .aawp a.aawp-check-premium:hover, .aawp a.aawp-check-premium:visited, .aawp a.aawp-check-prime, .aawp a.aawp-check-prime:active, .aawp a.aawp-check-prime:focus, .aawp a.aawp-check-prime:hover, .aawp a.aawp-check-prime:visited, a.aawp-check-premium, a.aawp-check-premium:active, a.aawp-check-premium:focus, a.aawp-check-premium:hover, a.aawp-check-premium:visited, a.aawp-check-prime, a.aawp-check-prime:active, a.aawp-check-prime:focus, a.aawp-check-prime:hover, a.aawp-check-prime:visited {
            border: none;
            box-shadow: none;
            outline: none;
            text-decoration: none;
          }
          .aawp-check-prime, .aawp .aawp-check-prime {
            display: inline-block;
            width: 55px;
            height: 16px;
            margin-${direction === 'rtl' ? 'right' : 'left'}: 8px;
            vertical-align: middle;
            background-position: -185px -182px;
            background-image: url(https://m.media-amazon.com/images/S/sash/E6vgqiIirWgGb3f.png);
            background-size: 512px 256px;
            background-repeat: no-repeat;
          }
        .aawp-button.aawp-button--icon, .aawp .aawp-button.aawp-button--icon {
          position: relative;
          padding-left: 32px;
        }
        .aawp-button.aawp-button--amazon, .aawp .aawp-button.aawp-button--amazon {
          border-color: #9c7e31 #90742d #786025;
          border-radius: 3px;
          box-shadow: inset 0 1px 0 hsl(0deg 0% 100% / 40%);
          background: #f0c14b;
          background: linear-gradient(180deg,#f7dfa5,#f0c14b) repeat scroll 0 0 transparent;
          color: #111;
        }
        .aawp-button, .aawp .aawp-button {
          box-sizing: border-box;
          display: inline-block;
          margin: 0;
          padding: 7px 12px 6px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 400;
          line-height: 19px;
          text-align: center;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #ccc;
          color: #333;
        }
          .aawp-button.aawp-button--icon-black:before, .aawp .aawp-button.aawp-button--icon-black:before {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABrklEQVRYR+2WMU7DQBBFEwmlhRuQdDQIuAGcAG6AqeiAA1AEcQBICQ2+AdCmSbgA0NJAkDgA1BTwv2RH63Xs2R12hQuvNLKdnfnzPLObdbfTsNFtGE+nBZI60lbIt0I/UkCE+TNoDnNdu2X/AUSWOUcTgO4BtFdVIbMjCR5uIrTIltzBD1MXoBU4zWDLEaHeod039aVtn8J5PyLQAbSZYz4kIPb2NhLQV1adTx8g+rJtqxGgRtA8sXWlCtH/EnYcAWiQvWxB2gVoExFPgYEKW923ZfR/hm0EhCpsdQ0Qe30RCKi01TVAfQS9BQIqbXUNEGPuYLtZ8AOuUwXgDDFpXZzLos7jE9zkRwnX1JYCSAzxAbKPEgIRLOjwAWJiljs/Stgy37bx26d2+AJtQ20iidbMi/lEhwXiZpV82cR8okNFRlaK5juGUoAWSNJVz/8F6ApZ+Sf3CjuCjRdQuPgUwrRACVTMz9sXPK9ZQC4+pXfQAp1C6dxQ+8Z9z1J38QkGtA6lR9hSpniN66Gl7uITDIhCTMiz7QOWVqxiF58ga0i9i6RA7RqSdNXzLZBUul+oFj4lgWouywAAAABJRU5ErkJggg==);
          }
          .aawp-button.aawp-button--icon:before, .aawp .aawp-button.aawp-button--icon:before {
            position: absolute;
            content: "";
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-repeat: no-repeat;
            background-size: 14px 14px;
            background-position: 9px;
          }

          .aawp .aawp-product--horizontal .aawp-product__ribbon--bestseller, .aawp .aawp-product--horizontal .aawp-product__ribbon--new {
            top: -1px;
            ${direction === 'rtl' ? 'right: -1px;' : 'left: -1px;'}
          }
          .aawp .aawp-product--horizontal .aawp-product__ribbon--sale {
            top: -1px;
            ${direction === 'rtl' ? 'left: -1px;' : 'right: -1px;'}
          }

        .aawp .aawp-product--horizontal .aawp-product__ribbon {
          position: absolute;
          padding: 0 15px;
        }
        .aawp .aawp-product--horizontal.aawp-product--ribbon {
          padding-top: 35px;
        }

        .aawp-product__ribbon--bestseller {
          background: #e47911;
          border-bottom-right-radius: 2px;
          color: #fff;
        }
        .aawp-product__ribbon--sale {
          background: #27ae60;
          border-bottom-left-radius: 2px;
          color: #fff;
        }
        .aawp-product__ribbon {
          padding: 0 20px;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          text-transform: uppercase;
        }
      @media (max-width: 480px) {
        .aawp .aawp-product--horizontal .aawp-product__description {
          display: none;
        }
      }
      @media (max-width: 768px) {
        .aawp .aawp-product--horizontal .aawp-product__thumb {
          float: none;
          margin: 0 auto;
          display: table;
        }
        .aawp .aawp-product--horizontal .aawp-product__content {
          margin: 0;
          padding: 0;
        }
        .aawp .aawp-product--horizontal .aawp-product__footer {
          margin: 0;
          padding: 0;
        }
      }
      @media (min-width: 769px) {
        .aawp .aawp-product--horizontal.aawp-product--css-adjust-image-large .aawp-product__thumb {
          width: 250px;
          text-align: center;
        }
        .aawp .aawp-product--horizontal.aawp-product--css-adjust-image-large .aawp-product__content {
          margin-${direction === 'rtl' ? 'right' : 'left'}: 250px;
          padding-${direction === 'rtl' ? 'right' : 'left'}: 40px;
        }
      }`);

  // -- css style
  const { className, styles } = css.resolve`
    ${exampleMode && stylesForExampleEnvironment()}
    { style-jsx: enable }
  `;

  /*
  This component html structure is a copy from AAWP Plugin https://getaawp.com/demo/
  */
  return (
    <>
      <Box
        className={`ads-amazon aawp ${className} ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        <Box className={`aawp-product ${className} aawp-product--horizontal ${classesPlugin}`}>
          {messages?.bestseller !== '' && (
            <Span className={`aawp-product__ribbon aawp-product__ribbon--bestseller ${className}`}>{messages.bestseller}</Span>
          )}
          {messages?.sales !== '' && (
            <Span className={`aawp-product__ribbon aawp-product__ribbon--sale ${className}`}>{messages.sales}</Span>
          )}
          <Box className={`aawp-product__thumb ${className}`}>
            <A to={url} target={'_blank'} externalLink className={`aawp-product__image-link ${className}`}>
              <Image
                src={thumb}
                alt={`${messages.thumb} ${title}`}
                className={`ads-amazon__thumb ${className} aawp-product__image`}
                lazy
                layout="fixed"
                width={200}
                height={200}
              />
            </A>
          </Box>

          <Box className={`aawp-product__content ${className}`}>
            <A
              to={url}
              target={'_blank'}
              externalLink
              className={`aawp-product__title ${className}`}
            >
              {title}
            </A>
            <Box className={`aawp-product__description ${className}`}>
              {children}
            </Box>
          </Box>

          <Box className={`aawp-product__footer ${className}`}>
            <Box className={`aawp-product__pricing ${className}`}>
              <Span className={`aawp-product__price aawp-product__price--current ${className}`}>
                {price}
                {' '}
                {messages.currency}
              </Span>
              <A
                to={url}
                target={'_blank'}
                externalLink
                className={`aawp-check-prime ${className}`}
              >
                &nbsp;
              </A>
            </Box>
            <A
              to={url}
              target={'_blank'}
              externalLink
              className={`aawp-button aawp-button--buy aawp-button aawp-button--amazon aawp-button--icon aawp-button--icon-black ${className}`}
            >
              {messages.buyOn}
            </A>
          </Box>
        </Box>
      </Box>

      {/* custom styles */}
      {styles}
    </>
  );
}

AdsAmazon.defaultProps = {
  exampleMode: false,
  messages: PropTypes.shape({
    thumb: 'thumb del producto',
    buyOn: 'Comprar en Amazon',
    currency: 'EUR',
    sales: '',
    bestseller: ''
  })
};

AdsAmazon.propTypes = {
  /**
   * The content
   */
  children: PropTypes.string,

  /**
   * The ads image
   */
  thumb: PropTypes.string,

  /**
   * The price of the product
   */
  price: PropTypes.string.isRequired,

  /**
   * The url for this ads
   */
  url: PropTypes.string.isRequired,

  /**
   * The title
   */
  title: PropTypes.string.isRequired,

  /**
   * Content texts
   */
  messages: PropTypes.shape({
    thumb: PropTypes.string,
    buyOn: PropTypes.string,
    currency: PropTypes.string,
    sales: PropTypes.string,
    bestseller: PropTypes.string,
  }),

  /**
   * Inform if this component run on example or production environment
   */
  exampleMode: PropTypes.bool,

  /**
   * The plugin classes
   */
  classesPlugin: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default AdsAmazon;
