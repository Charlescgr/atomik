/* eslint-disable no-alert */
import React from 'react';
import SearchCounterResults from './SearchCounterResults';

export default {
  title: 'Components/Molecules/SearchCounterResults',
  component: SearchCounterResults,
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
  <SearchCounterResults
    messages={{
      results: 'Resultados',
      result: 'Resultado'
    }}
    totalResults={2.589}
  />
);
