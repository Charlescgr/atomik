import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

function Pagination({
  quantityPages, currentPage, changePage, limitPages, messages, ...props
}) {
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(true);
  const [nowPage, setNowPage] = useState(currentPage);
  const totalPages = Math.ceil(limitPages / 2);

  const propsBlacklist = [
    'quantityPages',
    'currentPage',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClickButton = (page) => {
    setShowNext(page !== quantityPages);
    setShowPrev(page !== 1);
    setNowPage(page);
    changePage(page);
  };

  const bgColor = () => (colorMode === 'dark' ? 'grey-neutral.100' : 'grey-neutral.50');

  // -- styles
  const { className, styles } = css.resolve`
    .pagination {
      flex-direction: ${direction === 'rtl' ? 'row-reverse' : 'row'};
      flex-wrap: wrap;
    }

    .button__small {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
    }

    .button__large {
      padding: 8px 12px;
    }

    .button__last-page {
      order: 3;
    }
    .button__first-page {
      order: 2;
    }
    .pagination__main-buttons {
      order: 1;
      width: 100%;
    }
  `;

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .button__last-page {
        order: ${direction === 'rtl' ? '1' : '3'};
      }
      .button__first-page {
        order: ${direction === 'rtl' ? '3' : '1'};
      }
      .pagination__main-buttons {
        order: 2;
        width: auto;
      }
    }
  `;

  // -- content
  const paginationButton = (page, text, typeButton, icon, activeButton) => (
    <Button
      rounded
      hasIcon
      invertOnHover
      size="custom"
      textColor={activeButton ? 'white' : 'grey-neutral.400'}
      color={activeButton ? 'main.300' : bgColor()}
      borderColor="grey-neutral.100"
      onClick={() => handleClickButton(page)}
      className={`pagination__button button__${typeButton} button__${icon} ${className} ${mediaStyles.className} fs--normal fw--${typeButton === 'large' ? 'semi' : ''}bold mlr--small`}
    >
      {icon !== '' && (
        <Icon name={icon} color="grey-neutral.400" className={`pagination__icon ${className}`} />
      )}
      {text}
    </Button>
  );

  const buildSequencialButtons = () => {
    // eslint-disable-next-line no-nested-ternary
    const initPage = totalPages > nowPage ? 1 : nowPage - totalPages < 1 ? 1 : nowPage - totalPages;
    const maxPages = (totalPages + nowPage) > quantityPages ? quantityPages : nowPage + totalPages;
    const content = [];

    if (initPage !== 1) {
      content.push(paginationButton(1, 1, 'small', '', false));
      content.push(paginationButton(initPage - 1, '...', 'small', '', false));
    }

    // eslint-disable-next-line no-plusplus
    for (let i = initPage; i <= maxPages; i++) {
      const active = nowPage === i;
      content.push(paginationButton(i, i, 'small', '', active));
    }
    if (maxPages !== quantityPages) {
      content.push(paginationButton(maxPages + 1, '...', 'small', '', false));
      content.push(paginationButton(quantityPages, quantityPages, 'small', '', false));
    }
    return content;
  };

  return (
    <Box
      className={`pagination ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)} d--flex ai--center jc--center ptb--big `}
      {...allowedProps}
    >
      {showPrev ? paginationButton(1, messages.first, 'large', 'first-page') : ''}
      <Box className={`pagination__main-buttons ${className} ${mediaStyles.className} d--flex ai--center jc--center mtb--normal`}>
        {showPrev ? paginationButton(nowPage - 1, '', 'small', `chevron-${direction === 'rtl' ? 'right' : 'left'}`) : ''}
        {buildSequencialButtons(quantityPages)}
        {showNext ? paginationButton(nowPage + 1, '', 'small', `chevron-${direction === 'rtl' ? 'left' : 'right'}`) : ''}
      </Box>
      {showNext ? paginationButton(quantityPages, messages.last, 'large', 'last-page') : ''}

      {/* common styles */}
      <style jsx global>
        {`
          .pagination__button:hover .pagination__icon path {
            fill: ${getColor('grey-neutral.50')};
          }
        `}
      </style>
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

Pagination.defaultProps = {
  limitPages: 10
};

Pagination.propTypes = {
  /**
   * The quantity of pages
   */
  quantityPages: PropTypes.number.isRequired,

  /**
   * The limit show pages numbers
   */
  limitPages: PropTypes.number,

  /**
   * The current page
   */
  currentPage: PropTypes.number.isRequired,

  /**
   * Function return clicked button
   */
  changePage: PropTypes.func,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Pagination;
