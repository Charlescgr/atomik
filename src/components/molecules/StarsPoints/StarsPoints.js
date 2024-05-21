import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../atoms/Icon';

function StarsPoints({
  size, stars
}) {
  // -- scripts
  const showStars = (result) => {
    const starsIcons = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 6; i++) {
      if (result >= i) {
        starsIcons.push(<Icon key={i} name="star" prefix="bxs" size={size} color="yellow.600" className={`mr--${size}`} />);
      } else if (i === Math.ceil(result)) {
        starsIcons.push(<Icon key={i} name="star-half" prefix="bxs" size={size} color="yellow.600" className={`mr--${size}`} />);
      } else {
        starsIcons.push(<Icon key={i} name="star" prefix="bx" size={size} color="yellow.600" className={`mr--${size}`} />);
      }
    }// for
    return starsIcons;
  };

  const calcStars = (obj) => {
    const average = (obj.veracity + obj.communicatibility + obj.punctuality) / 3;
    const roundAvarage = (Math.round(average * 2) / 2).toFixed(1);
    return showStars(roundAvarage);
  };

  return (
    <>
      { typeof stars === 'object' ? calcStars(stars) : showStars(stars) }
    </>
  );
}

StarsPoints.defaultProps = {
  size: 'normal',
};

StarsPoints.propTypes = {
  /**
   * The size of stars
   */
  size: PropTypes.string,

  /**
   * The object or string stars
   */
  stars: PropTypes.any
};

export default StarsPoints;
