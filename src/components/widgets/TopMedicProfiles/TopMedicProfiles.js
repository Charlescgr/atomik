import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { v4 as uuid } from 'uuid';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Paragraph from '../../atoms/Paragraph';

import TitleCustom from '../../molecules/TitleCustom';

import CardProfile from '../../organisms/CardProfile';

function TopMedicProfiles({
  title,
  titleType,
  text,
  profiles,
  messages,
  ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'text',
    'profiles',
    'messages',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- css style
  const { className, styles } = css.resolve`
  `;

  return (
    <Box
      className={`top-profiles ${className}  ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom type={titleType} textColor="main.800" className="mtb--normal">{title}</TitleCustom>
      )}
      {text && (
        <Paragraph textColor="main.800">{text}</Paragraph>
      )}
      {profiles.map((profile, index) => (
        <CardProfile
          key={uuid()}
          index={index + 1}
          profile={profile}
          messages={messages}
          className="mtb--x-big"
        />
      ))}

      {/* custom styles */}
      {styles}
    </Box>
  );
}

TopMedicProfiles.defaultProps = {
  titleType: 'h3'
};

TopMedicProfiles.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The of the container
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The intro text
   */
  text: PropTypes.string,

  /**
   * The profiles data
   */
  profiles: PropTypes.object,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    verifiedProfile: PropTypes.string,
    medicTeam: PropTypes.string,
    reviews: PropTypes.string,
    contact: PropTypes.string,
    call: PropTypes.string,
    onlineService: PropTypes.string,
    costPerSession: PropTypes.string,
    presentialAssistance: PropTypes.string,
  })
};

export default TopMedicProfiles;
