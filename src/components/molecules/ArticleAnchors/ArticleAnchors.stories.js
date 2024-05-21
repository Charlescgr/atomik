import React, { useRef } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ArticleAnchors from './ArticleAnchors';

export default {
  title: 'Components/Molecules/ArticleAnchors',
  component: ArticleAnchors,
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

const articles = {
  test: {
    titleMain: {
      title: '5 consejos para ayudar a los niños a ser responsables',
      ref: 'refTitleMain'
    },
    title01: {
      title: 'Asignarles tareas sencillas',
      ref: 'refTitle01'
    },
    title02: {
      title: 'Hacer que las tareas sean divertidas',
      ref: 'refTitle02'
    },
    title03: {
      title: 'Los progenitores deben ser un ejemplo',
      ref: 'refTitle03'
    },
    title04: {
      title: 'Permitirles que puedan tomar decisiones',
      ref: 'refTitle04'
    },
    title05: {
      title: 'Responsabilidad sí, pero normas también',
      ref: 'refTitle05'
    }
  }
};

export const OnHeader = () => (
  <ArticleAnchors
    data={articles.test}
  />
);
export const OnContent = () => {
  const refComponentAnchors = useRef();
  return (
    <div style={{ paddingTop: '500px', paddingBottom: '1500px', position: 'relative' }}>
      <p>scroll the page</p>
      <div ref={refComponentAnchors}>
        <ArticleAnchors
          onContent
          target={refComponentAnchors}
          breakPoint={300}
          data={articles.test}
          className="mt--x-big mb--big"
        />
      </div>
    </div>
  );
};
