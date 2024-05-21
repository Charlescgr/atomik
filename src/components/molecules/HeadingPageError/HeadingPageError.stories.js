/* eslint-disable no-alert */
import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import HeadingPageError from './HeadingPageError';
import TitleCustom from '../TitleCustom';
import Paragraph from '../../atoms/Paragraph';
import Heading from '../../atoms/Heading';
import A from '../../atoms/A';

export default {
  title: 'Components/Molecules/HeadingPageError',
  component: HeadingPageError,
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
  const handleQuery = (v) => {
    // eslint-disable-next-line no-console
    console.log(v);
  };
  return (
    <HeadingPageError
      error={{
        number: '500',
        text: 'ERROR DE SERVIDOR'
      }}
      returnQuery={(v) => handleQuery(v)}
    >
      <Heading
        type="h1"
        textColor="main.800"
        className="mtb--small"
      >
        ¡Lo sentimos!
      </Heading>
      <TitleCustom
        titleIsSpan
        type="h3"
        textColor="main.800"
        className="mtb--small"
      >
        Disculpa los inconvenientes, pero la página no se encuentra disponible en este momento.
      </TitleCustom>
      <Paragraph textColor="main.800" size="normal" className="mtb--small">
        Estamos trabajando para solucionar el problema lo más pronto posible. Mientras tanto, te recomendamos volver a la
        {' '}
        <A
          to="/"
          textColor="main.400"
          underlineColor="main.400"
          lineType="dotted"
        >
          página de inicio
        </A>
        ,
        {' '}
        usar el buscador o echarle un vistazo a los artículos que tenemos para ti.
      </Paragraph>
    </HeadingPageError>
  );
};

export const Error404 = () => {
  const handleQuery = (v) => {
    // eslint-disable-next-line no-console
    console.log(v);
  };
  return (
    <HeadingPageError
      error={{
        number: '404',
        text: 'PÁGINA NO ENCONTRADA'
      }}
      returnQuery={(v) => handleQuery(v)}
    >
      <Heading
        type="h1"
        textColor="main.800"
        className="mtb--small"
      >
        ¡Lo sentimos!
      </Heading>
      <TitleCustom
        titleIsSpan
        type="h3"
        textColor="main.800"
        className="mtb--small"
      >
        Disculpa los inconvenientes, pero la página ya no existe o no se encuentra disponible en este momento.
      </TitleCustom>
      <Paragraph textColor="main.800" size="normal" className="mtb--small">
        Puedes volver a la
        {' '}
        <A
          to="/"
          textColor="main.400"
          underlineColor="main.400"
          lineType="dotted"
        >
          página de inicio
        </A>
        ,
        {' '}
        usar el buscador o echarle un vistazo a los artículos que tenemos para ti.
      </Paragraph>
    </HeadingPageError>
  );
};
