import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import ReadingBar from './ReadingBar';

export default {
  title: 'Components/Molecules/ReadingBar',
  component: ReadingBar,
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
  <div>
    <div className="test-header bs--default t--0 w--100 p--fixed bc--grey-cold-100" style={{ height: '32px' }}>
      <ReadingBar container="test-content" className="p--absolute" />
    </div>
    <div className="test-content">
      <style jsx>
        {`
          .test-content {
            height: 200vh;
          }
        `}
      </style>
    </div>
  </div>
);
