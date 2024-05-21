import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import get from '@charlescgr/underline/dist/get';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Icon from '../../atoms/Icon';
import Badge from '../../atoms/Badge';
import Image from '../../atoms/Image';
import Paragraph from '../../atoms/Paragraph';

import TagList from '../../molecules/TagList';
import StarsPoints from '../../molecules/StarsPoints';
import TitleCustom from '../../molecules/TitleCustom';
import ConsultInfos from '../../molecules/ConsultInfos';

function CardProfile({
  typeCard, index, profile, descriptionLines, messages, googleEvent, utm, externalLink, ...props
}) {
  // -- Hook render
  const { isDesktop } = useDeviceScreen();

  // -- theme
  const {
    theme, getColor, direction, colorMode, cdnPath
  } = useTheme();

  // -- allowed props
  const propsBlacklist = [
    'typeCard',
    'index',
    'profile',
    'messages',
    'googleEvent',
    'utm',
    'externalLink',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- styles
  const { className, styles } = css.resolve`
    .card-profile {
      border: 2px solid ${getColor('grey-neutral.100')};
      border-radius: 4px;
    }
    .card-profile__header {
      position: relative;
    }
    .profile__thumb {
      border-radius: 8px;
      text-align: center;
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }
    .profile__image {
      border-radius: 8px;

    }
    .profile__info {
      margin: 0 16px;
    }
    .profile__position {
      width: 40px;
      height: 40px;
      top: -28px;
      right: calc(50% - 20px);
      position: absolute;
    }
    .profile__name {
      text-align: center;
      padding-top: 24px;
    }
    .profile__area {
      text-align: center;
    }
    .profile__reviews {
      justify-content: center;
      flex-direction: column;
    }
    .reviews__text {
      display: block;
    }
    .profile__verified {
      margin: 16px auto 0 auto;
      display: table;
    }

    .profile__description {
      white-space: wrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${descriptionLines};
      -webkit-box-orient: vertical;
    }

    :global(.profile__description a){
      color: ${getColor('secondary.600')};
      border-bottom-style: dotted;
      border-bottom-width: 1px;
      border-bottom-color: ${getColor('secondary.600')};
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .card-profile__header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: static;
      }
      .profile__position {
        top: 0;
        ${direction === 'rtl' ? 'right' : 'left'}: 0;
      }
      .profile__thumb {
        width: 140px;
        height: 140px;
        margin: 0;
      }
      .profile__name {
        margin-${direction === 'rtl' ? 'right' : 'left'}: 48px;
        text-align: start;
        padding-top: 0;
      }
      .profile__area {
        margin-${direction === 'rtl' ? 'right' : 'left'}: 48px;
        text-align: start;
      }
      .profile__reviews {
        justify-content: flex-start;
        flex-direction: row;
      }
      .reviews__text {
        display: inline;
      }
      .profile__verified {
        display: block;
        position: absolute;
        top: 0;
        ${direction === 'rtl' ? 'left' : 'right'}: 16px;
      }
    }
  `;

  return (
    <Box
      className={`card-profile ${className} ${handleCreateStyleClass(props)} p--relative `}
      {...allowedProps}
    >
      <Box className={`card-profile__header ${className} p--big`}>
        <Box className={`profile__thumb ${className} o--hidden p--relative`}>
          <A
            utm={utm}
            rel={externalLink && 'noopener'}
            {...googleEvent}
            to={profile.link}
            externalLink={externalLink}
            target={`${profile.link.indexOf('http') >= 0 ? '_blank' : '_self'}`}
          >
            <Image
              alt={`Thumb Author ${profile.name}`}
              src={get(profile, 'picture', `${cdnPath}themes/thumb__avatar--generic.jpg`)}
              layout="fill"
              className={`profile__image ${className} of--cover`}
            />
          </A>
        </Box>
        <Box className={`profile__info ${className} p--relative`}>
          <Badge
            hasIcon
            rounded
            size="custom"
            color="secondary.600"
            textColor={colorMode === 'dark' ? 'black' : 'white'}
            className={`profile__position ${className} fw--bold fs--big mt--small`}
          >
            {index}
          </Badge>

          <TitleCustom
            titleIsSpan
            type="h4"
            textColor="main.800"
            className={`profile__name ${className}`}
          >
            <A
              utm={utm}
              rel={externalLink && 'noopener'}
              {...googleEvent}
              to={profile.link}
              textColor="main.800"
              hoverColor="secondary.600"
              externalLink={externalLink}
              target={`${profile.link.indexOf('http') >= 0 ? '_blank' : '_self'}`}
            >
              {profile.name}
            </A>
          </TitleCustom>

          <Span
            textColor="secondary.600"
            className={`profile__area ${className} fs--x-small tt--uppercase ls--x-big lh--1-4 d--block ff--sans fw--bold`}
          >
            {profile.profession.standard}
          </Span>

          {profile.reviewer && profile.reviews.total > 1 && (
            <Paragraph textColor="main.800" className={`profile__reviews ${className} ai--center d--flex lh--1-5 mtb--normal`}>
              <Span>
                <StarsPoints
                  stars={profile.stars}
                  size={isDesktop ? 'normal' : 'small'}
                />
              </Span>
              <Span className={`reviews__text ${className} mr--normal c--main-800 fs--small`}>
                (
                {profile.reviews.total}
                {' '}
                {messages.reviews}
                )
              </Span>
            </Paragraph>
          )}
        </Box>
        {profile.verified && (
          <Badge
            hasIcon
            rounded
            size="small"
            color="lime.50"
            textColor="lime.600"
            className={`profile__verified lh--1 ${className}`}
          >
            <Icon
              inline
              size="small"
              name="badge-check"
              prefix="bxs"
              color="lime.600"
              className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
            />
            {' '}
            {messages.verifiedProfile}
          </Badge>
        )}
      </Box>
      <Box className={`card-profile__content ${className} plr--big mb--big ${isDesktop ? '' : ''}`}>
        {profile.description && (
          <div
            className={`profile__description  ${className} o--hidden c--grey-neutral-800 mb--normal ff--serif fs--normal lh--2`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: profile.description }}
          />
        )}
        {isDesktop && (
          <>
            <TitleCustom
              titleIsSpan
              type="h3"
              textColor="main.800"
              className="mt--x-big mb--medium"
            >
              {profile?.additional_details[0]?.title}
            </TitleCustom>
            <TagList
              className="mb--x-big"
              tags={profile?.additional_details[0]?.children?.map(({
                id, title
              }) => ({ key: id, label: title })
              )}
            />
          </>
        )}
      </Box>
      <ConsultInfos
        hasBackground
        hasBorder={false}
        orientation={isDesktop ? 'horizontal' : 'vertical'}
        titleType="h3"
        email={profile.email}
        telephone={profile.telephone}
        onlineService={profile.service_details?.allow_online_service}
        costPerSession={profile.service_details?.cost_per_session}
        presentialAssistance={profile.address}
        messages={{
          contact: messages.contact,
          call: messages.call,
          onlineService: messages.onlineService,
          costPerSession: messages.costPerSession,
          presentialAssistance: messages.presentialAssistance
        }}
      />

      {/* common styles */}
      {styles}
    </Box>
  );
}

CardProfile.defaultProps = {
  descriptionLines: 5,
  externalLink: false,
  googleEvent: {},
  profile: {
    picture: '',
    profession: {
      signed: '',
      standard: ''
    },
    reviews: {
      total: 0
    },
    reviewer: false,
    stars: 0,
    verified: false,
    additional_details: [],
    service_details: {
      allow_online_service: false,
      cost_per_session: '',
    },
    email: '',
    telephone: '',
    address: ''
  }
};

CardProfile.propTypes = {
  /**
  * The value of the consult
  */
  typeCard: PropTypes.oneOf(['content', 'list']),

  /**
   * The the number of lines to show on description
   */
  descriptionLines: PropTypes.number,

  /**
   * The position of this profile st, nd, rd...
   */
  index: PropTypes.number,

  /**
   * The profile data
   */
  profile: PropTypes.shape({
    description: PropTypes.array,
    link: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    profession: PropTypes.shape({
      signed: PropTypes.string,
      standard: PropTypes.string
    }),
    reviews: PropTypes.shape({
      total: PropTypes.number
    }),
    reviewer: PropTypes.bool,
    stars: PropTypes.number,
    verified: PropTypes.bool,
    additional_details: PropTypes.array,
    service_details: PropTypes.shape({
      allow_online_service: PropTypes.bool,
      cost_per_session: PropTypes.string,
    }),
    email: PropTypes.string,
    telephone: PropTypes.string,
    address: PropTypes.string
  }),

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
    presentialAssistance: PropTypes.string
  }),

  /**
   * UTM informations
   */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),

  /**
   * Informs if the google events on click
   */
  googleEvent: PropTypes.object,

  /**
   * Informs if this is a external link (out of website)
   */
  externalLink: PropTypes.bool,
};

export default CardProfile;
