import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Message from './Message';
import Paragraph from '../../atoms/Paragraph';

export default {
  title: 'Components/Molecules/Message',
  component: Message,
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

export const Default = () => (
  <Message
    iconName="help-circle"
  >
    Puedes descargar una copia de tu información en cualquier momento. Puedes recibir esta copia en un formato JSON, lo que te permitirá importarla más fácilmente a través de otro servicio.
  </Message>
);

export const WithProps = () => (
  <Message
    iconName="help-circle"
    iconSize="medium"
    textColor="white"
    color="red.500"
    className="mtb--big"
  >
    Puedes descargar una copia de tu información en cualquier momento. Puedes recibir esta copia en un formato JSON, lo que te permitirá importarla más fácilmente a través de otro servicio.
  </Message>
);

export const WtithCustomChildren = () => (
  <Message
    iconName="help-circle"
    iconSize="x-big"
    iconPosition="center"
    textColor="white"
    color="orange.500"
    className="mtb--big"
  >
    <Paragraph className="ff--sans lh--1-4 ptb--normal c--white">Puedes descargar una copia de tu información en cualquier momento. Puedes recibir esta copia en un formato JSON, lo que te permitirá importarla más fácilmente a través de otro servicio.</Paragraph>
    <Paragraph className="ff--sans lh--1-4 ptb--normal c--white">La descarga de tu información es un proceso protegido por contraseña, al que solo tú tienes acceso. Después de crear un archivo, este estará disponible para descarga durante tres días</Paragraph>
  </Message>
);
