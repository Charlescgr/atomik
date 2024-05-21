import React from 'react';
import PropTypes from 'prop-types';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import ArticleGrid from '../ArticleGrid';

function ArticleGridAds({
  title, articles, AdsBox, bookmark, titleIsSpan, imagesSize, ...props
}) {
  const { theme, direction } = useTheme();
  return (
    <Box className={`grid-ads-posts ${handleCreateStyleClass(props)}`}>
      <Row className={`two__columns__padding${direction === 'rtl' ? '-reverse' : ''}`}>
        <Col colSize="8">
          <ArticleGrid
            bookmark={bookmark}
            articles={articles}
            titleType="h2"
            title={title}
            maxCols={2}
            titleIsSpan={titleIsSpan}
            imagesSize={imagesSize}
          />
        </Col>
        <Col colSize="4" className="ads__container">
          <AdsBox />
        </Col>
      </Row>
      <style jsx global>
        {`
          .grid-ads-posts .ads-box {
            margin-${direction === 'rtl' ? 'right' : 'left'}: -16px;
            margin-${direction === 'rtl' ? 'left' : 'right'}: -16px;
          }
          @media only screen and (min-width: ${theme.medias.tablet}){
            .grid-ads-posts .ads-box {
              margin-${direction === 'rtl' ? 'right' : 'left'}: 0px;
              margin-${direction === 'rtl' ? 'left' : 'right'}: 0px;
            }
          }
        `}
      </style>
    </Box>
  );
}

ArticleGridAds.defaultProps = {
  bookmark: false,
  titleIsSpan: false
};

ArticleGridAds.propTypes = {
  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, permalink: PropTypes.string })),
      featured_media: PropTypes.any,
      permalink: PropTypes.string,
      slug: PropTypes.string,
    })
  ).isRequired,

  /**
   * Ads component
   */
  AdsBox: PropTypes.func,
  /**
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
  * Sizes of images to be displayed
  */
  imagesSize: PropTypes.oneOf(['small', 'medium', 'big'])
};

export default ArticleGridAds;
