import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import A from '../../../atoms/A';
import Box from '../../../atoms/Box';
import Image from '../../../atoms/Image';
import Span from '../../../atoms/Span';

import { useTheme } from '../../../_settings/ThemeProvider/ThemeContext';

const TemplateList = ({ listItems = [] }) => {
  const { theme } = useTheme();

  const { className, styles } = css.resolve`
    .main-container {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }

    .template-list {
      display: flex;
      position: relative;

      border: 2px solid #BED4F5;
      background-color: #F8FDFF;

      padding: 8px;
    }

    .template-list:hover {
      border: 2px solid #2666ab;
    }

    .template-list__container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      border: 2px solid #BED4F5;
      background-color: #fff;
      max-width: 75px;
      max-height: 75px;
      min-width: 75px;
      min-height: 75px;
      padding: 3px
    }

    .template-list__container--image {
      width: auto;
      max-height: 70px;
    }

    .body {
      display: grid;
      flex-direction: column;

      margin-left: 20px;
    }

    .body__link {
      display: block;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-family: ${theme.fontFamilies.sans};
      text-transform: uppercase;
      width: 100%;
      color: #003;
      word-wrap: break-word;
      word-break: break-word;
    }

    .body__discount-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -1px;
      right: -1px;
      height: 25px;
      width: 70px;
      background-color: #709C3F;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
      font-family: ${theme.fontFamilies.sans};
    }

    .body__subtitle {
      font-family: ${theme.fontFamilies.sans};
      font-size: 14px;
      font-style: italic;
      color: #585858;
      margin-top: 4px;
      line-height: 16px;
      word-break: break-word;
    }

    .tags-and-price {
      margin-top: 4px;
    }

    .tags-and-price__price {
      color: #666;
      font-size: 14px;
      margin-right: 10px;
    }

    .tags-and-price__discount {
      padding: 3px 10px;
      background-color: #709C3F;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
      font-family: ${theme.fontFamilies.sans};
      margin-right: 10px;
      text-decoration: line-through;
    }

    .tags-and-price__prime {
      display: inline-block;
      width: 55px;
      height: 16px;
      background-image: url(https://www.comprarmicafetera.com/wp-content/plugins/aawp/assets/img/icon-check-prime.png);
      vertical-align: middle;
    }
  `;

  return (
    <>
      <Box className={`main-container ${className}`}>
        {listItems.map((item) => (
          <Box className={`template-list ${className}`} key={item.description}>
            {item.discount && (
              <Box className={`body__discount-tag ${className}`}>
                ⭐ -
                {item.discount}
                %
              </Box>
            )}
            <A to={item.link} externalLink target="_blank">
              <Box className={`template-list__container ${className}`}>
                <Image className={`template-list__container--image ${className}`} objectFit="contain" alt={item.image.alt} src={item.image.src} />
              </Box>
            </A>
            <Box className={`body ${className}`}>
              <A className={`body__link ${className}`} externalLink target="_blank" to={item.link}>
                {item.description}
              </A>
              {item.subtitle && (
                <Span className={`body__subtitle ${className}`}>{item.subtitle}</Span>
              )}
              <Box className={`tags-and-price ${className}`}>
                {item.price && (
                  <Span className={`tags-and-price__price ${className}`}>{item.price}</Span>
                )}
                {item.discount && (
                  <Span className={`tags-and-price__discount ${className}`}>
                    -
                    {item.discount}
                    %
                  </Span>
                )}
                {item.primeLink && (
                  <A to={item.primeLink} target="_blank" externalLink>
                    <Span className={`tags-and-price__prime ${className}`}></Span>
                  </A>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {styles}
    </>
  );
};

TemplateList.defaultProps = {
  listItems: []
};

TemplateList.propTypes = {
  listItems: PropTypes.arrayOf({
    description: PropTypes.string.isRequired,
    discount: PropTypes.number,
    link: PropTypes.string.isRequired,
    image: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string
    }).isRequired,
    subtitle: PropTypes.string,
    primeLink: PropTypes.string,
    price: PropTypes.string
  })
};

export default TemplateList;
