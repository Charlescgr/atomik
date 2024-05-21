/* eslint-disable no-alert */
import React from 'react';
import ExcerptImage from './ExcerptImage';

export default {
  title: 'Components/Organisms/ExcerptImage',
  component: ExcerptImage,
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
    <ExcerptImage
      color="main.400"
      content="<p>¿Cómo podemos diseñar una educación que tenga como resultado niños más responsables?&nbsp;<strong>En este artículo compartimos</strong>
            &nbsp;algunas&nbsp;<a href='#' title='...'>estrategias que aumentan la probabilidad de</a>&nbsp;éxito para este objetivo. Sin embargo, para lograrlo
            es importante comenzar poco a poco. Las siguientes propuestas, pueden ser muy útiles para conseguirlo.</p>"
      figure={
        {
          src: '../img/storybook_examples/image__post_01.jpg',
          alt: 'Children',
          width: 720,
          height: 230,
          lazy: false,
          loadingType: 'background',
          layout: 'responsive'
        }
      }
    />
  </div>
);

export const WithPropsAndBookmarks = () => (
  <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
    <ExcerptImage
      color="red.400"
      content="<p>¿Cómo resultado niños más responsables?&nbsp;<strong>En este artículo compartimos</strong>
            &nbsp;algunas&nbsp;<a href='#' title='...'>estrategias que aumentan la probabilidad de</a>&nbsp;éxito para este objetivo. Sin embargo, para lograrlo
            es importante comenzar poco a poco.</p>"
      figure={
        {
          src: '../img/storybook_examples/image__post_01.jpg',
          alt: 'Children',
          caption: 'Para ayudarnos con esta empresa contamos con la disciplina positiva, un concepto que recoge',
          width: 720,
          height: 230,
          lazy: false,
          loadingType: 'background',
          layout: 'responsive'
        }
      }
      fullWidth
      share
      bookmark
    />
  </div>
);

export const WithPropsSocial = () => (
  <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
    <ExcerptImage
      color="green.300"
      content="<p>¿Cómo podemos diseñar una educación que tenga como resultado niños más responsables?&nbsp;<strong>En este artículo compartimos</strong>
            &nbsp;algunas&nbsp;<a href='#' title='...'>estrategias que aumentan la probabilidad de</a>&nbsp;éxito.</p>"
      figure={
        {
          src: '../img/storybook_examples/image__post_01.jpg',
          alt: 'Children',
          caption: 'Para ayudarnos con esta empresa contamos con la disciplina positiva, un concepto que recoge',
          width: 720,
          height: 230,
          lazy: false,
          loadingType: 'background',
          layout: 'responsive'
        }
      }
      saveSocial={['twitter', 'facebook', 'pinterest']}
    />
  </div>
);
