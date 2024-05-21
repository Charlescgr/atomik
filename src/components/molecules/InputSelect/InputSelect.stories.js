import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import InputSelect from './InputSelect';

export default {
  title: 'Components/Molecules/InputSelect',
  component: InputSelect,
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
  <>
    <InputSelect
      size="big"
      id="select_order"
      name="select_order"
      options={[
        { value: '0', label: 'Ordenar por' },
        { value: 'date', label: 'Data' },
        { value: 'name', label: 'Nome' },
        { value: 'area', label: 'Área' },
      ]}
    />
  </>
);
