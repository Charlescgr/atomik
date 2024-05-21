import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ConsultList from './ConsultList';

import { anchors, aboutConsults } from '../../../../mocks/author';

export default {
  title: 'Components/Organisms/ConsultList',
  component: ConsultList,
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
  <div style={{ width: '300px' }}>
    <ConsultList
      lazy={false}
      title={anchors.title04.title}
      titleType="h2"
      consults={aboutConsults.my_services}
      baseUrl="https://lamenteesmaravillosa.com/consulta/"
      messages={{
        scheduleConsult: 'Pedir cita'
      }}
    />
  </div>
);
