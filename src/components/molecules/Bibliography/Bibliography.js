import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';

import getBibliography from './getBibliography';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Bibliography({ items, messages, ...props }) {
  const isAmp = useAmp();
  const [show, setShow] = useState(false);
  const [bibliography, setBibliography] = useState(items?.replace(new RegExp('&nbsp;', 'g'), '').replace(new RegExp('pmc_ext', 'g'), '_blank').trim() || false);
  const [elementMaxHeight, setElementMaxHeight] = useState(isAmp ? 450 : null);
  const { getColor } = useTheme();

  useEffect(() => {
    setShow(false);
    setBibliography(items?.replace(new RegExp('&nbsp;', 'g'), '').replace(new RegExp('pmc_ext', 'g'), '_blank').trim() || false);
  }, [items]);

  useEffect(() => {
    const elementRef = document.querySelector('.bibliography__content');

    function handleResizing() {
      if (elementRef) {
        setElementMaxHeight(elementRef.getBoundingClientRect().height);
      }
    }

    handleResizing();

    window.addEventListener('resize', handleResizing);

    return () => {
      window.removeEventListener('resize', handleResizing);
    };
  }, []);

  const { className, styles } = css.resolve`
    .bibliography {
      height: 58px;
      transition: all 0.3s ease;
    }

    .bibliography.is--showing {
      height: ${elementMaxHeight + 58}px;
      transition: all 0.3s ease;
    }

    .bibliography .bibliography__icon{
      transition: transform 0.3s ease;
    }

    .bibliography__item{
      border-bottom: 1px dashed ${getColor('main.100')};
    }
    .bibliography__item:last-child{
      border-bottom: none;
    }
  `;

  if (bibliography && bibliography.length > 0) {
    return (
      <Box
        id="bibliographyTextContent"
        className={`bibliography ${className} ${show ? ' is--showing' : ' is--hidding'} ${handleCreateStyleClass(props)} o--hidden`}
      >
        <Box className={`bibliography__header ${className} d--flex`}>
          <Button
            type="button"
            size="custom"
            className={`p--0 m--0 ptb--big d--flex ai--center jc--center ${className}`}
            onClick={() => setShow(!show)}
            id="bibliographyButton"
            on="tap:bibliographyTextContent.toggleClass(class='is--showing')"
            data-with-google-events="true"
            data-google-events={JSON.stringify({
              data: {
                action: 'click',
                category: 'Button',
                label: 'Bibliography'
              }
            })}
          >
            <span className={`bibliography__icon d--flex ai--center jc--center  ${className}`}>
              <Icon
                name="plus"
                color="secondary.400"
                size="normal"
                inline
                className={`${className}`}
                style={{ transform: `${show ? 'rotate(224deg)' : 'rotate(360deg)'}` }}
              />
            </span>
            <span className="fw--normal ff--sans lh--1-5 fs--normal c--grey-neutral-800 ml--small">{messages.buttonTitle}</span>
          </Button>
        </Box>
        <Box className="bibliography__content">
          <Divider
            size="small"
            type="dashed"
            color="main.200"
            className="m--0"
          />
          <List className={`bibliography__list ${className} ff--sans ml--x-big mb--big lst--disc`}>
            {getBibliography(bibliography).map((item) => (
              <li
                key={item}
                className={`bibliography__item ${className} c--grey-neutral-800 fs--normal plr--normal ptb--big lh--1-5`}
              >
                {item}
              </li>
            ))}
          </List>
        </Box>

        {/* commom styles */}
        {styles}
        <style jsx global>
          {`
            .bibliography__item a{
              color: ${getColor('secondary.600')};
            }
          `}
        </style>
      </Box>
    );
  }

  return null;
}

Bibliography.defaultProps = {
  messages: {
    buttonTitle: 'Bibliography',
  }
};

Bibliography.propTypes = {
  /**
   * The list items of the Bibliography
   */
  items: PropTypes.string.isRequired,

  /**
   * The custom classNames
   */
  className: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    buttonTitle: PropTypes.string,
  })
};

export default Bibliography;
