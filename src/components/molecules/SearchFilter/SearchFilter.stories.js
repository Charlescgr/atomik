/* eslint-disable no-alert */
import React from 'react';
import SearchFilter from './SearchFilter';

import { listFilters } from '../../../../mocks/search';

export default {
  title: 'Components/Molecules/SearchFilter',
  component: SearchFilter,
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

export const Default = () => {
  // eslint-disable-next-line no-console
  const handleFilter = (v) => console.log(v);
  return (
    <div style={{ maxWidth: '700px' }}>
      <SearchFilter
        messages={{
          labelButton: 'Filtrar'
        }}
        filtersList={listFilters}
        returnFilter={(v) => handleFilter(v)}
      />
    </div>
  );
};
