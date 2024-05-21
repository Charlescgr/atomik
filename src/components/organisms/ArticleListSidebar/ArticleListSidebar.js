import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';

import TitleCustom from '../../molecules/TitleCustom';
import CardArticle from '../../molecules/CardArticle';

function ArticleListSidebar({
  icon,
  withHighlight,
  titleType,
  title: titleBox,
  titleIsSpan,
  articles,
  lazy,
  ...props
}) {
  const propsBlacklist = [
    'withHighlight',
    'titleType',
    'icon',
    'title',
    'articles',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { isDesktop } = useDeviceScreen();

  const titleSize = (node) => {
    if (withHighlight && node === 0) {
      return 'x-medium';
    }
    if (isDesktop) {
      return 'normal';
    }
    return 'medium';
  };

  return (
    <Box
      className={`article-list__sidebar ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {titleBox && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="pb--normal mb--normal d--flex ai--center">
          {icon && (
            <Icon inline size="medium" color="grey-cold.300" prefix="bx" name={icon} className="mr--normal" />
          )}
          {titleBox}
        </TitleCustom>
      )}
      {articles.map(({
        id, title, url, figure
      }, index) => (
        <CardArticle
          key={id}
          small={!(withHighlight && index === 0)}
          titleSize={titleSize(index)}
          title={title}
          titleIsSpan
          figure={{
            ...figure,
            lazy,
            loadingType: 'background',
            objectFit: 'cover',
            layout: 'fill'
          }}
          url={url}
          externalLink={url.indexOf('http') >= 0}
          className="mb--big"
        />
      ))}
    </Box>
  );
}

ArticleListSidebar.defaultProps = {
  titleType: 'h3',
  titleIsSpan: false,
  lazy: true
};

ArticleListSidebar.propTypes = {
  /**
   * Informs if the first post is on highlight
   */
  withHighlight: PropTypes.bool,

  /**
   * The icon inside de title
   */
  icon: PropTypes.string,

  /**
   * The title
   */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The list of articles/posts (array of objects)
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      figure: PropTypes.object
    })
  ).isRequired,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default ArticleListSidebar;
