import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import Image from '../../atoms/Image';
import Span from '../../atoms/Span';
import Box from '../../atoms/Box';

import { handleCreateStyleClass } from '../../_settings/Utils';

function SponsorBar({ onContent, sponsor, ...props }) {
  const propsBlacklist = [
    'onContent',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .sponsor-bar {
      background-color: ${sponsor.background};
    }

    .sponsor-bar__label {
      color: ${sponsor.color};
    }

    .sponsor-bar__logo {
      width: 130px;
      height: 24px;
    }

    .sponsor-bar__favicon {
      width: 24px;
      height: 24px;
    }
  `;

  return (
    <Box
      className={`sponsor-bar ${className} ${handleCreateStyleClass(props)} ${onContent ? 'p--relative' : 'p--absolute b--0 l--0'} w--100 d--flex ai--center o--75 jc--space-between p--normal zi--2`}
      {...allowedProps}
    >
      <Span
        className={`sponsor-bar__label ff--sans fs--normal ${className}`}
      >
        {sponsor.type}
      </Span>
      {sponsor.logo && (
        <Box
          className={`sponsor-bar__${sponsor.style} ${className} p--relative`}
        >
          <Image
            src={sponsor.logo}
            layout="fill"
            loadingType="none"
            lazy={false}
            objectFit="fill"
            alt={`${sponsor.type} ${sponsor.brand}`}
            className={`sponsor-bar__image ${className}`}
          />
        </Box>
      )}

      {/* common and custom styles */}
      {styles}
    </Box>
  );
}

SponsorBar.defaultProps = {
  onContent: false,
  sponsor: PropTypes.shape({
    type: 'Sponsor',
    style: 'logo',
    background: 'grey',
    color: 'black'
  })
};

SponsorBar.propTypes = {
  /**
   * Informs if the component is on content, or on header/other
   */
  onContent: PropTypes.bool,

  /**
   * Inform all data information from sponsor
   */
  sponsor: PropTypes.shape({
    brand: PropTypes.string,
    logo: PropTypes.string,
    style: PropTypes.string,
    type: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,
};

export default SponsorBar;
