import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import AccordionFullBg from './AccordionFullBg';

import { content } from '../../../../mocks/category2Level';

export default {
  title: 'Components/Organisms/AccordionFullBg',
  component: AccordionFullBg,
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
  <AccordionFullBg
    title="Preguntas Frecuentes"
    firstOpen
    openSingle
    titleIsSpan={false}
    lineType="dashed"
    titleType="h2"
    textColor="grey-neutral.600"
    lineColor="secondary.400"
    content={content.faqs}
    messages={{
      readMore: 'Leer más'
    }}
    background="main.50"
    className="pt--x-big pb--big mtb--big"
  />
);
