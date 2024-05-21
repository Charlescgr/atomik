/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
import React from 'react';

import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

export default {
  title: 'Documentation/Widgets',
  parameters: {
    options: {
      selectedPanel: false,
      showPanel: false,
      showNav: true,
      isToolshown: false
    }
  }
};

export const Intro = () => (
  <Container wrap className="p--x-big">
    <Heading>
      Widgets
    </Heading>
    <Paragraph>
      We currently have the following components that respond to the following shortcodes:
      <pre style={{ marginTop: '2rem' }}>
        <h4>baby_eyes_color</h4>
        <code>
          {'[baby_eyes_color title="What color will my baby\'s eyes be?" description="Select the color combination." titleResult="Result of the baby\'s eye color." descriptionResult=\'Your baby will have the following eye color possibilities= submitLabel="Calculate" editLabel="Back" motherLabel="Mother\'s eye color" fatherLabel="Father\'s eye color" brown="Brown" green="Green" blue="Blue" brownEyes="Brown eyes" greenEyes="Green eyes" blueEyes="Blue eyes"]'}
        </code>
      </pre>

      <pre style={{ marginTop: '2rem' }}>
        <h4>child_dev_chart</h4>
        <code>
          {'[child_dev_chart calculate="Calculate" height="Height (cm)" weight="Weight (kg)" female="Feminine" male="Male" gender="Gender" birthday="Birth date" babyData="Enter baby data" babyPercentile="Calculate your baby\'s percentile"]'}
        </code>
      </pre>

      <pre style={{ marginTop: '2rem' }}>
        <h4>due_date_pregnancy</h4>
        <code>
          {'[due_date_pregnancy header="Due Date Calculator" step1TagLine1="Congratulations, you\'re pregnant!" step1TagLine2="Now - when will your new baby arrive?" calendarPreText="Insert the first day of your last period" buttonText="Calculate" footerText="Note=Due date estimate assumes an average 28-day-cicle." reviewedText="Reviewed by Brunilda Nazario, MD on January 18, 2017 This tool does not provide medical advice." step2TagLine="Your Due Date is Around" calculateWithAnotherDate="Calculate with another date" babyIconAlt="Baby Icon" pregnancyTips="Use our Pregnancy Calendar for daily pregnancy tips and insights." subscribe="Subscribe to the Pregnancy Weekly Newslette" trackEveryWeek="Track every week of your baby\'s development, and get tips for having a healthy pregnancy" happyFamilyAlt="Happy family with newborn baby"]'}
        </code>
      </pre>

      <pre style={{ marginTop: '2rem' }}>
        <h4>imc_calculator</h4>
        <code>
          {'[imc_calculator mainTitle="Health Calculator" btnCalc="Calculate" youLabel="You" years="years" waistLabel="Your waist" weightLabel="Your weight" heightLabel="Your Height" ageLabel="Your age" genderLabel="Your gender" obeseLabel="Obese<br/> 30.0 and above" overweightLabel="Overweight<br/> 25.0 - 29.9" healthyLabel="Healthy<br/> 18.5 - 24.9" underweightLabel="Under weight<br/> 18.5" male="Male" female="Female" editButton="Edit" bmi="BMI" enterYourData="Enter your details=" btnLetsGo="Let\'s go!" healthyWeight="A healthy weight for someone your height would be" healthyRange="The healthy result for BMI is between 18.4 and 24.9" underWeightTip="A few more pounds can decrease your chances of wearing out your bones and weakening your immune system, as well as decreasing the feeling of tiredness. Women who are underweight may have their periods unregulated or stopped. Underweight men may have smaller amounts of sperm."]'}
        </code>
      </pre>

      <pre style={{ marginTop: '2rem' }}>
        <h4>sleep_calculator</h4>
        <code>
          {'[sleep_calculator step2ResultForm1Title="If you go to sleep right now..." step2ResultForm1Column="Try to wake up at:" step2ResultForm2Column="Aim to sleep at:" step2ResultForm3Column="If you you want to go to sleep at TIME, you should set your alarm to one of the following times:" step1Tagline="Waking up easy is all about timing. Sleep Cycle Calculator helps you calculate your sleep patterns to wakes up during light sleep. Waking up during light sleep feels like waking up naturally rested without an alarm clock." step1Form1Title="When should I wake up?" step1Form1Tagline="If I go to sleep now" buttonText="Calculate" step1Header="Sleep Cycle Calculator" step1Form2Title="When should I go to sleep" step1Form2Tagline="if I want to wake up at.." step1Form3Title="When should I wake up" step1Form3Tagline="if I go to sleep at..." step2Header="Sleep Cycle Calculator Results" step2Tagline="The main idea with this is trying not to wake up in the middle of a sleep cycle. Have in mind that it takes the average human about 15 minutes to fall asleep." step2ResultTakeAdvantage="To take get:" step2ResultCycles="cycles" buttonEditText="Edit" step2SubTitle="If you you want to wake up at" step3SubTitle="If you you want to go to sleep at" hours="Hours" minutes="Minutes"]'}
        </code>
      </pre>
    </Paragraph>
  </Container>
);
