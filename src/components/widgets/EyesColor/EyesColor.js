/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';
import { gsap } from 'gsap';
import scrollTrigger from 'gsap/dist/ScrollTrigger';

import { useAmp } from 'next/amp';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import InputSelect from '../../molecules/InputSelect';
import TitleCustom from '../../molecules/TitleCustom';

gsap.registerPlugin(scrollTrigger);

function EyesColor({
  buttonData,
  title,
  description,
  titleResult,
  descriptionResult,
  submitLabel,
  editLabel,
  motherLabel,
  fatherLabel,
  brown,
  green,
  blue,
  brownEyes,
  greenEyes,
  blueEyes,
  ...props
}) {
  // -- allowedProps
  const propsBlacklist = [
    'buttonData',
    'className',
    'show-animation'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { theme, cdnPath, colorMode } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  // -- states
  const [submited, setSubmited] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [eyes, setEyes] = useState({
    mother: '0',
    father: '0',
    answer: []
  });

  // -- scripts

  // animations
  useEffect(() => {
    gsap.fromTo('.eyes-color__illustration',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1, delay: 1, scrollTrigger: '.eyes-color__illustration'
      }
    );

    gsap.timeline({ delay: 1.5, scrollTrigger: '#select_eyes-mother' })
      .fromTo('#select_eyes-mother',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'power1', duration: 1
        }, '-=0.5'
      )
      .fromTo('#select_eyes-father',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'power1', duration: 1
        }, '-=0.5'
      )
      .fromTo('.eyes-color__submit',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5
        }, '-=0.5'
      );
  }, []);

  // function to check if all inputs are selected, and the validation is ok
  useEffect(() => {
    if (eyes.mother !== '0' && eyes.father !== '0') {
      setButtonDisable(false);
    }
  }, [eyes]);

  // function to update the state
  const handleChange = (value, parent) => {
    if (parent === 'm') {
      setEyes({
        ...eyes,
        mother: value
      });
    } else {
      setEyes({
        ...eyes,
        father: value
      });
    }
  };

  // function to save the results
  const handleClick = () => {
    if (eyes.mother !== '0' && eyes.father !== '0') {
      const colors = (eyes.mother + eyes.father)
        .split('')
        .sort()
        .join('');

      switch (colors[0]) {
        case 'B':
          if (colors[1] === 'B') {
            setEyes({ ...eyes, answer: [0, 1, 99] });
          } else if (colors[1] === 'D') {
            setEyes({ ...eyes, answer: [50, 37.5, 12.5] });
          } else if (colors[1] === 'G') {
            setEyes({ ...eyes, answer: [0, 50, 50] });
          } else {
            setEyes({ ...eyes, answer: [] });
          }
          break;

        case 'D':
          if (colors[1] === 'D') {
            setEyes({ ...eyes, answer: [75, 18.75, 6.25] });
          } else if (colors[1] === 'G') {
            setEyes({ ...eyes, answer: [50, 37.5, 12.5] });
          } else {
            setEyes({ ...eyes, answer: [] });
          }
          break;

        case 'G':
          if (colors[1] === 'G') {
            setEyes({ ...eyes, answer: [0, 75, 25] });
          } else {
            setEyes({ ...eyes, answer: [] });
          }
          break;

        default:
          break;
      }
      setSubmited(!submited);
      setButtonDisable(true);
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

  const Illustration = () => (
    <Box className="d--flex as--center">
      <Image
        src={`${cdnPath}widgets/eyes-color/eyescolor-illus.png`}
        alt="Illustration"
        width={isAmp ? '288' : isDesktop ? '350' : '288'}
        height="206"
        layout="fixed"
        className={`${isDesktop ? '' : 'mtb--big'} eyes-color__illustration d--table`}
      />
    </Box>
  );

  return (
    <Box
      className={`eyes-color ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Row className={`${mediaStyles.className}${isDesktop ? ' reverse' : ''}`}>
        <Col colSize="6" className="d--flex ai--center jc--center">
          {isDesktop && <Illustration />}
        </Col>
        <Col colSize="6" className="d--flex jc--center fd--column">
          {submited ? (
            <>
              <TitleCustom type="h3" textColor="main.800" className="ta--center">{titleResult}</TitleCustom>
              {descriptionResult && (
                <Paragraph textColor="grey-neutral.800" className="ta--center">{descriptionResult}</Paragraph>
              )}
              <Box className="fade d--flex jc--space-around ta--center mtb--x-big">
                <Paragraph className="m--normal ff--sans" textColor="grey-neutral.800">
                  <Image
                    src={`${cdnPath}widgets/eyes-color/eyescolor-brown.png`}
                    alt={greenEyes}
                    width="54"
                    height="51"
                    layout="fixed"
                  />
                  <Span className="fw--bold fs--big d--block ff--sans" textColor="main.600">
                    {eyes.answer[0]}
                    {' '}
                    %
                  </Span>
                  {brownEyes}
                </Paragraph>
                <Paragraph className="m--normal ff--sans" textColor="grey-neutral.800">
                  <Image
                    src={`${cdnPath}widgets/eyes-color/eyescolor-green.png`}
                    alt={greenEyes}
                    width="54"
                    height="51"
                    layout="fixed"
                  />
                  <Span className="fw--bold fs--big d--block ff--sans" textColor="main.600">
                    {eyes.answer[1]}
                    {' '}
                    %
                  </Span>
                  {greenEyes}
                </Paragraph>
                <Paragraph className="m--normal ff--sans" textColor="grey-neutral.800">
                  <Image
                    src={`${cdnPath}widgets/eyes-color/eyescolor-blue.png`}
                    alt={blueEyes}
                    width="54"
                    height="51"
                    layout="fixed"
                  />
                  <Span className="fw--bold fs--big d--block ff--sans" textColor="main.600">
                    {eyes.answer[2]}
                    {' '}
                    %
                  </Span>
                  {blueEyes}
                </Paragraph>
              </Box>
              <Button
                rounded
                hasIcon
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                onClick={handleClick}
                className="p--normal w--75 d--block mtb--normal bs--small mlr--auto"
              >
                <Icon name="left-arrow-alt" color={colorMode === 'dark' ? 'black' : 'white'} className="mr--normal" />
                {editLabel}
              </Button>
            </>
          ) : (
            <>
              <TitleCustom type="h3" textColor="main.800">{title}</TitleCustom>
              {description && (
                <Paragraph textColor="grey-neutral.800">{description}</Paragraph>
              )}
              {!isDesktop && <Illustration />}
              <InputSelect
                id="select_eyes-mother"
                name="select_eyes-mother"
                size="medium"
                full
                borderColor="grey-neutral.50"
                onChange={(e) => handleChange(e, 'm')}
                className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--block mtb--big bs--small zi--1`}
                placeholder={motherLabel}
                options={[
                  { value: 'D', label: brown }, // Dark
                  { value: 'G', label: green }, // Green
                  { value: 'B', label: blue }, // Blue
                ]}
              />
              <InputSelect
                id="select_eyes-father"
                name="select_eyes-father"
                size="medium"
                full
                borderColor="grey-neutral.50"
                onChange={(e) => handleChange(e, 'f')}
                className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} d--block mtb--big bs--small`}
                placeholder={fatherLabel}
                options={[
                  { value: 'D', label: brown }, // Dark
                  { value: 'G', label: green }, // Green
                  { value: 'B', label: blue }, // Blue
                ]}
              />
              <Button
                rounded
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                onClick={handleClick}
                className="eyes-color__submit p--normal w--100 d--block mtb--big bs--small jc--center mlr--auto"
                disabled={buttonDisable}
                data-google-events={buttonData.dataGoogleEvents}
              >
                {submitLabel}
              </Button>
            </>
          )}
        </Col>

      </Row>
      {/* custom styles */}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}

EyesColor.defaultProps = {
  title: "What color will my baby's eyes be?",
  description: 'Select the color combination.',
  titleResult: "Result of the baby's eye color.",
  descriptionResult: 'Your baby will have the following eye color possibilities:',
  submitLabel: 'Calculate',
  editLabel: 'Back',
  motherLabel: "Mother's eye color",
  fatherLabel: "Father's eye color",
  brown: 'Brown',
  green: 'Green',
  blue: 'Blue',
  brownEyes: 'Brown eyes',
  greenEyes: 'Green eyes',
  blueEyes: 'Blue eyes'
};

EyesColor.propTypes = {
  /**
   * Google Data Events Tracking
   */
  buttonData: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Text from content
   */

  title: PropTypes.string,
  description: PropTypes.string,
  titleResult: PropTypes.string,
  descriptionResult: PropTypes.string,
  submitLabel: PropTypes.string,
  editLabel: PropTypes.string,
  motherLabel: PropTypes.string,
  fatherLabel: PropTypes.string,
  brown: PropTypes.string,
  green: PropTypes.string,
  blue: PropTypes.string,
  brownEyes: PropTypes.string,
  greenEyes: PropTypes.string,
  blueEyes: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default EyesColor;
