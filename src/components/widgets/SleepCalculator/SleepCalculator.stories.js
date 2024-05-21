import React from 'react';

import SleepCalculator from './SleepCalculator';

export default {
  title: 'Components/Widgets/SleepCalculator',
  component: SleepCalculator,
  args: {
    className: '',
    step2ResultForm1Title: 'If you go to sleep right now...',
    step2ResultForm1Column: 'Try to wake up at:',
    step2ResultForm2Column: 'Aim to sleep at:',
    step2ResultForm3Column: 'If you you want to go to sleep at TIME, you should set your alarm to one of the following times:',
    step1Tagline: 'Waking up easy is all about timing. Sleep Cycle Calculator helps you calculate your sleep patterns to wakes up during light sleep. Waking up during light sleep feels like waking up naturally rested without an alarm clock.',
    step1Form1Title: 'When should I wake up?',
    step1Form1Tagline: 'If I go to sleep now',
    buttonText: 'Calculate',
    step1Header: 'Sleep Cycle Calculator',
    step1Form2Title: 'When should I go to sleep',
    step1Form2Tagline: 'if I want to wake up at..',
    step1Form3Title: 'When should I wake up',
    step1Form3Tagline: 'if I go to sleep at...',
    step2Header: 'Sleep Cycle Calculator Results',
    step2Tagline: 'The main idea with this is trying not to wake up in the middle of a sleep cycle. Have in mind that it takes the average human about 15 minutes to fall asleep.',
    step2ResultTakeAdvantage: 'To take get:',
    step2ResultCycles: 'cycles',
    buttonEditText: 'Edit',
    step2SubTitle: 'If you you want to wake up at',
    step3SubTitle: 'If you you want to go to sleep at',
    hours: 'Hours',
    minutes: 'Minutes',
    sleepNow: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'ButtonSleepNow'
        }
      })
    },
    sleepAt: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'ButtonSleepAt'
        }
      })
    },
    wakeUpAt: {
      dataGoogleEvents: JSON.stringify({
        data: {
          action: 'click',
          category: 'Widget',
          label: 'ButtonWakeUpAt'
        }
      })
    }
  }
};

export const Default = (args) => (
  <SleepCalculator {...args} />
);

Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  }
};
