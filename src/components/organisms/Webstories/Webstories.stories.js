import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Webstories from './Webstories';

import { stories } from '../../../../mocks/stories';

export default {
  title: 'Components/Organisms/Webstories',
  component: Webstories,
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
  <Webstories
    stories={stories}
    messages={{
      title: 'Webstories',
      labelMoreStories: 'Stories'
    }}
  />
);
