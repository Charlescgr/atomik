/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Button from '../../atoms/Button';

import TitleCustom from '../../molecules/TitleCustom';

import ArticleGrid from '../ArticleGrid';

function ArticleGridFilter({
  title, titleType, titleIsSpan, activeCategory, articles, maxCols, bookmark, utm, messages, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'titleIsSpan',
    'articles',
    'activeCategory',
    'maxCols',
    'bookmark',
    'utm',
    'messages',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme context
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  // -- scripts
  const loadPosts = (idCat, posts) => {
    let arrPosts = [];
    if (idCat === 999 && posts === '') {
      Array.prototype.forEach.call(articles, (parent) => {
        Array.prototype.forEach.call(parent.posts, (child) => {
          arrPosts.push(child);
        });
      });
    } else {
      arrPosts = arrPosts.concat(posts);
    }
    return arrPosts;
  };

  // -- state
  const [showCategory, setShowCategory] = useState(activeCategory);
  const [postList, setPostList] = useState(loadPosts(activeCategory, '')); // check with the devs this is correct

  // -- scripts
  const handleClickCategory = (cat, posts) => {
    setShowCategory(cat);
    setPostList(loadPosts(cat, posts));
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .article-grid-filter__controls {
        flex-wrap: wrap;
        overflow-x: hidden;
      }
    }
  `;

  // -- css style
  const { className, styles } = css.resolve`
    .button__filter {
      flex: none;
    }
    .article-grid-filter__controls {
      overflow-x: scroll;
    }
  `;

  return (
    <Box
      className={`article-grid-filter ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.400" className="mb--small pb--normal">
          {title}
        </TitleCustom>
      )}

      <Box className={`article-grid-filter__controls ${className} ${mediaStyles.className} d--flex jc--flex-start mtb--big fd--row p${direction === 'rtl' ? 'r' : 'l'}--normal`}>
        <Button
          rounded
          withAnimation
          invertOnHover
          onClick={() => handleClickCategory(999, '')}
          size="normal"
          color={activeCategory === showCategory ? 'main.800' : 'grey-neutral.50'}
          textColor={activeCategory === showCategory ? 'grey-neutral.50' : 'main.800'}
          className={`button__filter ${className} ${mediaStyles.className} fw--bold m${direction === 'rtl' ? 'l' : 'r'}--medium mb--medium ${activeCategory === showCategory ? ' is--active' : ''}`}
        >
          {messages.allPosts}
        </Button>
        {articles?.map(({ name, posts }, index) => (
          <Button
            key={name}
            rounded
            withAnimation
            invertOnHover
            onClick={() => handleClickCategory(index, posts)}
            size="normal"
            color={index === showCategory ? 'main.800' : 'grey-neutral.50'}
            textColor={index === showCategory ? 'grey-neutral.50' : 'main.800'}
            className={`button__filter ${className} ${mediaStyles.className} fw--bold m${direction === 'rtl' ? 'l' : 'r'}--medium mb--medium ${index === showCategory ? ' is--active' : ''}`}
          >
            {name}
          </Button>
        ))}
      </Box>
      <ArticleGrid
        bookmark={bookmark}
        articles={postList}
        maxCols={maxCols}
        boxShadow={false}
        withDescription={false}
        utm={{
          source: utm.source,
          medium: utm.medium,
          campaign: utm.campaign
        }}
      />

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

ArticleGridFilter.defaultProps = {
  activeCategory: 999,
  titleIsSpan: false,
  titleType: 'h2'
};

ArticleGridFilter.propTypes = {
  /**
  * Show bookmark on articles card
  */
  bookmark: PropTypes.bool,

  /**
  * The index of the active term
  */
  activeCategory: PropTypes.number,

  /**
  * The custom classname prop.
  */
  className: PropTypes.string,

  /**
  * Container title
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
  * The max. number of cols. from posts list
  */
  maxCols: PropTypes.number,

  /**
  * UTM data
  */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),

  /**
  * Texts for this component
  */
  messages: PropTypes.shape({
    allPosts: PropTypes.string
  }),

  /**
  * The list of articles/posts (array of objects)
  */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, permalink: PropTypes.string })),
        featured_media: PropTypes.any,
        excerpt: PropTypes.string,
        permalink: PropTypes.string,
        slug: PropTypes.string,
        source: PropTypes.object
      })
    })
  ).isRequired
};

export default ArticleGridFilter;
