import React from 'react';

import ChildDevelopmentChart from './ChildDevelopmentChart';

export default {
  title: 'Components/Widgets/ChildDevelopmentChart',
  component: ChildDevelopmentChart,
  args: {
    hideAnimation: 'false',
    submitSucceeded: true,
    calculate: 'Calculate',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    female: 'Feminine',
    male: 'Male',
    gender: 'Gender',
    birthday: 'Birth date',
    babyData: 'Enter baby data',
    babyPercentile: "Calculate your baby's percentile",
    calculateButton: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'calculateButton'
        }
      })
    },
    editButton: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'editButton'
        }
      })
    }
  }
};

export const Default = (args) => (
  <ChildDevelopmentChart {...args} />
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
