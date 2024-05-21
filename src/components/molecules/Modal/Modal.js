import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

function Modal({
  isOpen, rounded, animation, closeIcon, children, closeModal, id, overlayColor, contentColor, appElement, ...props
}) {
  const propsBlacklist = [
    'size',
    'rounded',
    'animation',
    'isOpen',
    'overlayColor',
    'contentColor',
    'closeIcon',
    'closeModal',
    'className',
    'appElement'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const [showModal, setShowModal] = useState(false);
  const { theme, getColor, colorMode } = useTheme();
  const isAmp = useAmp();

  useEffect(() => {
    setShowModal(isOpen);
    return () => {};
  }, [isOpen]);

  const mediaStyles = css.resolve`
    @media only screen and (min-width : 500px) {
      .modal-size {
        max-width: 70%;
      }
    }
    @media only screen and (min-width: 700px) {
      .modal-size.is--small{
        width: 480px;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .modal-size {
      width: 100%;
      height: auto;
      overflow-x: auto;
    }
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;

      visibility: hidden;
      backface-visibility: hidden;
      transform: translateX(-50%) translateY(-50%);
      z-index: 11; // this is an exception, there's no class-helper for this style
    }
    .modal--show{
      visibility: visible;
    }
    .modal__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
      oopacity: 0;
      background: rgba(${hexToRgb(getColor(overlayColor))}, 0.75);
      visibility: hidden;
    }
    .modal__overlay.fade{
      animation-duration:0.25s;
    }
    .modal__content {
      box-shadow: ${theme.shadows.default};
      background-color: ${colorMode === 'dark' ? getColor('grey-neutral.200') : getColor(contentColor)};
    }
    .modal--show.modal__content,
    .modal--show.modal__overlay{
      visibility: visible;
    }

    // Fade and scale
    .scale-fade .modal__content {
      transform: scale(0.7);
      opacity: 0;
      transition: all 0.3s;
    }
    .modal--show.scale-fade .modal__content {
      transform: scale(1);
      opacity: 1;
    }

    // Slide from the right
    .slide-right .modal__content {
      transform: translateX(20%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    }
    .modal--show.slide-right .modal__content {
      transform: translateX(0);
      opacity: 1;
    }

    // Slide from the left
    .slide-left .modal__content {
      transform: translateX(-20%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    }
    .modal--show.slide-left .modal__content {
      transform: translateX(0);
      opacity: 1;
    }

    // Slide from the bottom
    .slide-bottom .modal__content {
      transform: translateY(20%);
      opacity: 0;
      transition: all 0.3s;
    }
    .modal--show.slide-bottom .modal__content {
      transform: translateY(0);
      opacity: 1;
    }

    // Slide from the top
    .slide-top .modal__content {
      transform: translateY(-20%);
      opacity: 0;
      transition: all 0.3s;
    }
    .modal--show.slide-top .modal__content {
      transform: translateY(0);
      opacity: 1;
    }

    // Sticky on top
    .sticky-top{
      top: 0;
      transform: translateX(-50%);
    }
    .sticky-top .modal__content {
      transform: translateY(-200%);
      transition: all .3s;
      opacity: 0;
    }
    .modal--show.sticky-top .modal__content {
      transform: translateY(0%);
      border-radius: 0 0 3px 3px;
      opacity: 1;
    }

    // Sticky on right
    .sticky-right{
      right: 0;
      transform: translateY(-50%);
    }
    .sticky-right .modal__content {
      transform: translateX(200%);
      transition: all .3s;
      opacity: 0;
    }
    .modal--show.sticky-right .modal__content {
      transform: translateX(0%);
      border-radius: 3px 0 0 3px;
      opacity: 1;
    }

    // Full screen
    .full-screen .modal__content {
      transform: scale(0.8);
      opacity: 0;
      transition: all 0.3s;
      background: rgba(255,255,255, 0.9);
    }
    .modal--show.full-screen + .modal__overlay {
      background: rgba(255,255,255, 0.9);
    }
    .full-screen .modal__content {
      background: transparent;
      box-shadow: none;
    }
    .modal--show.full-screen .modal__content {
      transform: scale(1);
      opacity: 1;
    }

    // Fall from top
    .fall-top .modal__content {
      transform: scale(2);
      opacity: 0;
      transition: all 0.3s;
    }
    .modal--show.fall-top .modal__content {
      transform: scale(1);
      opacity: 1;
    }
  `;

  return (
    <>
      <Box
        className={`modal__group ${className} ${mediaStyles.className} zi--11`}
        {...allowedProps}
      >
        <Box id={`modal-${id}`} className={`modal modal-size ${className} ${mediaStyles.className} ${animation} ${showModal} ${showModal ? 'modal--show' : ''} ${handleCreateStyleClass(props)}`}>
          <Box className={`modal__content ${className} ${mediaStyles.className} mlr--auto mtb--0 p--relative zi--11`}>
            {closeIcon && (
              <Button
                className={`modal__button ${className} ${mediaStyles.className} p--absolute t--0 r--0`}
                onClick={closeModal}
                onlyIcon
              >
                <Icon name="x" color={colorMode === 'dark' ? 'white' : 'black'} />
              </Button>
            )}
            {children}
          </Box>
        </Box>
        <Box id={`modal__overlay-${id}`} className={`modal__overlay ${className} ${mediaStyles.className} ${showModal ? 'modal--show fade' : ''} zi--10`} onClick={closeModal}></Box>
      </Box>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </>
  );
}

Modal.defaultProps = {
  animation: '',
  closeIcon: true,
  isOpen: false,
  contentColor: 'white',
  overlayColor: 'black',
  appElement: '#root'
};

Modal.propTypes = {
  /**
   * Element root to modal
   */
  appElement: PropTypes.string,

  /**
   * The modal animation
   */
  animation: PropTypes.string,

  /**
   * The content of the modal
   */
  children: PropTypes.any.isRequired,

  /**
   * Show or hide the close icon
   */
  closeIcon: PropTypes.bool,

  /**
   * Informs if the modal is loading open or not
   */
  isOpen: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Function to return state close
   */
  closeModal: PropTypes.func,

  /**
   * Background color of modal
   */
  contentColor: PropTypes.string,

  /**
   * Overlay background color
   */
  overlayColor: PropTypes.string,

  /**
   * If the content has border radius
   */
  rounded: PropTypes.bool,

  /**
   * Id for modal
   */
  id: PropTypes.string,

  /**
   * The size of the modal content
   */
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'big']),
};

export default Modal;
