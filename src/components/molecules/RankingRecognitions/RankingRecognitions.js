import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import TitleCustom from '../TitleCustom';

import Button from '../../atoms/Button';
import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';

function RankingRecognitions({
  list, title, showItens, messages, ...props
}) {
  // -- theme
  const { theme, getColor } = useTheme();

  // -- refs
  const heightList = useRef(null);

  // -- states
  const [open, setOpen] = useState('');
  const [heightSize, setHeightSize] = useState('');

  // -- scripts
  const checkContentHeight = () => {
    if (showItens) {
      return `${(heightList.current.scrollHeight / list.length) * showItens}px`;
    }
    return 'auto';
  };

  // toggle open/close review
  const handleToggle = () => {
    setOpen(open === '' ? 'open' : '');
    setHeightSize(open === 'open' ? checkContentHeight() : `${heightList.current.scrollHeight}px`);
  };

  useEffect(() => {
    setHeightSize(checkContentHeight());
  }, []);

  // -- allowed props
  const propsBlacklist = [
    'title',
    'showItens',
    'list',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- styles
  const colorFadeElement = () => {
    if (!showItens) {
      return 'background-image: linear-gradient(180deg, transparent}, 0), transparent, 1) 80%);';
    }
    return `background-image: linear-gradient(180deg, rgba(${hexToRgb(getColor('grey-neutral.50'))}, 0), rgba(${hexToRgb(getColor('grey-neutral.50'))}, 1) 80%);`;
  };

  const { className, styles } = css.resolve`
    .ranking-recognitions {
      margin-left: -16px;
      margin-right: -16px;
    }

    .recognitions__group {
      transition: max-height 1s ease 0s;
    }

    .recognitions__group:after{
      content: '';
      ${colorFadeElement()}
      padding: 30px 0 10px 0;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 4;
      width: 100%;
      transition: all 1s ease 0s;
    }

    .recognitions__group.is--open:after{
      padding: 5px 0 1px 0;
    }

    @media only screen and (min-width: ${theme.medias.tablet}){
      .ranking-recognitions {
        border-radius: 8px;
        margin-left: 0px;
        margin-right: 0px;
      }
    }
  `;

  return (
    <Box className={`ranking-recognitions ${className} ${handleCreateStyleClass(props)} bc--grey-neutral-50 p--big`} {...allowedProps}>
      <TitleCustom titleIsSpan type="h2" textColor="main.800" className="pb--normal">
        {title}
      </TitleCustom>
      <div
        ref={heightList}
        style={{ maxHeight: `${heightSize}` }}
        className={`recognitions__group ${className} ${open !== '' ? 'is--open ' : ''}o--hidden p--relative mb--normal`}
      >
        <List
          className={`recognitions__list ${className}`}
        >
          {list.map(({ id, text, url }) => (
            <li
              key={id}
              className={`recognitions__item ${className} d--flex ai--flex-start mt--small mb--normal jc--flex-start`}
            >
              <Icon prefix="bxs" name="star" color="secondary.600" />
              <A
                to={url}
                className={`recognitions__link ${className} mlr--normal ff--serif lh--1-5`}
                textColor="main.800"
                title={text}
              >
                {text}
              </A>
            </li>
          ))}
        </List>
      </div>
      {showItens && (
        <Button
          color="transparent"
          size="custom"
          textColor="grey-neutral.500"
          className={`recognitions__button ${className} fw--semibold fs--normal ptb--normal plr--0`}
          onClick={handleToggle}
        >
          {open !== '' ? messages.readLess : messages.readMore}
          <Icon inline size="normal" color="main.600" prefix="bx" name={open === 'open' ? 'chevron-up-circle' : 'chevron-down-circle'} className="ml--normal" />
        </Button>
      )}

      {/* styles */}
      {styles}
    </Box>
  );
}

RankingRecognitions.defaultProps = {
  messages: {
    readMore: 'Leer más',
    readLess: 'Leer menos',
  }
};

RankingRecognitions.propTypes = {
  /**
   * The title of the box
   */
  title: PropTypes.string,

  /**
   * The limit of itens to show, when de box is closed
   */
  showItens: PropTypes.number,

  /**
   * The list of recognitions / awards
   */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    readMore: PropTypes.string,
    readLess: PropTypes.string
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default RankingRecognitions;
