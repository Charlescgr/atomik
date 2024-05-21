import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { gsap } from 'gsap';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import LoadingBars from '../LoadingBars';

function PageTransition({
  transitionState, ...props
}) {
  useEffect(() => {
    if (transitionState) {
      gsap.timeline({ onComplete: () => gsap.to('#page-transition', { visibility: 'hidden' }) })
        .fromTo('#page-transition',
          {
            opacity: 1
          }, {
            opacity: 0, duration: 0.25, ease: 'power4.in'
          }
        );
    } else {
      gsap.timeline({ onStart: () => gsap.to('#page-transition', { visibility: 'visible' }) })
        .fromTo('#page-transition',
          {
            opacity: 0
          }, {
            opacity: 1, duration: 0.25, ease: 'power4.out'
          }
        );
    }
  }, [transitionState]);

  const propsBlacklist = ['className'];
  const allowedProps = omit(props, propsBlacklist);
  const { colorMode } = useTheme();
  const { className, styles } = css.resolve`
    html,
    body {
      overflow: hidden;
    }

    .page-transition {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(${colorMode === 'dark' ? '0, 0, 0' : '255, 255, 255'}, 0.6);
      z-index: 99;
      transtion: all 800ms ease-in-out;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  return (
    <Box
      id="page-transition"
      className={`${className} page-transition ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <LoadingBars colorName="secondary" />
      {/* common styles */}
      {styles}
    </Box>
  );
}

PageTransition.propTypes = {
  /**
   * Transition State Animation
   */
  transitionState: PropTypes.bool.isRequired,
};

export default PageTransition;
