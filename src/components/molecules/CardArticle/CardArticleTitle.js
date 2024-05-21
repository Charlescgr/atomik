import React from 'react';
import PropTypes from 'prop-types';

import TitleCustom from '../TitleCustom';

const CardArticleTitle = ({
  small,
  titleSize,
  titleColor,
  titleIsSpan,
  description,
  horizontalSmallImg,
  horizontal,
  relatedCard,
  title,
  className
}) => {
  const classStyles = () => {
    let classesNames = '';
    if (description) {
      if (!horizontalSmallImg && !horizontal && !relatedCard) {
        classesNames = 'mb--small ';
      }
    }
    return classesNames;
  };
  const titleSizes = () => {
    let titleSizeStyle = '';
    if (small) {
      titleSizeStyle = titleSize || 'small';
    } else {
      titleSizeStyle = titleSize;
    }
    return titleSizeStyle;
  };

  const titleColors = () => {
    let titleColorStyle = '';
    if (titleColor) {
      titleColorStyle = titleColor;
    } else {
      titleColorStyle = 'main.900';
    }
    return titleColorStyle;
  };

  return (
    <TitleCustom
      titleIsSpan={titleIsSpan}
      textColor={titleColors()}
      size={titleSizes()}
      className={`card-article__title ${classStyles()} ${className}`}
    >
      {title}
    </TitleCustom>
  );
};

CardArticleTitle.propTypes = {

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The title of the post
   */
  title: PropTypes.string.isRequired,

  /**
   * The title color
   */
  titleColor: PropTypes.string,

  /**
   * The category of the post
   */
  category: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),

  /**
   * The short description of the post
   */
  description: PropTypes.string,

  /**
   * Inform if the post will be displayed small
   */
  small: PropTypes.bool,

  /**
   * Related post/car inside the content
   */
  relatedCard: PropTypes.bool,

  /**
   * Inform if the post will be displayed horizontally
   */
  horizontal: PropTypes.bool,

  /**
   * Inform if the post will be displayed horizontal with small img
   */
  horizontalSmallImg: PropTypes.bool,

  /**
   * The font-size of the title, when the card is on small mode
   */
  titleSize: PropTypes.string,

  /**
   * The source of the post
   */
  source: PropTypes.shape({
    color: PropTypes.string,
    via: PropTypes.string,
    logo: PropTypes.string
  }),

  /**
   * If it's a course post
   */
  course: PropTypes.shape({
    price: PropTypes.string,
    oldPrice: PropTypes.string
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    courseOnline: PropTypes.string,
    by: PropTypes.string,
    discountText: PropTypes.string,
    readItIn: PropTypes.string
  }),

};

export default CardArticleTitle;
