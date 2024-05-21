/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

import CardReview from '../CardReview';
import LoadingMore from '../LoadingMore';

import CardDefault from '../../molecules/CardDefault';
import Modal from '../../molecules/Modal';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function ReviewList({
  title: titleBox, titleType, firstLimit, insertReviewButton, showAuthorThumb, disclaimer, reviews = [], messages, ...props
}) {
  // -- theme
  const {
    getColor, colorMode, direction, theme
  } = useTheme();

  // -- state
  const [loading, setLoading] = useState(false);
  const [modalReview, setModalReview] = useState(false);

  // -- Hook render
  const { isDesktop } = useDeviceScreen();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'reviews',
    'messages',
    'disclaimer',
    'insertReviewButton',
    'firstLimit',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClick = () => {
    setLoading(!loading);
  };

  const handleAddReview = () => {
    setModalReview(!modalReview);
  };

  const authorThumb = () => (!!(showAuthorThumb || !isDesktop));

  const insertButtonText = () => {
    if (!isDesktop && messages.buttonInsertMobile) {
      return messages.buttonInsertMobile;
    }
    return messages.buttonInsert;
  };

  // -- css style
  const { className, styles } = css.resolve`
    :global(.disclaimer__text a) {
      font-weight: bold;
      color: ${getColor('secondary.600')};
      text-decoration: none;
    }

    .review__button--add {
      margin: 8px auto;
      width: 100%;
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .review__button--add {
        position: absolute;
        ${direction === 'rtl' ? 'left' : 'right'}: 0;
        top: 0;
        width: auto;
      }
    }
  `;

  return (
    <Box
      className={`reviews-list ${className} ${handleCreateStyleClass(props)} p--relative`}
      {...allowedProps}
    >
      {titleBox && (
        <Heading type={titleType} textColor="main.800" className="mb--normal">{titleBox}</Heading>
      )}

      {insertReviewButton && (
        <Button
          hasIcon
          rounded
          withAnimation
          onClick={handleAddReview}
          size="normal"
          color="secondary.600"
          textColor={colorMode === 'dark' ? 'black' : 'white'}
          className={`review__button--add ${className} fw--bold`}
        >
          <Icon
            size="normal"
            name="plus"
            color={colorMode === 'dark' ? 'black' : 'white'}
            loading={loading}
            className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
          />
          {insertButtonText()}
        </Button>
      )}

      {reviews.slice(0, firstLimit).map(({
        _id, author: { displayName, picture }, body, created, stars
      }) => (
        <React.Fragment
          key={_id}
        >
          <CardReview
            author={{
              name: displayName,
              thumb: authorThumb() ? picture : ''
            }}
            text={body}
            date={created}
            stars={stars}
            messages={messages}
          />
          <Divider color="main.800" type="dashed" className="mt--small mb--normal" />
        </React.Fragment>
      ))}
      {messages?.loadingMore && (
        <LoadingMore textColor="white" color="secondary.700" onClick={handleClick} loading={loading} className="mlr--auto" padding="small">
          {messages.loadingMore}
        </LoadingMore>
      )}

      {disclaimer && (
        <CardDefault
          rounded
          borderColor="grey-neutral.100"
          color="grey-neutral.50"
          className="d--flex ai--center p--normal mtb--big"
        >
          <Icon
            name="message-square-error"
            color="secondary.600"
            size="medium"
            className={`m${direction === 'rtl' ? 'l' : 'r'}--medium`}
          />
          <Paragraph
            size="normal"
            textColor="grey-neutral.500"
            className={`disclaimer__text ${className} ff--sans lh--1-5`}
            dangerouslySetInnerHTML={{ __html: disclaimer }}
          />
        </CardDefault>
      )}

      {insertReviewButton && (
        <Modal size="normal" isOpen={modalReview} closeModal={() => setModalReview(false)} className="br--small p--x-big w--50">
          <Heading type="h2" textColor="main.800" className="p--x-big ta--center">Form to add a new review, or redirect</Heading>
        </Modal>
      )}

      {/* custom styles */}
      {styles}
    </Box>
  );
}

ReviewList.defaultProps = {
  insertReviewButton: false,
  showAuthorThumb: false,
  firstLimit: 2
};

ReviewList.propTypes = {
  /**
   * Show / hide button to write a new Review
   */
  insertReviewButton: PropTypes.bool,

  /**
   * Show / hide thumb just on Destop screen... mobile is always true/show
   */
  showAuthorThumb: PropTypes.bool,

  /**
   * The first limit to show reviews
   */
  firstLimit: PropTypes.number,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The diclaimer text.
   */
  disclaimer: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The list of reviews (array of objects)
   */
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.shape({
        displayName: PropTypes.string,
        picture: PropTypes.string
      }),
      body: PropTypes.string,
      created: PropTypes.string,
      stars: PropTypes.shape({
        veracity: PropTypes.number,
        communicatibility: PropTypes.number,
        punctuality: PropTypes.number
      })
    })
  ).isRequired,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    loadingMore: PropTypes.string,
    readMore: PropTypes.string,
    readLess: PropTypes.string,
    buttonInsert: PropTypes.string,
    buttonInsertMobile: PropTypes.string
  })
};

export default ReviewList;
