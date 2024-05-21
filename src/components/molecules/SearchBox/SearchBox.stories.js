/* eslint-disable no-alert */
import React, { useState } from 'react';
import SearchBox from './SearchBox';

export default {
  title: 'Components/Molecules/SearchBox',
  component: SearchBox,
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
  const [query, setQuery] = useState('');
  const handleReturnPartQuery = (v) => setQuery(v);
  // eslint-disable-next-line no-console
  const handleSubmit = () => console.log(query);
  return (
    <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
      <SearchBox
        onType={(v) => handleReturnPartQuery(v)}
        onSubmit={(v) => handleSubmit(v)}
      />
    </div>
  );
};

export const WithProps = () => {
  const [query, setQuery] = useState('');
  const handleReturnPartQuery = (v) => setQuery(v);
  // eslint-disable-next-line no-console
  const handleSubmit = () => console.log(query);
  return (
    <div style={{ maxWidth: '700px' }} className="mtb--big mlr--auto">
      <SearchBox
        messages={{
          titles: {
            default: 'Busque por...',
            results: 'Resultado de búsqueda para',
          }
        }}
        titleType="h1"
        titleColor="main.800"
        textColor="grey-cold.500"
        className="bc--main-50 plr--big ptb--normal mb--x-big"
        onType={(v) => handleReturnPartQuery(v)}
        onSubmit={(v) => handleSubmit(v)}
      />
    </div>
  );
};
