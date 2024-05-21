import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Box from '../../atoms/Box';
import Paragraph from '../../atoms/Paragraph';
import A from '../../atoms/A';

import Blockquote from './Blockquote';

export default {
  title: 'Components/Molecules/Blockquote',
  component: Blockquote,
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
  <Blockquote
    quote={{
      citation: (
        <Box>
          <Paragraph>
            Los movimientos no solo los hacemos simplemente por movernos, cada movimiento tiene su propósito, siempre tiene alguna intensión y
          </Paragraph>
          <A
            to="https://unycas.com/moda/estilos/street-style/3-zapatos-de-tacon-que-complementan-el-street-style/"
            textColor="main.500"
            underlineColor="main.500"
            lineType="dotted"
          >
            3 zapatos de tacón que complementan el street style
          </A>
        </Box>
      ),
      author: 'Maria Montessori'
    }}
  />
);
