import React from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';

import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import Image from '../../atoms/Image';
import Span from '../../atoms/Span';

function ToolItem({
  url, imgPath, label, ...props
}) {
  const { className, styles } = css.resolve`
    .tool__image {
      max-width: 40px;
    }
  `;

  return (
    <>
      <Span className={`br--50 d--inline-block p--big ${handleCreateStyleClass(props)}`}>
        <A to={url} className="d--flex">
          <Image layout="fixed" src={imgPath} width="40" height="40" alt="" className={`tool__image ${className}`} />
        </A>
      </Span>
      <A to={url} textColor="main.800" className="ml--big ff--sans fs--medium fw--bold lh--1-6 ls--normal mr--big ta--left">
        {label}
      </A>
      {styles}
    </>
  );
}

ToolItem.defaultProps = {
  color: 'main.100'
};

ToolItem.propTypes = {
  /**
   * URL indicate where to direct
   * */
  url: PropTypes.string.isRequired,

  /**
   * Image path that should be displayed
   * */
  imgPath: PropTypes.string.isRequired,

  /**
   * Text to be displayed
   * */
  label: PropTypes.string.isRequired,

  /**
   * The color of bullets
   * */
  color: PropTypes.string
};

export default ToolItem;
