import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Image from '../../atoms/Image';
import Heading from '../../atoms/Heading';
import Divider from '../../atoms/Divider';
import Paragraph from '../../atoms/Paragraph';

import Revision from '../../molecules/Revision';
import BreakContent from '../../molecules/BreakContent';

function HeadingPageLanding({
  title, reviewed, illustration, description, tags, messages, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'title',
    'reviewed',
    'illustration',
    'description',
    'tags',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { isDesktop } = useDeviceScreen();
  const {
    theme, getColor, direction, colorMode
  } = useTheme();
  const isAmp = useAmp();

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .intro-page .break-content {
        margin-left: 0px;
        margin-right: 0px;
        border-radius: ${theme.spacings.small};
      }
      .intro__figure{
        position: absolute;
        top: -48px;
        ${direction === 'rtl' ? 'left: 0;' : 'right: 0;'}
        z-index: 2;
        justify-content: flex-end;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .intro__figure {
      justify-content: center;
    }

    .intro-page .break-content {
      margin-left: -16px;
      margin-right: -16px;
      border-radius: 0;
      background-color: ${getColor('main.50')};
    }
  `;

  return (
    <Box
      className={`intro-page ${className} ${mediaStyles.className} p--relative  ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <figure className={`intro__figure ${className} ${mediaStyles.className} d--flex`}>
        <Image
          src={illustration}
          alt={`${title} illustration`}
          className={`intro__image ${className} ${mediaStyles.className} t--0 ${direction === 'rtl' ? 'l' : 'r'}--0`}
          width={isDesktop ? '210' : '140'}
          height={isDesktop ? '165' : '110'}
          lazy
          layout="fixed"
        />
      </figure>
      <Heading
        textColor="main.600"
      >
        {title}
      </Heading>
      {reviewed?.name && (
        <Revision
          compactVersion
          authorToolTip
          from={{
            name: reviewed.name,
            description: reviewed.description,
            avatar: reviewed.picture,
            role: messages.role,
            date: messages.date,
            permalink: reviewed.permalink
          }}
          messages={{
            in: messages.in,
            reviewedApprovedBy: messages.reviewedApprovedBy,
          }}
          className="mtb--big"
        />
      )}

      <BreakContent className={`${className} ${mediaStyles.className} mtb--${isDesktop ? 'big' : 'normal'} p--relative bc--main-50`} size="normal">
        <Paragraph size="normal" dangerouslySetInnerHTML={{ __html: description }} />
        {!isDesktop && <Divider color="secondary.200" />}
        <Box className="d--flex jc--center mt--big mb--small fw--wrap">
          {tags?.map(({ name, post: { permalink, id } }) => (
            <A
              key={id}
              to={permalink}
              textColor={colorMode === 'dark' ? 'main.200' : 'main.800'}
              title={name}
              withAnimation
              invertOnHover
              color={colorMode === 'dark' ? 'main.800' : 'white'}
              size="medium"
              className={`br--small bs--small fw--bold ptb--big plr--x-big m--${isDesktop ? 'medium' : 'normal'}`}
            >
              {name}
            </A>
          ))}
        </Box>
      </BreakContent>

      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

HeadingPageLanding.propTypes = {
  /**
  * The Title of page
  */
  title: PropTypes.string,

  /**
   * The image/illustration
   */
  illustration: PropTypes.string,

  /**
   * The text from description
   */
  description: PropTypes.string,

  /**
   * The color of bullets/tool items
   * */
  tags: PropTypes.array,

  /**
   * The reviewed info
   * */
  reviewed: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    permalink: PropTypes.string
  }),

  /**
   * Component messages
   * */
  messages: PropTypes.shape({
    role: PropTypes.string,
    date: PropTypes.string,
    in: PropTypes.string,
    reviewedApprovedBy: PropTypes.string
  }),

  /**
   * The custom classnames
   */
  className: PropTypes.string
};

export default HeadingPageLanding;
