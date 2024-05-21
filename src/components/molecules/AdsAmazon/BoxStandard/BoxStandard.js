import React from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';

import { useTheme } from '../../../_settings/ThemeProvider/ThemeContext';

import A from '../../../atoms/A';
import Box from '../../../atoms/Box';
import List from '../../../atoms/List';
import Span from '../../../atoms/Span';
import Image from '../../../atoms/Image';

const BoxStandard = ({ product }) => {
  const { theme } = useTheme();

  const { className, styles } = css.resolve`
    .card {
      display: flex;
      position: relative;

      padding: 20px;
      max-width: 100%;
      font-size: 15px;
      line-height: 1.6;
      font-family: ${theme.fontFamilies.sans};

      background: #fff;
      border: 1px solid #ececec;
    }

    .sale__tag {
      top: -1px;
      right: -1px;
      position: absolute;
      padding: 0 15px;
      background: #27ae60;
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-transform: uppercase;
    }

    .card__thumb {
      display: flex;
      flex-direction: column;

      width: 160px;
    }

    .card__image--link {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .card__image {
      margin: 0 auto 15px;
      max-height: 200px;
    }

    .card__rating {
      margin: 0 auto 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
    }

    .reviews__link {
      background-repeat: repeat-x;
      position: relative;
      display: inline-block;
      background-image: url(https://getaawp.com/wp-content/plugins/aawp/assets/img/stars/v1.svg);
      height: 16px;
      width: 80px;
      background-size: 16px 16px;
    }

    .review__star {
      width: 80%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: block;
      background-image: url(https://getaawp.com/wp-content/plugins/aawp/assets/img/stars/v1-active.svg);
      background-size: 16px 16px;
    }

    .body {
      display: flex;
      flex-direction: column;
      padding-left: 32px;
      height: 100%;
      width: 100%;
    }

    .body__title {
      font-family: ${theme.fontFamilies.sans};
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0;
      text-transform: uppercase;
      color: #3D5C9B;
      line-height: 24px;
    }

    .content {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      white-space: normal;
    }

    .content__list {
      margin: 10px 0 10px 5px;
      padding: 0 0 0 20px;
      list-style-type: disc;
    }

    .content__list__item {
      line-height: 24px;
      margin: 8px 0;
    }

    .card__footer {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .card__pricing {
      display: flex;

      grid-gap: 10px;
      margin: 8px 0;
    }

    .card__pricing--old {
      font-size: 14px;
      text-decoration: line-through;
      color: #666;
      display: inline-block;
      line-height: 34px;
      vertical-align: middle;
    }

    .card__pricing--saved {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #27ae60;
      padding: 4px 6px;
      color: #fff;
      font-size: 12px;
    }

    .card__pricing--current {
      font-size: 20px;
      font-weight: 700;
      color: #666;
      line-height: 34px;
    }

    .check__prime {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      align-self: center;

      background-image: url(https://getaawp.com/wp-content/plugins/aawp/assets/img/icon-check-prime@2x.png);
      background-size: 55px 16px;
      width: 55px;
      height: 16px;
    }

    .button {
      position: relative;
      border-color: #9c7e31 #90742d #786025!important;
      border-radius: 3px;
      box-shadow: inset 0 1px 0 hsl(0deg 0% 100% / 40%);
      background: #f0c14b;
      background: linear-gradient(180deg, #f7dfa5, #f0c14b) repeat scroll 0 0 transparent;
      color: #111;
      padding: 7px 7px 7px 26px;
      font-size: 14px;
      font-weight: 400;
      line-height: 19px;
      text-align: center;
      border: 1px solid #ccc;
    }

    .card__reviews {
      width: 100%;
    }

    .button::before {
      background-image: url(https://getaawp.com/wp-content/plugins/aawp/assets/img/icon-amazon-black.svg);
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

    @media only screen and (max-width: ${theme.medias.tablet}) {
      .card {
        flex-direction: column;
      }

      .card__thumb  {
        display: flex;
        width: 100%;
        margin-bottom: 8px;
      }

      .card__image--link {
        height: 135px;
        display: flex;
        justify-content: center;
      }

      .card__rating {
        display: flex;
        flex-direction: column;
      }

      .body {
        padding: 0;
      }
    }
  `;

  return (
    <>
      <Box className={`card ${className}`}>
        {product.discount && (
          <Box className={`sale__tag ${className}`}>
            ⭐ -
            {product.discount}
            %
          </Box>
        )}
        <Box className={`card__thumb ${className}`}>
          <A to={product.link} className={`card__image--link ${className}`} externalLink target="_blank">
            <Image objectFit="contain" src={product.image.src} alt={product.image.alt} className={`card__image ${className}`} />
          </A>
          {product?.rating?.ammount && (
            <Box className={`card__rating ${className}`}>
              <A to={product.link} externalLink target="_blank" className={`reviews__link ${className}`}>
                <Span className={`review__star ${className}`} />
              </A>

              <Span className={`card__reviews ${className}`}>
                {`${product.rating.ammount} ${product.messages.reviews}`}
              </Span>

            </Box>
          )}
        </Box>
        <Box className={`body ${className}`}>
          <A to={product.link} externalLink target="_blank" className={`body__title ${className}`}>
            {product.title}
          </A>
          <Box className={`content ${className}`}>
            <List className={`content__list ${className}`}>
              {product.listDetails.map((item) => (
                <li className={`content__list__item ${className}`} key={item}>{item}</li>
              ))}
            </List>
          </Box>
          <Box className={`card__footer ${className}`}>
            <Box className={`card__pricing ${className}`}>
              {product.oldPrice && (
                <Span className={`card__pricing card__pricing--old ${className}`}>{product.oldPrice}</Span>
              )}
              {product.discount && (
                <Span className={`card__pricing card__pricing--saved ${className}`}>
                  −
                  {product.discount}
                  %
                </Span>
              )}
              {product.price && (
                <Span className={`card__pricing card__pricing--current ${className}`}>
                  $
                  {product.price}
                </Span>
              )}
              {product.primeLink && <A className={`check__prime ${className}`} to={product.primeLink} externalLink target="_blank"></A>}
            </Box>
            <A className={`button ${className}`} to={product.link} externalLink target="_blank">
              {product?.messages?.buyAmazon}
            </A>
          </Box>
        </Box>
      </Box>
      {styles}
    </>
  );
};

BoxStandard.defaultProps = {
  product: {
    messages: {
      reviews: 'Reviews',
      buyAmazon: 'Comprar en Amazon'
    },
  }
};

BoxStandard.propTypes = {
  product: PropTypes.shape({
    link: PropTypes.string.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    }).isRequired,
    rating: PropTypes.shape({
      ammount: PropTypes.string
    }),
    messages: PropTypes.shape({
      reviews: PropTypes.string,
      buyAmazon: PropTypes.string
    }),
    title: PropTypes.string.isRequired,
    listDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
    discount: PropTypes.number,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    primeLink: PropTypes.string,
  })
};

export default BoxStandard;
