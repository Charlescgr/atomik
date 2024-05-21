/* eslint-disable no-alert */
import React from 'react';
import NewsletterBox from './NewsletterBox';

export default {
  title: 'Components/Molecules/NewsletterBox',
  component: NewsletterBox,
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

export const Default = () => (
  <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
    <NewsletterBox onSubmit={(email) => alert(email)} />
  </div>
);

export const WithProps = () => (
  <div style={{ maxWidth: '1024px' }} className="m--big">
    <NewsletterBox
      mainNewsletter
      withImage
      title="Recibe semanalmente nuestro boletín sobre paternidad"
      description="Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar."
      list="general"
      onSubmit={(email) => alert(email)}
    />
  </div>
);

export const WithCustomImage = () => (
  <div style={{ maxWidth: '900px' }} className="m--big">
    <NewsletterBox
      withImage
      customImage={{
        path: '',
        src: 'icon_192x192.svg',
        width: '250px',
        height: 'auto'
      }}
      title="Recibe semanalmente nuestro boletín sobre paternidad"
      description="Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar."
      list="general"
      onSubmit={(email) => alert(email)}
    />
  </div>
);

export const WithoutLateralSpace = () => (
  <div style={{ maxWidth: '300px' }} className="m--big">
    <NewsletterBox
      noLateralSpace
      withImage
      title="Recibe semanalmente nuestro boletín sobre paternidad"
      description="Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar."
      list="general"
      onSubmit={(email) => alert(email)}
      className="bc--main-50"
    />
  </div>
);
