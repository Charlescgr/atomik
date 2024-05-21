import React from 'react';
import PropTypes from 'prop-types';

import A from '../../atoms/A';
import Span from '../../atoms/Span';

const CardArticleCategory = ({
  horizontal,
  boxShadow,
  doNotLinkCategory,
  category,
  className,
  externalLink,
  articleUrl,
  utm
}) => (
  <Span
    className={`card-post__category${horizontal && boxShadow ? ' pt--normal' : ''} ${className} tt--uppercase ls--x-big lh--1-4 d--block ff--sans fw--bold fs--small`}
  >
    {doNotLinkCategory ? (
      <Span className="fs--x-small" textColor="main.600">
        {category?.name}
      </Span>
    )
      : (
        <A utm={utm} rel={externalLink && 'noopener'} to={category?.url} externalLink={externalLink} target={articleUrl.indexOf('http') >= 0 ? '_blank' : '_self'} textColor="main.600" className="fs--x-small">
          {category?.name}
        </A>
      )}
  </Span>
);

CardArticleCategory.propTypes = {

  /**
   * Informs if this card have box-shadow
   */
  boxShadow: PropTypes.bool,

  /**
   * Informs if this is a external link (out of website)
   */
  externalLink: PropTypes.bool,

  /**
   * The category of the post
   */
  category: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),

  /**
   * Inform if the post will be displayed horizontally
   */
  horizontal: PropTypes.bool,

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
   * The url from post
   */
  articleUrl: PropTypes.string.isRequired,

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

  /**
   * UTM data
   */
  utm: PropTypes.object,

  /**
   * When true does the category link take to another category
   */
  doNotLinkCategory: PropTypes.bool
};

export default CardArticleCategory;
