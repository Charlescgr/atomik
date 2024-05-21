import React from 'react';

import IMCCalculator from './IMCCalculator';

export default {
  title: 'Components/Widgets/IMCCalculator',
  component: IMCCalculator,
  args: {
    mainTitle: 'Health Calculator',
    btnCalc: 'Calculate',
    youLabel: 'You',
    years: 'years',
    waistLabel: 'Your waist',
    weightLabel: 'Your weight',
    heightLabel: 'Your Height',
    ageLabel: 'Your age',
    genderLabel: 'Your gender',
    obeseLabel: 'Obese<br/> 30.0 and above',
    overweightLabel: 'Overweight<br/> 25.0 - 29.9',
    healthyLabel: 'Healthy<br/> 18.5 - 24.9',
    underweightLabel: 'Under weight<br/> 18.5',
    male: 'Male',
    female: 'Female',
    editButton: 'Edit',
    bmi: 'BMI',
    enterYourData: 'Enter your details: ',
    btnLetsGo: "Let's go!",
    healthyWeight: 'A healthy weight for someone your height would be',
    healthyRange: 'The healthy result for BMI is between 18.4 and 24.9',
    underWeightTip: 'A few more pounds can decrease your chances of wearing out your bones and weakening your immune system, as well as decreasing the feeling of tiredness. Women who are underweight may have their periods unregulated or stopped. Underweight men may have smaller amounts of sperm.',
    buttonData: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'ButtonSubmit'
        }
      })
    }
  }
};

export const Default = (args) => (
  <IMCCalculator {...args} />
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
