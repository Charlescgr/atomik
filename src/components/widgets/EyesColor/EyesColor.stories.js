import React from 'react';

import EyesColor from './EyesColor';

export default {
  title: 'Components/Widgets/EyesColor',
  component: EyesColor,
  args: {
    className: '',
    title: 'De que cor serão os olhos do meu bebê?',
    description: 'Selecione a combinação das cores.',
    titleResult: 'Resultado da cor dos olhos do bebê.',
    descriptionResult: 'Seu bebê terá as seguintes possibilidades de cor dos olhos:',
    submitLabel: 'Calcular',
    editLabel: 'Voltar',
    motherLabel: 'Cor dos olhos da mãe',
    fatherLabel: 'Cor dos olhos do pai',
    brown: 'Castanho',
    green: 'Verde',
    blue: 'Azul',
    brownEyes: 'Olhos Castanhos',
    greenEyes: 'Olhos Verdes',
    blueEyes: 'Olhos Azuis',
    buttonData: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'ButtonSubmit'
        }
      })
    }
  }
};

export const Default = (args) => (
  <EyesColor {...args} />
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
