import React from 'react';
import PropTypes from 'prop-types';

export const Thumb = ({
  selected, onClick, imgSrc, alt
}) => (
  <div
    className={`embla__slide embla__slide--thumb ${
      selected ? 'is-selected' : ''
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb"
      type="button"
    >
      <img className="embla__slide__thumbnail" src={imgSrc} alt={alt} />
    </button>
  </div>
);

Thumb.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
