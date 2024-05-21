/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Heading from '../../atoms/Heading';

import CardConsult from '../../molecules/CardConsult';

function ConsultList({
  title: titleBox, titleType, consults = [], baseUrl, messages, lazy, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'baseUrl',
    'consults',
    'messages',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- css style
  const { className, styles } = css.resolve``;

  return (
    <Box
      className={`consults-list ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {titleBox && (
        <Heading type={titleType} textColor="main.800">{titleBox}</Heading>
      )}

      {consults.map(({
        _id, image, title, slug, prices
      }) => (
        <CardConsult
          key={_id}
          lazy={lazy}
          idConsult={_id}
          thumb={image}
          title={title}
          urlConsult={`${baseUrl}${slug}`}
          price={{
            value: prices[0].value,
            currency: prices[0].currency
          }}
          messages={messages}
          className="mtb--normal"
        />
      ))}

      {/* custom styles */}
      {styles}
    </Box>
  );
}

ConsultList.defaultProps = {
  lazy: true
};

ConsultList.propTypes = {

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The base url to single page of consult
   */
  baseUrl: PropTypes.string,

  /**
   * The list of consults (array of objects)
   */
  consults: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      prices: PropTypes.arrayOf(
        PropTypes.shape({
          currency: PropTypes.string,
          value: PropTypes.number
        })
      ),
      image: PropTypes.string,
      service_description: PropTypes.string
    })
  ).isRequired,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    scheduleConsult: PropTypes.string.isRequired,
  }),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default ConsultList;
