/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';
import { gsap } from 'gsap';
import scrollTrigger from 'gsap/dist/ScrollTrigger';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Badge from '../../atoms/Badge';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import Paragraph from '../../atoms/Paragraph';

import InputSelect from '../../molecules/InputSelect';
import CardDefault from '../../molecules/CardDefault';
import TitleCustom from '../../molecules/TitleCustom';

gsap.registerPlugin(scrollTrigger);

function SleepCalculator({
  sleepNow,
  sleepAt,
  wakeUpAt,
  step2ResultForm1Title,
  step2ResultForm1Column,
  step2ResultForm2Column,
  step2ResultForm3Column,
  step1Tagline,
  step1Form1Title,
  step1Form1Tagline,
  buttonText,
  step1Header,
  step1Form2Title,
  step1Form2Tagline,
  step1Form3Title,
  step1Form3Tagline,
  step2Header,
  step2Tagline,
  step2ResultTakeAdvantage,
  step2ResultCycles,
  buttonEditText,
  step2SubTitle,
  step3SubTitle,
  hours: hoursMessage,
  minutes: minutesMessage,
  ...props
}) {
  const { theme, cdnPath, colorMode } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- allowedProps
  const propsBlacklist = [
    'sleepNow',
    'sleepAt',
    'wakeUpAt',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- states
  const [submitedValidated, setSubmitedValidated] = useState(false);
  const [buttonDisable, setButtonDisable] = useState({ form2: true, form3: true });
  const [sleep, setSleep] = useState({
    submittedType: 0,
    inputtedTime2: ':',
    inputtedTime3: ':',
    // 1 clicle = 90 min
    // 2 clicles = 180 min
    // 3 clicles = 270 min
    // 4 clicles = 360 min
    // 5 clicles = 450 min
    // 6 clicles = 540 min
    answers: {
      '6cicles': '00:06',
      '5cicles': '00:05',
      '4cicles': '00:04',
      '3cicles': '00:03',
      '2cicles': '00:02',
      '1cicles': '00:01',
    },
  });

  // -- scripts

  // animations
  useEffect(() => {
    gsap.fromTo('.card--sleep-now',
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.card--sleep-now', start: 'top center' }
      }
    );
    gsap.fromTo('.card--go-to-sleep',
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.card--go-to-sleep', start: 'top center' }
      }
    );
    gsap.fromTo('.card--wake-up',
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.card--wake-up', start: 'top center' }
      }
    );
    gsap.fromTo('.sleep-calculator__image',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, delay: 0.3, scrollTrigger: { trigger: '.sleep-calculator__image', start: 'top center' }
      }
    );
  }, []);

  // function to check if all inputs are selected, and the validation is ok
  useEffect(() => {
    let time = '';
    let formDisable = true;
    if (sleep.submittedType === 0) { // first form
      setButtonDisable({
        ...buttonDisable,
        form2: formDisable,
        form3: formDisable
      });
    } else if (sleep.submittedType === 2) { // second form
      time = sleep.inputtedTime2;
      const arTime = time.split(':');
      if (arTime[0] !== '' && arTime[1] !== '') {
        formDisable = false;
      }
      setButtonDisable({
        ...buttonDisable,
        form2: formDisable
      });
    } else { // last form
      time = sleep.inputtedTime3;
      const arTime = time.split(':');
      if (arTime[0] !== '' && arTime[1] !== '') {
        formDisable = false;
      }
      setButtonDisable({
        ...buttonDisable,
        form3: formDisable
      });
    }
  }, [sleep]);

  // function to generate the hours inputSelect
  const hours = () => {
    const arHours = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 23; i++) {
      if (i < 10) {
        i = `0${i}`;
      }
      arHours.push({ value: i, label: i });
    }
    return arHours;
  };
  // function to generate the minutes inputSelect
  const minutes = () => {
    const arMinutes = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 59; i++) {
      if (i % 5 === 0) {
        if (i < 10) {
          i = `0${i}`;
        }
        arMinutes.push({ value: i, label: i });
      }
    }
    return arMinutes;
  };

  // function to update the state
  const handleChange = (form, type, val) => {
    if (form === 'form2') { // second form
      let time2 = '';
      const arrTime2 = sleep.inputtedTime2.split(':');
      if (type === 'h') {
        time2 = `${val}:${arrTime2[1]}`;
      } else {
        time2 = `${arrTime2[0]}:${val}`;
      }
      setSleep({
        ...sleep,
        submittedType: 2,
        inputtedTime2: time2
      });
    } else { // last form
      let time3 = '';
      const arrTime3 = sleep.inputtedTime3.split(':');
      if (type === 'h') {
        time3 = `${val}:${arrTime3[1]}`;
      } else {
        time3 = `${arrTime3[0]}:${val}`;
      }
      setSleep({
        ...sleep,
        submittedType: 3,
        inputtedTime3: time3
      });
    }
  };

  // function to convert the current time (11:23) in timestamp
  const returnTimeStamp = (time) => {
    const aux = time.split(':');
    const timeStamp = new Date();
    timeStamp.setHours(aux[0]);
    timeStamp.setMinutes(aux[1]);
    timeStamp.setSeconds(0);
    timeStamp.setMilliseconds(0);
    return timeStamp.getTime();
  };

  // function to add minutes to current timestamp
  const addRemoveMinutes = (iniTime, addMin) => {
    const iniSleepingTime = 15 * 60 * 1000;
    const addMinutes = addMin * 60 * 1000;
    const newTime = returnTimeStamp(iniTime) + addMinutes + iniSleepingTime;
    const tm = new Date(newTime);
    const finalTime = `${tm.getHours() < 10 ? '0' : ''}${tm.getHours()}:${tm.getMinutes() < 10 ? '0' : ''}${tm.getMinutes()}`;
    return finalTime;
  };

  // function update de state with all clicles
  const calculateSleepCycle = (time, submittedType) => {
    let completeCicles = false;
    switch (submittedType) {
      case 0: { // none form
        setSleep({
          ...sleep,
          submittedType,
          inputtedTime2: ':',
          inputtedTime3: ':',
          answers: {
            ...sleep.answers,
            '6cicles': '00:06',
            '5cicles': '00:05',
            '4cicles': '00:04',
            '3cicles': '00:03',
            '2cicles': '00:02',
            '1cicles': '00:01',
          }
        });
        completeCicles = true;
        break;
      }
      case 1: { // first form
        setSleep({
          ...sleep,
          submittedType,
          answers: {
            ...sleep.answers,
            '6cicles': addRemoveMinutes(time, 540),
            '5cicles': addRemoveMinutes(time, 450),
            '4cicles': addRemoveMinutes(time, 360),
            '3cicles': addRemoveMinutes(time, 270),
            '2cicles': addRemoveMinutes(time, 180),
            '1cicles': addRemoveMinutes(time, 90)
          }
        });
        completeCicles = true;
        break;
      }
      case 2: { // second form
        setSleep({
          ...sleep,
          answers: {
            ...sleep.answers,
            '6cicles': addRemoveMinutes(time, -540),
            '5cicles': addRemoveMinutes(time, -450),
            '4cicles': addRemoveMinutes(time, -360),
            '3cicles': addRemoveMinutes(time, -270),
            '2cicles': addRemoveMinutes(time, -180),
            '1cicles': addRemoveMinutes(time, -90)
          }
        });
        completeCicles = true;
        break;
      }
      default: { // last form
        setSleep({
          ...sleep,
          submittedType,
          answers: {
            ...sleep.answers,
            '6cicles': addRemoveMinutes(time, 540),
            '5cicles': addRemoveMinutes(time, 450),
            '4cicles': addRemoveMinutes(time, 360),
            '3cicles': addRemoveMinutes(time, 270),
            '2cicles': addRemoveMinutes(time, 180),
            '1cicles': addRemoveMinutes(time, 90)
          }
        });
        completeCicles = true;
        break;
      }
    }
    return completeCicles;
  };

  // function to control de submit click
  const handleSubmit = (submittedType) => {
    let time = '';
    let formValidated = false;
    if (submittedType === 0) { // none form
      formValidated = true;
    } else if (submittedType === 1) { // first form
      const currentTime = new Date();
      time = `${currentTime.getHours() < 10 ? '0' : ''}${currentTime.getHours()}:${currentTime.getMinutes() < 10 ? '0' : ''}${currentTime.getMinutes()}`;
      if (time !== '') {
        formValidated = true;
      }
    } else { // second and last form
      if (submittedType === 2) {
        time = sleep.inputtedTime2;
      } else {
        time = sleep.inputtedTime3;
      }
      const arTime = time.split(':');
      if (arTime[0] !== '' && arTime[1] !== '') {
        formValidated = true;
      }
    }
    if ((calculateSleepCycle(time, submittedType) && formValidated) || (submittedType === 0)) {
      setSubmitedValidated(!submitedValidated);
    }
  };

  // function to control the conditional to show titles
  const setReturnTitle = (submittedType) => {
    let time = '';
    if (submittedType === 2) {
      time = sleep.inputtedTime2;
    } else {
      time = sleep.inputtedTime3;
    }
    let submitedId = 0;
    if (submitedValidated) {
      submitedId = submittedType;
    }
    switch (submitedId) {
      case 1:
        return step2ResultForm1Title;
      case 2:
        return `${step2SubTitle} <strong>${time}</strong>`;
      case 3:
        return `${step3SubTitle} <strong>${time}</strong>:`;
      default:
        return '';
    }
  };

  // function to control the conditional to show labels
  const setColumnText = (submittedType) => {
    switch (submittedType) {
      case 1:
        return step2ResultForm1Column;
      case 2:
        return step2ResultForm2Column;
      case 3:
        return step2ResultForm3Column;
      default:
        return step2ResultForm1Column;
    }
  };

  // -- styles
  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .reverse {
        flex-direction: row-reverse;
      }
    }
  `;

  return (
    <Box
      className={`sleep-calculator ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >

      <>
        <TitleCustom type="h2" textColor="main.800">
          {!submitedValidated ? step1Header : step2Header}
        </TitleCustom>
        <Paragraph>
          {!submitedValidated ? step1Tagline : step2Tagline}
        </Paragraph>

        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: setReturnTitle(sleep.submittedType),
          }}
          className="mtb--big c--grey-neutral-800 ff--serif fs--normal lh--2"
        />
      </>

      <Row className={`two__columns__padding ${mediaStyles.className}${isDesktop ? ' reverse' : ''}`}>

        {!submitedValidated ? (
          <>
            <Col colSize="7" className="jc--center ai--center d--flex">
              <Image
                src={`${cdnPath}widgets/sleep-calculator/sleep-icon-2.png`}
                alt="Illustration"
                className="sleep-calculator__image"
                width={isAmp ? '220' : isDesktop ? '466' : '220'}
                height={isDesktop ? '433' : '223'}
                layout="fixed"
              />
            </Col>
            <Col colSize="5" className="d--flex jc--center fd--column">
              <CardDefault
                color={colorMode === 'dark' ? 'grey-neutral.100' : 'white'}
                className="card--sleep-now ta--center p--big mt--big mb--normal"
              >
                <TitleCustom type="h3" textColor="main.800">
                  {step1Form1Title}
                </TitleCustom>
                <Paragraph>
                  {step1Form1Tagline}
                </Paragraph>
                <Button
                  rounded
                  color="secondary.600"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  className="d--block w--75 jc--center mt--big mlr--auto bs--small"
                  onClick={() => handleSubmit(1)}
                  data-google-events={sleepNow.dataGoogleEvents}
                >
                  {buttonText}
                </Button>
              </CardDefault>

              <Divider color="main.50" />

              <CardDefault
                color={colorMode === 'dark' ? 'grey-neutral.100' : 'white'}
                className="card--go-to-sleep ta--center p--big mtb--normal zi--1"
              >
                <TitleCustom type="h3" textColor="main.800">
                  {step1Form2Title}
                </TitleCustom>
                <Paragraph>
                  {step1Form2Tagline}
                </Paragraph>
                <form className="d--flex jc--center ai--center" action="#" method="get" target="_top">
                  <InputSelect
                    name="hour1"
                    id="hour1"
                    full
                    onChange={(e) => handleChange('form2', 'h', e)}
                    placeholder={hoursMessage}
                    options={hours()}
                    className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--inlile-block mtb--normal bs--small`}
                  />
                  <Span className="mlr--big">:</Span>
                  <InputSelect
                    name="minute1"
                    id="minute1"
                    full
                    onChange={(e) => handleChange('form2', 'm', e)}
                    placeholder={minutes}
                    options={minutes()}
                    className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--inlile-block mtb--normal bs--small`}
                  />
                </form>
                <Button
                  rounded
                  color="secondary.600"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  className="d--block w--75 jc--center mt--big mlr--auto bs--small"
                  onClick={() => handleSubmit(2)}
                  disabled={buttonDisable.form2}
                  data-google-events={wakeUpAt.dataGoogleEvents}
                >
                  {buttonText}
                </Button>
              </CardDefault>

              <Divider color="main.50" />

              <CardDefault
                color={colorMode === 'dark' ? 'grey-neutral.100' : 'white'}
                className="card--wake-up ta--center p--big mtb--normal"
              >
                <TitleCustom type="h3" textColor="main.800">
                  {step1Form3Title}
                </TitleCustom>
                <Paragraph>
                  {step1Form3Tagline}
                </Paragraph>
                <form className="d--flex jc--center ai--center" action="#" method="get" target="_top">
                  <InputSelect
                    name="hour3"
                    id="hour3"
                    full
                    onChange={(e) => handleChange('form3', 'h', e)}
                    placeholder={hoursMessage}
                    options={hours()}
                    className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--inlile-block mtb--normal bs--small`}
                  />
                  <Span className="mlr--big">:</Span>
                  <InputSelect
                    name="minute3"
                    id="minute3"
                    full
                    onChange={(e) => handleChange('form3', 'm', e)}
                    placeholder={minutes}
                    options={minutes()}
                    className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--inlile-block mtb--normal bs--small`}
                  />
                </form>
                <Button
                  rounded
                  type="submit"
                  color="secondary.600"
                  textColor={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                  className="d--block w--75 jc--center mt--big mlr--auto bs--small"
                  onClick={() => handleSubmit(3)}
                  disabled={buttonDisable.form3}
                  data-google-events={sleepAt.dataGoogleEvents}
                >
                  {buttonText}
                </Button>
              </CardDefault>
            </Col>
          </>
        ) : (
          <>
            <Col colSize="7" className="jc--center ai--center d--flex fade">
              <Image
                src={`${cdnPath}widgets/sleep-calculator/sleep-icon.png`}
                alt="Illustration"
                width={isAmp ? '220' : isDesktop ? '466' : '220'}
                height={isDesktop ? '433' : '223'}
                layout="fixed"
              />
            </Col>
            <Col colSize="5" className="d--flex jc--center fd--column fade">

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Paragraph textColor="grey-neutral.500" size="medium" className="ff--sans fw--bold w--50 lh--1-5">
                  {setColumnText(sleep.submittedType)}
                </Paragraph>
                <Paragraph textColor="grey-neutral.500" size="medium" className="ta--right ff--sans fw--bold w--50 lh--1-5">
                  {step2ResultTakeAdvantage}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="green.600"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['6cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  6
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="lime.500"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['5cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  5
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="yellow.500"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['4cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  4
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="orange.500"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['3cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  3
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="red-candy.500"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['2cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  2
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Box className="d--flex ai--center jc--space-between mtb--normal">
                <Badge
                  textColor="white"
                  color="red-candy.700"
                  size="custom"
                  className="br--x-big w--50 fs--xx-medium ptb--big ta--center"
                >
                  {sleep.answers['1cicles']}
                </Badge>
                <Paragraph textColor="grey-neutral.500" size="x-medium" className="ff--sans fw--bold">
                  1
                  {' '}
                  {step2ResultCycles}
                </Paragraph>
              </Box>

              <Button
                rounded
                hasIcon
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                onClick={() => handleSubmit(0)}
                className={`p--normal ${isDesktop ? 'w--75' : 'w--50'} d--table mt--x-big bs--small mlr--auto`}
              >
                <Icon name="left-arrow-alt" color={colorMode === 'dark' ? 'black' : 'white'} className="mr--normal" />
                {buttonEditText}
              </Button>
            </Col>
          </>

        )}
      </Row>

      {/* custom styles */}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

SleepCalculator.defaultProps = {
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
};

SleepCalculator.propTypes = {
  /**
   * Google Data Events Tracking
   */
  sleepNow: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),
  sleepAt: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),
  wakeUpAt: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Text from content
   */
  step2ResultForm1Title: PropTypes.string,
  step2ResultForm1Column: PropTypes.string,
  step2ResultForm2Column: PropTypes.string,
  step2ResultForm3Column: PropTypes.string,
  step1Tagline: PropTypes.string,
  step1Form1Title: PropTypes.string,
  step1Form1Tagline: PropTypes.string,
  buttonText: PropTypes.string,
  step1Header: PropTypes.string,
  step1Form2Title: PropTypes.string,
  step1Form2Tagline: PropTypes.string,
  step1Form3Title: PropTypes.string,
  step1Form3Tagline: PropTypes.string,
  step2Header: PropTypes.string,
  step2Tagline: PropTypes.string,
  step2ResultTakeAdvantage: PropTypes.string,
  step2ResultCycles: PropTypes.string,
  buttonEditText: PropTypes.string,
  step2SubTitle: PropTypes.string,
  step3SubTitle: PropTypes.string,
  hours: PropTypes.string,
  minutes: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default SleepCalculator;
