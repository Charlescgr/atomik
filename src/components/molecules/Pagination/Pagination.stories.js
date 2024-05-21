import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Pagination from './Pagination';

export default {
  title: 'Components/Molecules/Pagination',
  component: Pagination,
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
  <Pagination
    className="mtb--x-big"
    quantityPages={50}
    currentPage={3}
    limitPages={6}
    // eslint-disable-next-line no-alert
    changePage={(v) => alert(v)}
    messages={{
      first: 'Primero',
      last: 'Último'
    }}
  />
);
