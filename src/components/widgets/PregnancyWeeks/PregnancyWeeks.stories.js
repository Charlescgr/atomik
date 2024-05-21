import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { withNextRouter } from 'storybook-addon-next-router';

import PregnancyWeeks from './PregnancyWeeks';

export default {
  title: 'Components/Widgets/PregnancyWeeks',
  component: PregnancyWeeks,
  decorators: [withA11y, withKnobs, withNextRouter],
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
  const title = text('Title', 'Embarazo semana a semana');
  const messages = object('Messages', {
    textIntro: '',
    recommendations: {
      label: 'Ver todas',
      url: '/single'
    }
  });

  return (
    <div style={{ maxWidth: '1024px' }}>
      <PregnancyWeeks messages={messages} title={title} />
    </div>
  );
};
