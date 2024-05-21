import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import Accordion from './Accordion';

import { content } from '../../../../mocks/category2Level';

export default {
  title: 'Components/Organisms/Accordion',
  component: Accordion,
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
  <Accordion
    textColor="main.800"
    lineType="dashed"
    lineColor="main.800"
    content={content.faqs}
    messages={{
      readMore: 'Continuar leyendo'
    }}
  />
);
export const WithTitle = () => (
  <Accordion
    title="Preguntas Frecuentes"
    titleIsSpan={false}
    titleType="h2"
    textColor="main.800"
    lineType="dashed"
    lineColor="main.800"
    content={content.faqs}
    messages={{
      readMore: 'Continuar leyendo'
    }}
  />
);
export const WithFirstOpen = () => (
  <Accordion
    title="Preguntas Frecuentes"
    firstOpen
    titleIsSpan={false}
    titleType="h2"
    textColor="main.800"
    lineType="dashed"
    lineColor="main.800"
    content={content.faqs}
    messages={{
      readMore: 'Continuar leyendo'
    }}
  />
);
export const WithJustOneAnswareOpen = () => (
  <Accordion
    title="Preguntas Frecuentes"
    openSingle
    titleIsSpan={false}
    titleType="h2"
    textColor="main.800"
    lineType="dashed"
    lineColor="main.800"
    content={content.faqs}
    messages={{
      readMore: 'Continuar leyendo'
    }}
  />
);
