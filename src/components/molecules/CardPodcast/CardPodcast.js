/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import { useAmp } from 'next/amp';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function CardPodcast({
  figure,
  title,
  time,
  url,
  externalLink,
  messages,
  ...props
}) {
  const { theme, direction } = useTheme();
  const isAmp = useAmp();

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .podcast__thumb {
        height: 200px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .podcast__play {
      line-height: 0;
      z-index: 1
    }

    .podcast__thumb {
      height: 200px;
    }

    @media only screen and (min-width: ${theme.medias.mobile}){
      .podcast__thumb {
        height: 300px;
      }
    }

  `;

  return (
    <Box className={`podcast-box ${className} ${mediaStyles.className} mb--small ${handleCreateStyleClass(props)}`}>
      <Span textColor="secondary.600" className="ff--sans fs--x-small fw--bold tt--uppercase">
        podcast
        {' '}
        <strong className="c--main-600">
          |
        </strong>
        <strong className="c--grey-cold-500">
          {' '}
          {time}
          {' '}
          min.
        </strong>
      </Span>
      <Heading type="h4" textColor="main.600" className="mb--normal">{title}</Heading>
      <A to={url} className="p--relative d--inline-block d--flex ai--center jc--center">
        <span className={`podcast__play ${className} ${mediaStyles.className} bc--secondary-600 br--50 d--inline-block p--absolute`}>
          <Icon name="play-circle" color="white" size="medium" className="m--normal" />
        </span>
        <Box className={`podcast__thumb ${className} ${mediaStyles.className} w--100`}>
          <Image
            className="of--cover w--100 h--100 brb--small"
            loadingType={'background'}
            objectFit={'cover'}
            layout={'fill'}
            lazy
            {...figure}
          />
        </Box>
      </A>
      <Button withAnimation hasIcon rounded color="secondary.600" textColor="white" className="mt--big mlr--auto">
        <Icon inline prefix="bxs" name="playlist" color="white" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
        {messages.explorePodcasts}
      </Button>
      {/* common and custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

CardPodcast.defaultProps = {
  externalLink: false,
  messages: {
    explorePodcasts: 'Explorar Podcasts'
  },
};

CardPodcast.propTypes = {
  /**
   * The title of the post
   */
  title: PropTypes.string.isRequired,

  /**
   * The time of the podcast
   */
  time: PropTypes.number.isRequired,

  /**
   * Informs if this is a external link (out of website)
   */
  externalLink: PropTypes.bool,

  messages: PropTypes.shape({
    explorePodcasts: PropTypes.string.isRequired
  }),

  /**
   * The url from podcast
   */
  url: PropTypes.string.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Image properties
   */
  figure: PropTypes.object,

};

export default CardPodcast;
