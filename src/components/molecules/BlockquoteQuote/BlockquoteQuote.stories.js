import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import BlockquoteQuote from './BlockquoteQuote';

export default {
  title: 'Components/Molecules/BlockquoteQuote',
  component: BlockquoteQuote,
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
  <BlockquoteQuote
    text='Los movimientos no solo los hacemos simplemente por movernos, cada movimiento tiene su propósito, siempre tiene alguna intensión y <a href="/" rel="noopener noreferrer" target="_blank" className="is--underline c--main-500" > blockquote with parsed link </a>'
    author="Maria Montessori"
    className="mt--x-big mb--big"
  />
);
