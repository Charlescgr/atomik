import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import AmpChecker from './AmpChecker';
import EyesColor from '../../widgets/EyesColor';

export default {
  title: 'Components/Molecules/AmpChecker',
  component: AmpChecker,
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
  <div style={{ marginLeft: '-1rem' }}>
    <AmpChecker text="Click to view this component in a non AMP version">
      <EyesColor
        buttonData={{
          dataGoogleEvents: JSON.stringify({
            data: {
              action: 'click',
              category: 'Widget',
              label: 'ButtonSubmit'
            }
          })
        }}
        className="mtb--x-big ptb--x-big"
      />
    </AmpChecker>
  </div>
);
