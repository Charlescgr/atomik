import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import Box from '../../../atoms/Box';
import Image from '../../../atoms/Image';
import Span from '../../../atoms/Span';
import A from '../../../atoms/A';

import { useTheme } from '../../../_settings/ThemeProvider/ThemeContext';

const BoxGrid = ({ productList = [], messages }) => {
  const { theme } = useTheme();

  const { className, styles } = css.resolve`
    .main-container {
      display: flex;
      justify-content: center;
      width: 100%;
      flex-wrap: wrap;
      row-gap: 24px;
      column-gap: 24px;
    }

    .main-container-ads {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      background: #fff;

      border: 1px solid rgba(51,122,183,.47);
      box-shadow: 0 2px 10px -1px rgb(51 122 183 / 57%);

      position: relative;
      max-width: 283px;
      width: 100%;
      font-size: 15px;
      line-height: 1.6;
      white-space: normal;
      padding: 25px 15px 15px;
      min-height: 444px;
    }

    .body__discount-tag {
      position: absolute;
      top: -1px;
      right: -1px;
      padding: 3px 10px;
      background-color: #709C3F;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
      font-family: ${theme.fontFamilies.sans};
    }

    .image-container {
      display: flex;
      justify-content: center;
      position: relative;
      height: 250px;
      width: 250px;
    }

    .image-container__image {
      height: 100%;
    }

    .description-container {}

    .description-container__description {
      text-align: center;
      color: #2666ab;
      font-family: ${theme.fontFamilies.sans};

      display: block;
      height: 40px;
      margin-top: 10px;
      outline: none;
      text-decoration: none;
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .main-container-ads__button {
      display: flex;
      justify-content: center;
      margin: 0;
      width: 100%;
      font-size: 15px;
      position: relative;
      padding-left: 32px;

      border-radius: 3px;
      box-shadow: inset 0 1px 0 hsl(0deg 0% 100% / 40%);
      background: #f0c14b;
      background: linear-gradient(180deg,#f7dfa5,#f0c14b) repeat scroll 0 0 transparent;
      color: #111;
      box-sizing: border-box;
      padding: 7px 12px 6px;
      cursor: pointer;
      font-weight: 400;
      line-height: 19px;
      text-align: center;
      text-decoration: none;
      border: 1px solid #ccc;
      border-color: #9c7e31 #90742d #786025;
      font-family: ${theme.fontFamilies.sans};
    }

    .main-container-ads__button:before {
      background-image: url(https://www.comprarmicafetera.com/wp-content/plugins/aawp/assets/img/icon-amazon-black.svg);
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

    .rating {
      display: flex;
      align-items: center;
      justify-content: space-between;
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

    .card__reviews {
      margin-left: 4px;
    }

    .tags-container {
      display: flex;
      margin-top: 8px;
      width: 100%;
      justify-content: space-between;
    }

    .tags-container__check-prime {
      display: inline-block;
      width: 55px;
      height: 16px;
      background-image: url(https://www.comprarmicafetera.com/wp-content/plugins/aawp/assets/img/icon-check-prime.png);
      vertical-align: middle;
    }

    .main-container-ads__price {
      margin-top: 10px;
      width: 100%;
      color: #666;
      font-size: 14px;
      text-decoration: line-through;
      line-height: 18px;
      font-family: ${theme.fontFamilies.sans};
      margin-bottom: 8px;
    }
  `;

  return (
    <>
      <Box className={`main-container ${className}`}>
        {productList.map((item) => (
          <Box className={`main-container-ads ${className}`} key={item.description}>
            {item.discount && (
              <Box className={`body__discount-tag ${className}`}>
                ⭐ -
                {item.discount}
                %
              </Box>
            )}
            <A to={item.link} className={`image-container ${className}`} target="_blank" externalLink>
              <Image className={`image-container__image ${className}`} src={item.image.src} alt={item.image.alt} />
            </A>
            <A to={item.link} className={`description-container ${className}`} target="_blank" externalLink>
              <Span className={`description-container__description ${className}`}>{item.description}</Span>
            </A>
            <Box className={`tags-container ${className}`}>
              {item?.rating?.ammount && (
                <Box className={`rating ${className}`}>
                  <A className={`reviews__link ${className}`} to={item.link} externalLink target="_blank">
                    <Span className={`review__star ${className}`} />
                  </A>
                  <Span className={`card__reviews ${className}`}>
                    (
                    {item?.rating?.ammount}
                    )
                  </Span>
                </Box>
              )}
              {item?.primeLink && (
                <A to={item.primeLink} className={`tags-container__check-prime ${className}`} target="_blank"></A>
              )}
            </Box>
            {item?.oldPrice && (
              <Span className={`main-container-ads__price ${className}`}>{item.oldPrice}</Span>
            )}
            <A to={item.link} target="_blank" className={`main-container-ads__button ${className}`}>{messages.seePrice}</A>
          </Box>
        ))}
      </Box>
      {styles}
    </>
  );
};

BoxGrid.defaultProps = {
  productList: [],
  messages: {
    seePrice: 'See Price'
  }
};

BoxGrid.propTypes = {
  productList: PropTypes.arrayOf({
    discount: PropTypes.number,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    }).isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      ammount: PropTypes.number
    }),
    primeLink: PropTypes.string,
    oldPrice: PropTypes.string
  }),
  messages: PropTypes.shape({
    seePrice: PropTypes.string
  })
};

export default BoxGrid;
