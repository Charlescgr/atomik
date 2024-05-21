import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import CardArticle from './CardArticle';
import logo from '../../../../example/public/img/storybook_examples/icon__em.svg';

const figure1 = 'https://placekitten.com/g/400/400';
const figure2 = 'https://placekitten.com/g/450/450';
const figure3 = 'https://placekitten.com/g/500/500';

export default {
  title: 'Components/Molecules/CardArticle',
  component: CardArticle,
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
  <div style={{ maxWidth: '312px' }}>
    <CardArticle
      bookmark
      title="¿Cómo actuar cuando un niño golpea a su hermano?"
      category="5 juguetes Montessori para niños"
      figure={
        {
          src: figure1,
          alt: '¿Cómo actuar cuando un niño golpea a su hermano?',
          caption: '¿Cómo actuar cuando un niño golpea a su hermano?',
          lazy: false
        }
      }
      description="Para un padre siempre es duro observar cómo su hijo agrede a otras personas. Pero el impacto es mayor cuando..."
      url="/single"
      className="m--x-big"
    />
  </div>
);

export const Small = () => (
  <div style={{ maxWidth: '312px' }}>
    <CardArticle
      bookmark
      title="¿Cómo actuar cuando un niño golpea?"
      figure={
        {
          src: figure2,
          alt: '¿Cómo actuar cuando un niño golpea?',
          caption: '¿Cómo actuar cuando un niño golpea?',
          lazy: false
        }
      }
      small
      url="/single"
      className="m--x-big"
    />
  </div>
);

export const SmallWithTitleSize = () => (
  <div style={{ maxWidth: '312px' }}>
    <CardArticle
      bookmark
      title="¿Cómo actuar cuando un niño golpea?"
      figure={
        {
          src: figure2,
          alt: '¿Cómo actuar cuando un niño golpea?',
          caption: '¿Cómo actuar cuando un niño golpea?',
          lazy: false
        }
      }
      small
      titleSize="small"
      url="/single"
      className="m--x-big"
    />
  </div>
);

export const Horizontal = () => (
  <div style={{ maxWidth: '655px' }}>
    <CardArticle
      bookmark
      title="¿Cómo actuar cuando un niño golpea a su hermano?"
      category="Dificultades de apego en los niños"
      figure={
        {
          src: figure3,
          alt: '¿Cómo actuar cuando un niño golpea a su hermano?',
          caption: '¿Cómo actuar cuando un niño golpea a su hermano?',
          lazy: false
        }
      }
      description="Al hablar de dificultades de apego, solemos hacer referencia a problemas en el establecimiento del lazo emocional entre un niño…"
      horizontal
      url="/single"
      className="m--x-big"
    />
  </div>
);

export const HorizontalSmallImg = () => (
  <div style={{ maxWidth: '655px' }}>
    <CardArticle
      bookmark
      horizontalSmallImg
      title="¿Cómo actuar cuando un niño golpea a su hermano?"
      figure={
        {
          src: figure3,
          alt: '¿Cómo actuar cuando un niño golpea a su hermano?',
          caption: '¿Cómo actuar cuando un niño golpea a su hermano?',
          lazy: false
        }
      }
      description="Al hablar de dificultades de apego, solemos hacer referencia a problemas en el establecimiento del lazo emocional…"
      horizontal
      url="/single"
      className="m--x-big"
    />
  </div>
);

export const Course = () => (
  <div style={{ maxWidth: '655px' }}>
    <CardArticle
      bookmark
      title="Aprendiendo a ser buenos padres"
      figure={
        {
          src: figure1,
          alt: 'Aprendiendo a ser buenos padres',
          caption: 'Aprendiendo a ser buenos padres',
          lazy: false
        }
      }
      description="Educar es un reto para padres y educadores. Saber intuir necesidades, gestionar..."
      course={{
        price: '45€',
        oldPrice: '90€',
      }}
      externalLink
      url="https://lamenteesmaravillosa.com/curso/curso-introduccion-al-coaching-educativo/"
      className="m--x-big"
    />
  </div>
);

export const ExternalAndResponsive = () => (
  <div style={{ maxWidth: '730px' }}>
    <CardArticle
      bookmark
      title="Juegos para pasar un día de verano en casa"
      figure={
        {
          src: figure1,
          alt: 'Juegos para pasar un día de verano en casa',
          caption: 'Juegos para pasar un día de verano en casa',
          lazy: false
        }
      }
      description="¿Quieres conocer algunos juegos divertidos para pasar un día de verano en casa? Presta atención a este..."
      source={{ via: 'Eres Mamá', logo }}
      url="https://eresmama.com/15-nombres-nina-nino-inspirados-astronomia/"
      responsive
      externalLink
    />
  </div>
);
