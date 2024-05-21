import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import truncate from '@charlescgr/underline/dist/truncate';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Paragraph from '../../atoms/Paragraph';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import TitleCustom from '../../molecules/TitleCustom';
import CardArticle from '../../molecules/CardArticle';

function ArticleListInCols({
  description,
  titleType,
  titleIsSpan,
  title: titleBox,
  articles,
  messages,
  ...props
}) {
  const { isDesktop } = useDeviceScreen();
  const { direction } = useTheme();
  const propsBlacklist = [
    'description',
    'titleIsSpan',
    'title',
    'titleType',
    'articles',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const { className, styles } = css.resolve``;

  return (
    <Box
      className={`article-list__cols ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {titleBox && (
        <Box className={`article-list__heading mb--small d--flex w--100 p--relative ${className} `}>
          <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="mb--normal pb--normal w--100">
            {titleBox}
          </TitleCustom>
          {isDesktop && messages?.recommendations.label && (
            <A to={messages?.recommendations.url} textColor="grey-neutral.500" className={`link-see-more ${className} ff--sans fw--bold p--absolute ${direction === 'rtl' ? 'l' : 'r'}--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
              {messages?.recommendations.label}
              <Icon name={`chevron-${direction === 'rtl' ? 'left' : 'right'}`} color="grey-neutral.500" />
            </A>
          )}
        </Box>
      )}
      {description && (
        <Paragraph>
          {description}
        </Paragraph>
      )}
      <Row className={`two__columns__padding${direction === 'rtl' ? '-reverse' : ''}`}>
        <Col colSize="6">
          {articles?.slice(0, articles.length / 2).map(({
            id, title, featured_media: figure, excerpt, permalink
          }, index) => (
            <CardArticle
              key={id}
              title={title}
              titleSize={isDesktop ? 'x-medium' : 'medium'}
              titleIsSpan
              figure={{
                src: figure,
                alt: title,
                title,
                lazy: true,
                loadingType: 'background',
                objectFit: 'cover',
                layout: 'fill'
              }}
              description={truncate(excerpt, 100)}
              horizontalSmallImg={isDesktop}
              horizontal={isDesktop}
              small={!isDesktop && index !== 0}
              url={permalink}
              externalLink={permalink.indexOf('http') >= 0}
              className="mb--big"
            />
          ))}
        </Col>
        <Col colSize="6">
          {articles?.slice(articles.length / 2, articles.length).map(({
            id, title, featured_media: figure, excerpt, permalink
          }) => (
            <CardArticle
              key={id}
              title={title}
              titleSize={isDesktop ? 'x-medium' : 'medium'}
              titleIsSpan
              figure={{
                src: figure,
                alt: title,
                title,
                lazy: true,
                loadingType: 'background',
                objectFit: 'cover',
                layout: 'fill'
              }}
              description={truncate(excerpt, 100)}
              horizontalSmallImg={isDesktop}
              horizontal={isDesktop}
              small={!isDesktop}
              url={permalink}
              externalLink={permalink.indexOf('http') >= 0}
              className="mb--big"
            />
          ))}
        </Col>
      </Row>

      {/* custom styles */}
      {styles}
    </Box>
  );
}

ArticleListInCols.defaultProps = {
  titleIsSpan: false
};

ArticleListInCols.propTypes = {
  /**
   * The title of the block
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The description of the block
   */
  description: PropTypes.string,

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
   * Text for component
   */
  messages: PropTypes.shape({
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }),

};

export default ArticleListInCols;
