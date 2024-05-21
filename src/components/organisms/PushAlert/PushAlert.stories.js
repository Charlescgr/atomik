import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import PushAlert from './PushAlert';

import { listPush } from '../../../../mocks/home';

export default {
  title: 'Components/Organisms/PushAlert',
  component: PushAlert,
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
  <PushAlert
    list={listPush}
    // eslint-disable-next-line no-console
    returnFilter={(v) => console.log(v)}
    messages={{
      title: '¿Te avisamos cuando publiquemos algo sobre tu serie favoria?',
      yes: 'OK!',
      no: 'No, gracias',
    }}
  />
);
