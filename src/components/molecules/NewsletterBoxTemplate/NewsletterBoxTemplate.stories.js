/* eslint-disable no-alert */
import React from 'react';
import NewsletterBoxTemplate from './NewsletterBoxTemplate';

export default {
  title: 'Components/Molecules/NewsletterBoxTemplate',
  component: NewsletterBoxTemplate,
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
  <div style={{ maxWidth: '301px' }} className="mtb--big mlr--auto">
    <NewsletterBoxTemplate
      noLateralSpace={false}
      withImage
      directionRender="vertical"
      onSubmit={(val) => alert(val)}
      list={[
        { id: 1, label: 'Salud' },
        { id: 2, label: 'Maternidad' },
        { id: 3, label: 'Remedios Naturales' },
        { id: 4, label: 'Bienstar' },
        { id: 5, label: 'Psicología' },
        { id: 6, label: 'Relaciones' },
        { id: 7, label: 'Cultura' }
      ]}
      messages={{
        title: '¡Suscríbete a nuestra newsletter!',
        description: 'Selecciona entre las 6 categorías de las que te gustaría recibir artículos.',
        buttonTextFull: 'Suscribierse ahora',
        buttonTextCompact: 'Suscribierse',
        acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
        registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
        inputPlaceholderText: 'Tu nombre (opcional)',
        inputPlaceholderEmail: 'Insere tu correo'
      }}
    />
  </div>
);

export const Horizontal = () => (
  <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
    <NewsletterBoxTemplate
      noLateralSpace={false}
      withImage={false}
      directionRender="horizontal"
      onSubmit={(val) => alert(val)}
      list={[
        { id: 1, label: 'Salud' },
        { id: 2, label: 'Maternidad' },
        { id: 3, label: 'Remedios Naturales' },
        { id: 4, label: 'Bienstar' },
        { id: 5, label: 'Psicología' },
        { id: 6, label: 'Relaciones' },
        { id: 7, label: 'Cultura' }
      ]}
      messages={{
        title: '¡Suscríbete a nuestra newsletter!',
        description: 'Selecciona entre las 6 categorías de las que te gustaría recibir artículos.',
        buttonTextFull: 'Suscribierse ahora',
        buttonTextCompact: 'Suscribierse',
        acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
        registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
        inputPlaceholderText: 'Tu nombre (opcional)',
        inputPlaceholderEmail: 'Insere tu correo'
      }}
    />
  </div>
);

export const HorizontalWithImage = () => (
  <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
    <NewsletterBoxTemplate
      noLateralSpace={false}
      withImage
      directionRender="horizontal"
      onSubmit={(val) => alert(val)}
      list={[
        { id: 1, label: 'Salud' },
        { id: 2, label: 'Maternidad' },
        { id: 3, label: 'Remedios' },
        { id: 4, label: 'Bienstar' },
        { id: 5, label: 'Psicología' },
        { id: 6, label: 'Relaciones' }
      ]}
      messages={{
        title: '¡Suscríbete a nuestra newsletter!',
        description: 'Selecciona entre las 6 categorías de las que te gustaría recibir artículos.',
        buttonTextFull: 'Suscribierse ahora',
        buttonTextCompact: 'Suscribierse',
        acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
        registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
        inputPlaceholderText: 'Tu nombre (opcional)',
        inputPlaceholderEmail: 'Insere tu correo'
      }}
    />
  </div>
);
