/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { v4 as uuid } from 'uuid';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import ContentList from '../../atoms/ContentList';

import TagList from '../../molecules/TagList';
import TitleCustom from '../../molecules/TitleCustom';

function ProfileAdditionalDetails({
  certifications, additionalDetails, messages, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'certifications',
    'certifications',
    'messages',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme
  const { direction } = useTheme();

  // -- css style
  const { className, styles } = css.resolve`
    :global(.certifications-list.list-on-content) {
      margin-top: 12px;
      margin-left: 0;
      margin-right: 0;
    }
  `;

  return (
    <Box
      className={`profile-additional-details ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {certifications?.length > 0 && (
        <>
          <TitleCustom
            titleIsSpan
            type="h3"
            textColor="main.800"
            className="mt--big mb--0"
          >
            {messages?.certifications}
          </TitleCustom>
          <ContentList
            type="ul"
            listStyleType="disc"
            className={`certifications-list ${className}}`}
          >
            {certifications?.map(({
              title, degree, institution, country
            }) => (
              <li key={uuid()} className="d--flex ai--flex-start jc--flex-start">
                <Icon color="secondary.600" name="check" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal mt--small`} />
                <Span textColor="main.800">
                  <strong>{title}</strong>
                  <br />
                  <strong>
                    {degree}
                    :
                    {' '}
                  </strong>
                  {institution}
                  ,
                  {' '}
                  {country}
                </Span>
              </li>
            ))}
          </ContentList>
        </>
      )}
      {additionalDetails?.length > 0 && additionalDetails?.map(({
        id, title, children
      }) => (
        <React.Fragment key={id}>
          <TitleCustom
            titleIsSpan
            type="h3"
            textColor="main.800"
            className="mt--x-big mb--medium"
          >
            {title}
          </TitleCustom>
          <TagList
            hasLink={false}
            changeColorOnMobile={false}
            tags={children?.map(({
              id: key, title: name
            }) => ({ key, label: name })
            )}
          />
        </React.Fragment>
      ))}

      {/* custom styles */}
      {styles}
    </Box>
  );
}

ProfileAdditionalDetails.defaultProps = {
  certifications: [],
  additionalDetails: []
};

ProfileAdditionalDetails.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The certifications information
   */
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string,
      title: PropTypes.string,
      institution: PropTypes.string,
      country: PropTypes.string
    })
  ),

  /**
   * The additional information
   */
  additionalDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          children: PropTypes.any
        })
      ),
    })
  ),

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    certifications: PropTypes.string.isRequired,
  }),

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default ProfileAdditionalDetails;
