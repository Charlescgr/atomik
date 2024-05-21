import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import CardConsult from './CardConsult';

// -- mocks
import { aboutConsults } from '../../../../mocks/author';

export default {
  title: 'Components/Molecules/CardConsult',
  component: CardConsult,
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

export const Default = () => {
  const messages = {
    scheduleConsult: 'Pedir cita'
  };
  const baseUrl = 'https://lamenteesmaravillosa.com/consulta/';
  return (
    aboutConsults.my_services.map(({
      _id, image, title, prices, slug
    }) => (
      <CardConsult
        key={_id}
        thumb={image}
        lazy={false}
        title={title}
        price={prices}
        urlConsult={`${baseUrl}${slug}`}
        messages={messages}
        className="mtb--normal"
      />
    ))
  );
};
