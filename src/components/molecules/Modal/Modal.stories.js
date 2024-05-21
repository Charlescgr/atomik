import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Modal from './Modal';
import NewsletterBox from '../NewsletterBox';
import Button from '../../atoms/Button';

export default {
  title: 'Components/Molecules/Modal',
  component: Modal,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

const contentModal = () => (
  <NewsletterBox
    title="Recibe semanalmente nuestro boletín sobre paternidad"
    description="Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar."
    // eslint-disable-next-line no-alert
    onSubmit={(email) => alert(email)}
    list="category"
    className="newsletter-box__category p--x-big"
  />
);

export const Default = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Default Modal</Button>
      <Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationScaleFade = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Scale + Fade</Button>
      <Modal isOpen={showModal} animation="scale-fade" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationSlideFromRight = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Slide from right</Button>
      <Modal isOpen={showModal} animation="slide-right" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationSlideFromLeft = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Slide from left</Button>
      <Modal isOpen={showModal} animation="slide-left" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationSlideFromBottom = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Slide from bottom</Button>
      <Modal isOpen={showModal} animation="slide-bottom" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationSlideFromTop = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Slide from top</Button>
      <Modal isOpen={showModal} animation="slide-top" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationStickyOnTop = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Sticky on top</Button>
      <Modal isOpen={showModal} animation="sticky-top" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationStickyOnRight = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Sticky on right</Button>
      <Modal isOpen={showModal} animation="sticky-right" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationFullScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Full screen</Button>
      <Modal isOpen={showModal} animation="full-screen" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};

export const AnimationFallFromTop = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button rounded onClick={() => setShowModal(true)} color="main.800" textColor="white">Open Modal - Fall from top</Button>
      <Modal isOpen={showModal} animation="fall-top" closeModal={() => setShowModal(false)}>
        {contentModal()}
      </Modal>
    </>
  );
};
