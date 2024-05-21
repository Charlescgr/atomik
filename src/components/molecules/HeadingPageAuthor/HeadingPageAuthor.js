import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';
import Badge from '../../atoms/Badge';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Divider from '../../atoms/Divider';
import Container from '../../atoms/Container';
import Paragraph from '../../atoms/Paragraph';

import StarsPoints from '../StarsPoints';

function HeadingPageAuthor({
  about, hasContact, messages, brandWeek, lazy, ...props
}) {
  // -- hook
  const { isDesktop } = useDeviceScreen();

  // -- theme
  const {
    theme, direction, colorMode, getColor
  } = useTheme();

  // -- allowedProps
  const propsBlacklist = [
    'about',
    'messages',
    'brandWeek',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  const positionStyles = () => {
    let style = '';
    if (isDesktop) {
      if (direction === 'rtl') {
        style = 'l--0';
      } else {
        style = 'r--0';
      }
    }
    return style;
  };

  // -- styles
  const { className, styles } = css.resolve`
    .header-author__thumb{
      min-width: 200px;
      height: 200px;
    }
    :global(.header-author__description a){
      color: ${getColor('secondary.600')};
      border-bottom-style: dotted;
      border-bottom-width: 1px;
      border-bottom-color: ${getColor('secondary.600')};
    }
    .header-author__reviews {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    @media only screen and (min-width: ${theme.medias.tablet}) {
      .header-author__reviews {
        align-items: center;
        flex-direction: row;
      }
    }
  `;

  return (
    <Box
      className={`header-author ${className} bc--main-50 ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Container wrap brandWeek={brandWeek} className={`p--big ${isDesktop ? 'd--flex' : 'd--block'} ${direction === 'rtl' ? 'fd--row' : ''}`}>
        <Box className={`header-author__thumb ${className} br--50 o--hidden d--table ${isDesktop ? `m${direction === 'rtl' ? 'l' : 'r'}--x-big` : 'mlr--auto'}`}>
          <Image
            src={about.picture}
            alt={`Thumb Author ${about.name}`}
            className={`header-author__image  ${className} of--cover`}
            lazy={lazy}
            loadingType={'background'}
            layout={'responsive'}
            width={200}
            height={200}
          />
        </Box>
        <Box className="header-author__content p--relative d--table w--100">
          <Heading textColor="main.800" className={`${isDesktop ? 'ta--left' : 'ta--center'} mtb--normal`}>{about.name}</Heading>
          <Box className={`header-author__seals ${className} ${positionStyles()} ${isDesktop ? 'p--absolute t--0 mt--big ' : ''}d--flex ai--center jc--center`}>
            {about.verifiedProfile && (
              <Badge
                hasIcon
                rounded
                size="small"
                color="lime.600"
                textColor={colorMode === 'dark' ? 'lime.200' : 'white'}
                className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
              >
                <Icon
                  inline
                  size="small"
                  name="badge-check"
                  prefix="bxs"
                  color="white"
                  className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
                />
                {' '}
                {messages.verifiedProfile}
              </Badge>
            )}
            {about.medicTeam && (
              <Badge
                hasIcon
                rounded
                size="small"
                color="red.700"
                textColor={colorMode === 'dark' ? 'red.200' : 'white'}
              >
                <Icon
                  inline
                  size="small"
                  name="user-check"
                  prefix="bx"
                  color="white"
                  className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
                />
                {' '}
                {messages.medicTeam}
              </Badge>
            )}
          </Box>

          {messages.collegiate && (
            <Divider color="main.100" />
          )}

          <Box className={`${className} d--flex ai--center ${isDesktop ? 'fd--row jc--space-between ai--center' : 'fd--column'}`}>
            <Paragraph textColor="main.800" className="ff--sans fs--normal lh--1-5 mtb--small">
              <strong className="c--main-400 ff--sans fs--medium lh--1-5">{about.expertise}</strong>
              {' '}
              {messages.collegiate && (
                <>
                  •
                </>
              )}
              {' '}
              {messages.collegiate}
              {' '}
              {about.collegiateNumber}
            </Paragraph>
            {about.totalReviews > 1 && (
              <Paragraph textColor="main.800" className={`header-author__reviews ${className} lh--1-5`}>
                <Span><StarsPoints stars={about.stars} /></Span>
                {about?.totalReviews && (
                  <Span className={`reviews__text ${className} mr--normal c--main-800 fs--small`}>
                    (
                    {about.totalReviews}
                    {' '}
                    {messages.reviews}
                    )
                  </Span>
                )}
              </Paragraph>
            )}
          </Box>

          <Divider color="main.100" />

          <Paragraph textColor="main.800" className={`header-author__description ${className}`} dangerouslySetInnerHTML={{ __html: about.bio }} />

          {hasContact && (
            <Box className={`d--flex ai--center ${isDesktop ? 'jc--flex-start' : 'jc--center'} mt--normal`}>
              {messages.scheduleConsult?.label && (
                <Button hasIcon rounded onClick={() => handleClick(messages.scheduleConsult.url)} textColor="white" color="main.800" size="normal" className={`fw--bold m${direction === 'rtl' ? 'l' : 'r'}--small`}>
                  <Icon inline color="white" size="normal" prefix="bx" name="calendar-check" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
                  {' '}
                  {messages.scheduleConsult.label}
                </Button>
              )}
              {messages.contact?.label && (
                <Button hasIcon rounded onClick={() => handleClick(messages.contact.url)} textColor="white" color="blue.600" size="normal" className="fw--bold ml--small">
                  <Icon inline color="white" size="normal" prefix="bxs" name="chat" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
                  {' '}
                  {messages.contact.label}
                </Button>
              )}
            </Box>
          )}

          {about.social_profiles && (
            <Box className={`d--flex ai--center ${isDesktop ? 'jc--flex-start' : 'jc--center'} mt--normal fw--wrap`}>
              {
                Object.keys(about.social_profiles).map((network) => about.social_profiles[network] && (
                  <A
                    key={network}
                    textColor="white"
                    target="_blank"
                    color={network === 'url' ? 'grey-neutral.500' : network}
                    className={`p--normal br--small bc--${network} m${direction === 'rtl' ? 'l' : 'r'}--normal`}
                    to={about.social_profiles[network]}
                    externalLink
                  >
                    <Icon
                      inline
                      color="white"
                      size="normal"
                      prefix={network === 'url' ? 'bx' : 'bxl'}
                      name={network === 'url' ? 'link' : network}
                    />
                  </A>
                ))
              }
            </Box>
          )}

        </Box>

      </Container>

      {/* custom styles */}
      {styles}
    </Box>
  );
}

HeadingPageAuthor.defaultProps = {
  brandWeek: false,
  hasContact: false,
  lazy: true
};

HeadingPageAuthor.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Informs if this card is used on a page with brandWeek ADS
   */
  brandWeek: PropTypes.bool,

  /**
   * The profile object (array of objects)
   */
  about: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    bio: PropTypes.string,
    expertise: PropTypes.string,
    stars: PropTypes.number,
    collegiateNumber: PropTypes.string,
    totalReviews: PropTypes.number,
    verifiedProfile: PropTypes.bool,
    social_profiles: PropTypes.shape({
      twitter: PropTypes.string,
      facebook: PropTypes.string,
      linkedin: PropTypes.string,
      instagram: PropTypes.string,
      url: PropTypes.string,
      pinterest: PropTypes.string,
      youtube: PropTypes.string
    }),
    medicTeam: PropTypes.bool,
  }).isRequired,

  /**
   * Content texts
   */
  messages: PropTypes.shape({
    verifiedProfile: PropTypes.string,
    medicTeam: PropTypes.string,
    collegiate: PropTypes.string,
    reviews: PropTypes.string,
    scheduleConsult: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }),
    contact: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  }),

  /**
   * should show the contact button
   */
  hasContact: PropTypes.bool,

  /**
   * The use lazy loading
   */
  lazy: PropTypes.bool
};

export default HeadingPageAuthor;
