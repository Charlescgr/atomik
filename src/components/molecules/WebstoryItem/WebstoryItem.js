import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function WebstoryItem({
  title, size, permalink, thumbnailSrc, ...props
}) {
  const propsBlacklist = ['id', 'title', 'link', 'size', 'className'];
  const allowedProps = omit(props, propsBlacklist);

  const { theme, getColor } = useTheme();

  const returnSize = () => {
    if (size === 'big') {
      return 164;
    }
    return 96;
  };

  const { className, styles } = css.resolve`
    .webstory-item {
      max-width: calc(${returnSize()}px + 16px);
    }
    .webstory__figure {
      width: ${returnSize() - 20}px;
      height: ${returnSize() - 20}px;
      will-change: transform;
      transition: all 250ms ease-in-out;
    }
    .webstory__figure::after {
      position: absolute;
      border-radius: 50%;
      top: -6px;
      left: -6px;
      content: '';
      width: ${returnSize() - 12}px;
      height: ${returnSize() - 12}px;
      border: 2px solid ${getColor('main.600')};
    }
    .webstory-item:hover .webstory__figure {
      transform: scale(1.04);
    }
    .webstory__image {
      transition: opacity 0.25s ease;
    }
    .webstory-item:hover .webstory__image {
      opacity: 0.9;
    }
    .webstory__title {
      word-break: break-word;
      color: ${getColor('grey-neutral.400')};
      transition: color 0.4s ease;
      font-size: ${theme.fontSizes.small};
      line-height: 1.1;
    }
    .webstory-item:hover .webstory__title {
      color: ${getColor('main.500')};
    }
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .webstory__figure {
        width: ${returnSize() - 8}px;
        height: ${returnSize() - 8}px;
      }
      .webstory__figure::after {
        top: -6px;
        left: -6px;
        width: ${returnSize()}px;
        height: ${returnSize()}px;
      }
      .webstory__title {
        font-size: ${theme.fontSizes.normal};
        line-height: 1.2;
      }
    }
  `;

  return (
    // <A to={permalink} target={'_blank'} externalLink>
    <Box
      className={`webstory-item ${className} ${handleCreateStyleClass(
        props
      )} d--flex ai--center jc--center fd--column mt--normal mb--small c--pointer`}
      {...allowedProps}
    >
      <Box
        className={`webstory__figure ${className} br--50 p--small p--relative`}
      >
        <Image
          src={thumbnailSrc}
          alt={title}
          layout="fill"
          loadingType="none"
          lazy={false}
          objectFit="cover"
          className={`webstory__image ${className} br--50`}
        />
      </Box>
      <Span
        className={`webstory__title ${className} mt--normal ta--center d--block ff--sans fw--semibold ls--big`}
      >
        {title}
      </Span>

      {/* common and custom styles */}
      {styles}
    </Box>
    // </A>
  );
}

WebstoryItem.defaultProps = {
  link: '#',
  size: 'small'
};

WebstoryItem.propTypes = {
  /**
   * The id from the storie
   */
  id: PropTypes.string,

  /**
   * The link from the storie
   */
  link: PropTypes.string,

  /**
   * The title for the item
   */
  title: PropTypes.string.isRequired,

  /**
   * The image/thumb source
   */
  thumbnailSrc: PropTypes.string,

  /**
   * The the size of the image/thumb
   */
  size: PropTypes.string,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * Link to open in new tab
   */
  permalink: PropTypes.string
};

export default WebstoryItem;
