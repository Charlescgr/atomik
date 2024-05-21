import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import AuthorBox from './AuthorBox';

import avatar from '../../../../example/public/img/storybook_examples/avatar.png';

export default {
  title: 'Components/Molecules/AuthorBox',
  component: AuthorBox,
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
  <div style={{ maxWidth: '580px' }}>
    <AuthorBox
      author={{
        name: 'Sebastián Castaño',
        avatar,
        bio:
          'Un Social media aficionado. Proud tv practitioner. Professional travel expert. Mucho más allá de esto, tenemos más texto para añadir aquí caso el author sea un poco verboso. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }}
      // eslint-disable-next-line no-alert
      onLike={(isLiked) => !isLiked && alert('liked')}
      withConsultationButton
      withLikeButton
      messages={{
        consultationButtonTitle: 'Pedir cita online',
        readMoreTitle: 'Leer más',
        readLessTitle: 'Leer menos'
      }}
      lazy={false}
    />
  </div>
);
