import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Heading from '../../atoms/Heading';
import Divider from '../../atoms/Divider';
import Paragraph from '../../atoms/Paragraph';

function ProfileFullBox({
  profile, firstTitle, secondTitle, messages, ...props
}) {
  // -- theme
  const { theme, getColor, colorMode } = useTheme();

  // -- allowedProps
  const propsBlacklist = [
    'profile',
    'firstTitle',
    'secondTitle',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- styles
  const { className, styles } = css.resolve`
    :global(.profile-box__content--text h3){
      margin-top: ${theme.spacings.normal};
      margin-bottom: ${theme.spacings.small};
    }
    :global(.profile-box__content--text ul){
      list-style: inside;
    }
    :global(.profile-box__content--text li){
      font-family: ${theme.fontFamilies.serif};
      font-size: ${theme.fontSizes.normal};
      line-height: 1.7;
    }
    .profile-box__content--text{
      transition: max-height 1s ease 0s;
    }
    .profile__list{
      list-style: inside;
    }

    // --
    .text__border{
      border-bottom: 1px solid ${getColor(colorMode === 'dark' ? 'grey-cold.200' : 'grey-cold.100')}
    }
  `;

  return (
    <Box
      className={`profile-box ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Heading type="h2" textColor="main.800" className="mb--medium">{firstTitle}</Heading>
      <Box className={`profile-box__content ${className} p--relative d--table f--1`}>
        <div
          className={`profile-box__content--text ${className} o--hidden c--grey-neutral-800 mb--normal fs--medium lh--1-5`}
        >
          {profile.user_info.bio}
        </div>
      </Box>

      {secondTitle && (
        <>
          <Divider color="main.100" />

          <Heading type="h2" textColor="main.800" className="mb--small">{secondTitle}</Heading>
          <Paragraph className={`text__border ${className} ptb--small`}>
            <strong>
              {messages.formation}
              :
            </strong>
            {' '}
            {profile.user_info.schooling}
          </Paragraph>
          <Paragraph className={`text__border ${className} ptb--small`}>
            <strong>
              {messages.areas}
              :
            </strong>
            {' '}
            {profile.user_info.professional_categories.map(({ _id, name }, index) => (
              <React.Fragment key={_id}>
                <Span>{name}</Span>
                {index < profile.user_info.professional_categories.length - 1 && (
                  <>,</>
                )}
                {' '}
              </React.Fragment>
            ))}
          </Paragraph>
          <Paragraph className={`text__border ${className} ptb--small`}>
            <strong>
              {messages.languages}
              :
            </strong>
            {' '}
            {profile.languages.map((item, index) => (
              <React.Fragment key={item}>
                <Span>{item}</Span>
                {index < profile.languages.length - 1 && (
                  <>,</>
                )}
                {' '}
              </React.Fragment>
            ))}
          </Paragraph>
          <Paragraph className={`${className} ptb--small`}>
            <strong>
              {messages.meets}
              :
            </strong>
            {' '}
            {profile.meets}
          </Paragraph>
        </>
      )}

      {/* custom styles */}
      {styles}
    </Box>
  );
}

ProfileFullBox.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Title for the first content block
   */
  firstTitle: PropTypes.string,

  /**
   * Title for the second content block
   */
  secondTitle: PropTypes.string,

  /**
   * The profile object (array of objects)
   */
  profile: PropTypes.shape({
    user_info: PropTypes.shape({
      bio: PropTypes.string,
      schooling: PropTypes.string,
      professional_categories: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          slug: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
    }),
    moreBio: PropTypes.string,
    languages: PropTypes.array,
    meets: PropTypes.string
  }).isRequired,

  /**
   * Content texts
   */
  messages: PropTypes.shape({
    readMore: PropTypes.string,
    readLess: PropTypes.string,
    formation: PropTypes.string,
    areas: PropTypes.string,
    languages: PropTypes.string,
    meets: PropTypes.string,
  })
};

export default ProfileFullBox;
