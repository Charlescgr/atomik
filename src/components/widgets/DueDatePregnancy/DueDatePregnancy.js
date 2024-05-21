/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import dayjs from 'dayjs';
import { gsap } from 'gsap';
import scrollTrigger from 'gsap/dist/ScrollTrigger';

import { useAmp } from 'next/amp';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Icon from '../../atoms/Icon';
import Badge from '../../atoms/Badge';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import InputField from '../../atoms/InputField';

import TitleCustom from '../../molecules/TitleCustom';

gsap.registerPlugin(scrollTrigger);

function DueDatePregnancy({
  buttonData,
  header,
  step1TagLine1,
  step1TagLine2,
  calendarPreText,
  buttonText,
  footerText,
  reviewedText,
  step2TagLine,
  calculateWithAnotherDate,
  babyIconAlt,
  pregnancyTips,
  subscribe,
  trackEveryWeek,
  happyFamilyAlt,
  ...props
}) {
  // -- allowedProps
  const propsBlacklist = [
    'buttonData',
    'className',
    'hide-animation'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { isDesktop } = useDeviceScreen();
  const {
    theme, cdnPath, locale, colorMode
  } = useTheme();
  const isAmp = useAmp();
  // eslint-disable-next-line
  // require(`dayjs/locale/${locale}`);

  // -- states
  const [buttonDisable, setButtonDisable] = useState(true);
  const [dueDate, setDueDate] = useState({
    hasSubmitted: false,
    selectedDate: '',
    pregnancyDate: '',
  });

  // -- scripts

  // animations
  useEffect(() => {
    gsap.fromTo('.pregnancy__card',
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.pregnancy__card', start: 'top center' }
      }
    );
    gsap.fromTo('.pregnancy__illustration',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, scrollTrigger: { trigger: '.pregnancy__illustration', start: 'top center' }
      }
    );
    gsap.fromTo('.pregnancy__footer',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.pregnancy__footer', start: 'top center' }
      }
    );
  }, []);

  // function to check if all inputs are selected, and the validation is ok
  useEffect(() => {
    if (dueDate.selectedDate !== '') {
      setButtonDisable(false);
    }
  }, [dueDate]);

  const calculateDate = (currentDate, addDays) => {
    const returndate = dayjs(currentDate).locale(locale).add(addDays, 'day').format('MMMM D, YYYY');
    return returndate;
  };
  const handleSelectedDate = (day) => {
    setDueDate({ ...dueDate, selectedDate: day });
  };

  const handleSubmit = (addDays) => {
    const pregnancyDate = calculateDate(dueDate.selectedDate, addDays);
    setDueDate({
      ...dueDate,
      hasSubmitted: !dueDate.hasSubmitted,
      pregnancyDate
    });
  };

  const mediaStyles = css.resolve`
      @media only screen and (min-width: ${theme.medias.tablet}) {
      .reverse {
        flex-direction: row-reverse;
      }
    }
  `;

  // -- styles
  const { className, styles } = css.resolve`
    .badge__text::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 26px 0 26px 26px;
      border-color: transparent transparent transparent ${colorMode === 'dark' ? 'black' : 'white'};
    }
    .badge__text::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 26px 26px 26px 0;
      border-color: transparent ${colorMode === 'dark' ? 'black' : 'white'} transparent transparent;
    }
  `;

  return (
    <Box
      className={`due-date ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {!dueDate.hasSubmitted ? (
        <Row className={`${className} ${mediaStyles.className} ${isDesktop ? ' reverse' : ''} jc--center`}>
          <Col colSize="5" className="ta--center">
            <Image
              src={`${cdnPath}widgets/due-date-pregnancy/mommy.svg`}
              alt="Illustration"
              width={isAmp ? '240' : isDesktop ? '320' : '240'}
              height={'245'}
              className="pregnancy__illustration mb--big"
              layout="fixed"
            />
          </Col>
          <Col colSize="5" className="pregnancy__card d--flex jc--center fd--column ta--center">

            <TitleCustom type="h2" textColor="main.800">{header}</TitleCustom>
            <Paragraph textColor="grey-neutral.800">
              {step1TagLine1}
            </Paragraph>
            <Paragraph textColor="grey-neutral.800" className="mt--big">
              {step1TagLine2}
            </Paragraph>
            <Paragraph textColor="grey-neutral.800">
              <strong>
                {calendarPreText}
              </strong>
            </Paragraph>

            <InputField
              id="birthday"
              name="birthday"
              type="date"
              textColor={colorMode === 'dark' ? 'main.700' : 'main.500'}
              color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
              onChange={(value) => handleSelectedDate(value)}
              className="w--50 mlr--auto mt--big"
            />

            <Button
              rounded
              color="secondary.600"
              textColor={colorMode === 'dark' ? 'black' : 'white'}
              className={`p--normal ${isDesktop ? 'w--25' : 'w--50'} d--table mtb--big bs--small mlr--auto jc--center`}
              onClick={() => handleSubmit(280)}
              disabled={buttonDisable}
              data-google-events={buttonData.dataGoogleEvents}
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      ) : (
        // page 2
        <Row className={`${className} ${mediaStyles.className} jc--center fade`}>
          <Col colSize="5" className="d--flex jc--center fd--column ta--center">
            <TitleCustom type="h2" textColor="main.800">{step2TagLine}</TitleCustom>
            <Badge
              color="secondary.700"
              size="custom"
              className={`badge__box ${className} ${mediaStyles.className} ta--center mtb--x-big`}
            >
              <Span textColor={colorMode === 'dark' ? 'black' : 'white'} className={`badge__text ${className} ${mediaStyles.className} fs--big ptb--medium p--relative w--100 d--block`}>
                {dueDate.pregnancyDate}
              </Span>
            </Badge>
            <Paragraph textColor="grey-neutral.800">
              <Button
                rounded
                hasIcon
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                className="p--normal d--table mtb--big bs--small mlr--auto jc--center"
                onClick={() => handleSubmit(0)}
                data-google-events={buttonData.dataGoogleEvents}
              >
                <Icon name="calendar-edit" color={colorMode === 'dark' ? 'black' : 'white'} className="mr--normal" />
                {calculateWithAnotherDate}
              </Button>
            </Paragraph>

          </Col>
          <Col colSize="6" className="ta--center">
            <Image
              src={`${cdnPath}widgets/due-date-pregnancy/family.svg`}
              alt={happyFamilyAlt}
              width={isAmp ? '288' : isDesktop ? '500' : '400'}
              height={isAmp ? '206' : 'auto'}
              className="mb--big"
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col colSize="12" className="pregnancy__footer ta--center">
          <Paragraph textColor="grey-neutral.800" className="fw--bold ff--sans lh--1-5">
            {footerText}
          </Paragraph>
          <Paragraph textColor="grey-neutral.500" size="small" className="ff--sans lh--1-5">
            {reviewedText}
          </Paragraph>
        </Col>
      </Row>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

DueDatePregnancy.defaultProps = {
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
  happyFamilyAlt: 'Happy family with newborn baby'
};

DueDatePregnancy.propTypes = {
  /**
   * Google Data Events Tracking
   */
  buttonData: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Text from content
   */
  header: PropTypes.string,
  step1TagLine1: PropTypes.string,
  step1TagLine2: PropTypes.string,
  calendarPreText: PropTypes.string,
  buttonText: PropTypes.string,
  footerText: PropTypes.string,
  reviewedText: PropTypes.string,
  step2TagLine: PropTypes.string,
  calculateWithAnotherDate: PropTypes.string,
  babyIconAlt: PropTypes.string,
  pregnancyTips: PropTypes.string,
  subscribe: PropTypes.string,
  trackEveryWeek: PropTypes.string,
  happyFamilyAlt: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default DueDatePregnancy;
