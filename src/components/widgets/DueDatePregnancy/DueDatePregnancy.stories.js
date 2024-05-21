import React from 'react';

import DueDatePregnancy from './DueDatePregnancy';

export default {
  title: 'Components/Widgets/DueDatePregnancy',
  component: DueDatePregnancy,
  args: {
    className: '',
    header: 'Due Date Calculator',
    step1TagLine1: "Congratulations, you're pregnant!",
    step1TagLine2: 'Now - when will your new baby arrive?',
    calendarPreText: 'Insert the first day of your last period',
    buttonText: 'Calculate',
    footerText: 'Note: Due date estimate assumes an average 28-day-cicle.',
    reviewedText: 'Reviewed by Brunilda Nazario, MD on January 18, 2017 This tool does not provide medical advice.',
    step2TagLine: 'Your Due Date is Around',
    calculateWithAnotherDate: 'Calculate with another date',
    babyIconAlt: 'Baby Icon',
    pregnancyTips: 'Use our Pregnancy Calendar for daily pregnancy tips and insights.',
    subscribe: 'Subscribe to the Pregnancy Weekly Newslette',
    trackEveryWeek: "Track every week of your baby's development, and get tips for having a healthy pregnancy",
    happyFamilyAlt: 'Happy family with newborn baby',
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
  <DueDatePregnancy {...args} />
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
