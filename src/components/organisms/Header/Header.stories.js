import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import Header from './Header';
import WpBar from '../../molecules/WpBar';

import { data, anchors } from './header.mock';

const categories = data.main.filter((item) => item.type !== 'post_type');
const extraLinks = data.main.filter((item) => item.type === 'post_type');
const messages = {
  anchorsTitle: 'En este artículo',
  labelFilterButton: 'Filtrar',
  menuButtonAriaLabel: 'Menú de Navegación',
  result: 'resultado',
  results: 'resultados',
  darkModeButtonAriaLabel: 'Modo oscuro',
  searchButtonAriaLabel: 'Búsqueda',
  seeLess: 'Ver menos',
  seeMore: 'Ver más',
  userButtonAriaLabel: 'Usuario',
  subscribeNewsletter: 'Suscribirse',
  newsletter: {
    acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
    registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
    title: 'Recibe semanalmente nuestro boletín sobre paternidad',
    description: 'Inscríbebe y recibe directamente en tu correo electrónico consezjos, tips y recursos sobre salud y bienestar.',
    inputPlaceholder: 'Insere tu correo'
  }
};

export default {
  title: 'Components/Organisms/Header',
  component: Header,
  decorators: [withA11y, withNextRouter],
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
  <div style={{ marginLeft: '-1rem' }}>
    <Header
      menus={{ categories, extraLinks }}
      socialLinks={data.socialLinks}
      legalLinks={data.legalLinks}
      platformConfig={{
        name: 'lmem'
      }}
      messages={messages}
    />
  </div>
);

export const WithProgress = () => (
  <div className="container" style={{ marginLeft: '-1rem' }}>
    <Header
      hasProgress
      menus={{ categories, extraLinks }}
      pageTitle=""
      anchors={anchors}
      progressContainer="container"
      platformConfig={{
        name: 'La Mente es Maravillosa'
      }}
      messages={messages}
    />
    <h3 style={{ textAlign: 'center', margin: '5rem 0' }}>See this component on window size up 1200px</h3>
    <style jsx>
      {`
        .container {
          height: 200vh;
        }
      `}
    </style>
  </div>
);

export const WithWPBar = () => (
  <div className="container" style={{ marginLeft: '-1rem' }}>
    <WpBar
      wpLoggedIn={{
        isLogged: true,
        id: 15,
        type: 'page'
      }}
    />
    <Header
      hasProgress
      wpIsLogged
      menus={{ categories, extraLinks }}
      anchors={anchors}
      progressContainer="container"
      platformConfig={{
        name: 'Mejor con Salud'
      }}
      messages={messages}
    />
    <br />
    <br />
    <br />
    <h3 style={{ textAlign: 'center', margin: '5rem' }}>See this component on window size up 1200px</h3>
    <style jsx>
      {`
        .container {
          height: 200vh;
        }
      `}
    </style>
  </div>
);

export const WithPropsNewsletter = () => (
  <div className="container" style={{ marginLeft: '-1rem' }}>
    <Header
      showNewsletter
      menus={{ categories, extraLinks }}
      anchors={anchors}
      progressContainer="container"
      platformConfig={{
        name: 'Mejor con Salud'
      }}
      messages={messages}
    />
    <h3 style={{ textAlign: 'center', margin: '5rem' }}>See this component on window size up 1200px</h3>
    <style jsx>
      {`
        .container {
          height: 200vh;
        }
      `}
    </style>
  </div>
);
