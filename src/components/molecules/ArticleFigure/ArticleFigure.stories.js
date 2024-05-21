import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleFigure from './ArticleFigure';
import Paragraph from '../../atoms/Paragraph';

const figure = 'https://placekitten.com/g/400/400';

export default {
  title: 'Components/Molecules/ArticleFigure',
  component: ArticleFigure,
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
  <div style={{ maxWidth: '700px' }}>
    <ArticleFigure
      figure={
        {
          src: figure,
          alt: 'Children 2'
        }
      }
    />
  </div>
);

export const WithSocialSave = () => (
  <div
    style={{ maxWidth: '700px' }}
  >
    <ArticleFigure
      saveSocial={['pinterest', 'twitter']}
      figure={
        {
          src: figure,
          alt: 'Children'
        }
      }
    />
  </div>
);

export const WithFigCaption = () => (
  <div style={{ maxWidth: '700px' }}>
    <ArticleFigure
      figure={
        {
          src: figure,
          alt: 'Children',
          caption: 'Lorem ipsum dolor sit amet. Aquí entrará una leyenda en la foto'
        }
      }
    />
  </div>
);

export const MainFigureArticle = () => (
  <div
    style={{
      maxWidth: '700px', margin: '32px', padding: '16px', border: '1px dashed black'
    }}
  >
    <ArticleFigure
      mainFigure
      share
      bookmark
      figure={
        {
          src: figure,
          alt: 'Children',
          caption: 'Lorem ipsum dolor sit amet. Aquí entrará una leyenda en la foto'
        }
      }
    />
    <Paragraph>
      La primera idea o estrategia para ayudar a los niños a ser responsables es asignarles tareas sencillas. Para que la
      situación sea más fácil, puede ser conveniente que un adulto también las haga. Por ejemplo, ayudar a lavar los platos o hacer
      la colada con alguno de los progenitores es una buena manera de empezar. Será el primer paso para que adquieran autonomía: ser
      sus modelos. Pueden recoger los platos mientras uno de los progenitores los empieza a lavar. Pueden hacer lo mismo con su
      propia colada, que separen su ropa blanca de la oscura y la lleven hacia los cubos correspondientes. De esta forma,
      progresivamente, los niños pueden comenzar a adquirir responsabilidades, lo que se trasladará también al uso de la
      tecnología, hacer los deberes, gestionar mejor su tiempo (trabajos para clase, tiempo para los amigos, juegos, etc.).
    </Paragraph>
    <ArticleFigure
      saveSocial={['pinterest']}
      figure={
        {
          src: figure,
          alt: 'Children'
        }
      }
    />
  </div>
);
