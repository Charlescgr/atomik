import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Editorial from './Editorial';

export default {
  title: 'Components/Molecules/Editorial',
  component: Editorial,
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

export const Default = () => {
  const editorial = [
    {
      ID: 1000,
      type: 'intro',
      title: 'Comprometidos con tu salud y bienestar',
      text: 'Trabajamos arduamente para brindarte los mejores contenidos sobre salud y bienestar actualizados, precisos y revisados por un equipo médico para que puedas mejorar tu salud.'
    },
    {
      ID: 1001,
      title: 'Compromiso editorial',
      text: 'Nuestros artículos cumplen altos estándares editoriales, citando investigaciones recientes y relevantes.'
    }, {
      ID: 1002,
      title: 'Revisado por expertos',
      text: 'Nuestros artículos son revisados por médicos, enfermeras, dientistas, entrenadores personales y otros expertos calificados. <strong>Conozca a nuestro equipo de expertos.</strong>'
    }, {
      ID: 1003,
      title: 'Verificación de hechos',
      text: 'La precisión es nuestra máxima prioridad. Nuestros artículos son verificados y actualizados constantemente.'
    }
  ];
  return (
    <Editorial
      content={editorial}
    />
  );
};
