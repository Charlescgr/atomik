import React, { useEffect, useState } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import scrollTrigger from 'gsap/dist/ScrollTrigger';
import { useAmp } from 'next/amp';

import { IntlProvider } from 'react-intl';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Col from '../../atoms/Col';
import Row from '../../atoms/Row';
import Icon from '../../atoms/Icon';
import Label from '../../atoms/Label';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

import InputRange from '../../molecules/InputRange';
import TitleCustom from '../../molecules/TitleCustom';

gsap.registerPlugin(scrollTrigger);

function IMCCalculator({
  buttonData,
  mainTitle,
  btnCalc,
  youLabel,
  years,
  waistLabel,
  weightLabel,
  heightLabel,
  ageLabel,
  genderLabel,
  obeseLabel,
  overweightLabel,
  healthyLabel,
  underweightLabel,
  male,
  female,
  editButton,
  bmi,
  enterYourData,
  btnLetsGo,
  healthyWeight,
  healthyRange,
  underWeightTip,
  ...props
}) {
  const {
    theme, getColor, cdnPath, colorMode, direction
  } = useTheme();
  const { isDesktop } = useDeviceScreen();
  const isAmp = useAmp();

  const [currentStep, setCurrentStep] = useState(0);
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [waist, setWaist] = useState();
  const heightConverted = height / 100;

  // animations
  useEffect(() => {
    gsap.fromTo('.imc-calculator__illustration',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, scrollTrigger: { trigger: '.imc-calculator__illustration', start: 'top center' }
      }
    );
    gsap.fromTo('.letsgo__button',
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.3, scrollTrigger: { trigger: '.letsgo__button', start: 'top center' }
      }
    );
  });

  const canSubmit = () => gender !== undefined && age > 0 && height > 0 && weight > 0 && waist > 0;

  const { className, styles } = css.resolve`
    .input__value{
      width: 72px;
    }
    .info-bar{
      text-align: center;
      display: block;
      justify-content: space-between;
    }
    .info__button{
      display: table;
      margin: 8px auto 0 auto;
    }
    .indicator {
      ${direction === 'rtl' ? 'right' : 'left'}: calc(50% - 170px);
      transform: translateY(-25%);
      border: 5px solid ${getColor('secondary.600')};
      padding: 10px;
      border-radius: 50px;
    }
    .indicator:after {
      position: absolute;
      top: calc(50% - 10px);
      ${direction === 'rtl' ? 'right' : 'left'}: 100%;
      content: '';
      display: block;
      border-left: 20px solid ${getColor('secondary.600')};
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
    .calculator-widget .ranges {
      margin: 10px auto;
      height: 350px;
      width: 200px;
    }
    .calculator-widget .ranges .item {
      box-sizing: border-box;
    }
    .calculator-widget .ranges .item:nth-child(1) {
      height: 40%;
      background-color: ${getColor('main.400')};
    }
    .calculator-widget .ranges .item:nth-child(2) {
      height: 25%;
      background-color: ${getColor('main.500')};
    }
    .calculator-widget .ranges .item:nth-child(3) {
      height: 20%;
      background-color: ${getColor('main.600')};
    }
    .calculator-widget .ranges .item:nth-child(4) {
      height: 15%;
      background-color: ${getColor('main.700')};
    }
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .info-bar{
        text-align: left;
        display: flex;
      }
      .info__button{
        display: block;
        margin: ${direction === 'rtl' ? '0 0 0 16px' : '0 16px 0 0'};
      }
    }
  `;

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .info-bar{
        text-align: ${direction === 'rtl' ? 'right' : 'left'};
        display: flex;
      }
      .info__button{
        display: block;
        margin: ${direction === 'rtl' ? '0 0 0 16px' : '0 16px 0 0'};
      }
    }
  `;

  const calculateIMC = () => {
    const convertedHeight = height / 100;

    return Number((weight / (convertedHeight * convertedHeight)).toFixed(2));
  };

  const getTopIndicator = () => {
    let style = {};
    const imc = calculateIMC();

    if (imc <= 18.5) {
      style = { top: '87%' };
    } else if (imc <= 24.9) {
      style = { top: '70%' };
    } else if (imc <= 29.9) {
      style = { top: '50%' };
    } else {
      style = { top: '15%' };
    }

    return style;
  };

  const calculateIdealWeight = () => {
    const convertedHeight = height / 100;

    const minWeight = Number(
      (18.5 * (convertedHeight * convertedHeight)).toFixed(2)
    );
    const maxWeight = Number(
      (24.9 * (convertedHeight * convertedHeight)).toFixed(2)
    );

    return `${new Intl.NumberFormat({
      style: 'decimal',
      minimumFractionDigits: '1',
      maximumFractionDigits: '1',
    }).format(minWeight)} - ${new Intl.NumberFormat({
      style: 'decimal',
      minimumFractionDigits: '1',
      maximumFractionDigits: '1',
    }).format(maxWeight)}`;
  };

  return (
    <IntlProvider locale="en">
      <Box
        className={`imc-calculator ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      >
        { currentStep === 0 && (
          <>
            <TitleCustom type="h2" textColor="main.800" className="ta--center">{mainTitle}</TitleCustom>
            <Box className="imc-calculator__illustration d--table bc--secondary-600 br--50 mtb--big mlr--auto ptb--medium plr--x-medium">
              <Image
                src={`${cdnPath}widgets/imc-calculator/scale.svg`}
                alt="Illustration"
                width="75"
                height="75"
                layout="fixed"
              />
            </Box>
          </>
        )}
        { currentStep === 1 && (
          <TitleCustom type="h2" textColor="main.800" className="ta--center">{mainTitle}</TitleCustom>
        )}
        { currentStep === 2 && (
          <Row className={`info-bar ${className} ${mediaStyles.className} bc--grey-neutral-100 p--big br--normal ai--center`}>
            <Col colSize="10">
              <Paragraph className="info__text m--big ff--sans fs--normal lh--1-4" textColor="grey-neutral.800">
                <Span className="ff--sans fw--thin">{`${genderLabel}: `}</Span>
                <strong>{gender === 'male' ? male : female}</strong>
                {' / '}
                <Span className="ff--sans">{`${ageLabel}: `}</Span>
                <strong>{`${age} (${years})`}</strong>
                {' / '}
                <Span className="ff--sans">{`${heightLabel}: `}</Span>
                <strong>{`${heightConverted} (cm)`}</strong>
                {' / '}
                <Span className="ff--sans">{`${weightLabel}: `}</Span>
                <strong>{`${weight} (kg)`}</strong>
                {' / '}
                <Span className="ff--sans">{`${waistLabel}: `}</Span>
                <strong>{`${waist} (cm)`}</strong>
              </Paragraph>
            </Col>
            <Col colSize="2">
              <Button
                rounded
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                className={`info__button ${className} ${mediaStyles.className} bs--small ${isDesktop ? 'w--100' : 'w--50'}`}
                onClick={() => setCurrentStep(1)}
              >
                {editButton}
              </Button>
            </Col>
          </Row>
        )}

        { currentStep === 0 && (
          <>
            <Paragraph textColor="grey-neutral.800" className="ta--center">{enterYourData}</Paragraph>
            <Button
              rounded
              color="secondary.600"
              textColor={colorMode === 'dark' ? 'black' : 'white'}
              className={`letsgo__button p--normal ${isDesktop ? 'w--25' : 'w--50'} d--table mtb--big bs--small mlr--auto jc--center`}
              onClick={() => setCurrentStep(1)}
              data-google-events={buttonData.dataGoogleEvents}
            >
              {btnLetsGo}
            </Button>
          </>
        )}
        { currentStep === 1 && (
          <Row className="mb--medium">
            <Col colSize="12" className="p--normal mb--normal ta--center">
              <Label textColor="grey-neutral.500" className="d--block mt--x-big mb--medium ff--sans">
                {`${genderLabel}: `}
              </Label>
              <Box className="d--flex jc--center">
                <Button onlyIcon rounded size="medium" onClick={() => setGender('male')} color={gender === 'male' ? 'main.400' : 'secondary.600'} className={`gender-button m${direction === 'rtl' ? 'l' : 'r'}--normal`}>
                  <Icon inline color="white" size="medium" prefix="bx" name="male" />
                </Button>
                <Button onlyIcon rounded size="medium" onClick={() => setGender('female')} color={gender === 'female' ? 'main.400' : 'secondary.600'} className="gender-button">
                  <Icon inline color="white" size="medium" prefix="bx" name="female" />
                </Button>
              </Box>
            </Col>
            <Col colSize="6" className="p--normal">
              <Label textColor="grey-neutral.500" className="d--block mb--medium ff--sans">
                {`${ageLabel}: `}
                <strong className={`input__value ${className} ${mediaStyles.className} d--inline-block`}>
                  &nbsp;
                  {age}
                  {' '}
                  {age ? '(yo)' : ''}
                </strong>
              </Label>
              <InputRange
                id="imc-age"
                name="imc-age"
                min="1"
                max="120"
                onChange={(value) => setAge(value)}
                value={age}
                className="mtb--big"
              />
            </Col>
            <Col colSize="6" className="p--normal">
              <Label textColor="grey-neutral.500" className="d--block mb--medium ff--sans">
                {`${heightLabel}: `}
                <strong className={`input__value ${className} ${mediaStyles.className} d--inline-block`}>
                  &nbsp;
                  {height ? (height / 100) : ''}
                  {' '}
                  {height ? '(m)' : ''}
                </strong>
              </Label>
              <InputRange
                id="imc-height"
                name="imc-height"
                min="1"
                max="250"
                onChange={(value) => setHeight(value)}
                value={height}
                className="mtb--big"
              />
            </Col>
            <Col colSize="6" className="p--normal">
              <Label textColor="grey-neutral.500" className="d--block mb--medium ff--sans">
                {`${weightLabel}: `}
                <strong className={`input__value ${className} ${mediaStyles.className} d--inline-block`}>
                  &nbsp;
                  {weight}
                  {' '}
                  {weight ? '(kg)' : ''}
                </strong>
              </Label>
              <InputRange
                id="imc-weight"
                name="imc-weight"
                min="1"
                max="250"
                onChange={(value) => setWeight(value)}
                value={weight}
                className="mtb--big"
              />
            </Col>
            <Col colSize="6" className="p--normal">
              <Label textColor="grey-neutral.500" className="d--block mb--medium ff--sans">
                {`${waistLabel}: `}
                <strong className={`input__value ${className} ${mediaStyles.className} d--inline-block`}>
                  &nbsp;
                  {waist}
                  {' '}
                  {waist ? '(cm)' : ''}
                </strong>
              </Label>
              <InputRange
                id="imc-waist"
                name="imc-waist"
                min="1"
                max="80"
                onChange={(value) => setWaist(value)}
                value={waist}
                className="mtb--big"
              />
            </Col>
            <Col colSize="12" className="d--flex ai--center jc--center">
              <Button
                rounded
                color="secondary.600"
                textColor={colorMode === 'dark' ? 'black' : 'white'}
                onClick={() => setCurrentStep(2)}
                disabled={!canSubmit()}
                className={`p--normal d--block mtb--big bs--small jc--center ${isDesktop ? 'w--25' : 'w--100'}`}
                data-google-events={buttonData.dataGoogleEvents}
              >
                {btnCalc}
              </Button>
            </Col>
          </Row>
        )}
        { currentStep === 2 && (
          <Box className="imc-result ta--center  mtb--x-big">
            <Heading type="h3" className="fs--x-big main-color ta--center lh--1 mb--big">
              {bmi}
              <br />
              {new Intl.NumberFormat({
                style: 'decimal',
                minimumFractionDigits: '1',
                maximumFractionDigits: '1',
              }).format(calculateIMC())}
            </Heading>
            <Paragraph className="ta--center" textColor="grey-neutral.800">{underWeightTip}</Paragraph>
            <Paragraph className="ta--center ff--sans" textColor="grey-neutral.800">
              <strong>{healthyRange}</strong>
            </Paragraph>
            <Paragraph className="ta--center ff--sans" textColor="grey-neutral.800">
              <strong>
                {healthyWeight}
                {' '}
                {calculateIdealWeight()}
              </strong>
            </Paragraph>
            <Box className={`calculator-widget ${className} ${mediaStyles.className} mt--x-big d--flex fd--row p--relative`}>
              <Box className={`indicator ${className} fw--bold p--absolute c--secondary-700`} style={getTopIndicator()}>
                <Label className="ff--sans">{youLabel}</Label>
              </Box>
              <Box className={`ranges ${className} ${mediaStyles.className} br--normal o--hidden`}>
                <Box className={`item ${className} ${mediaStyles.className} d--flex ai--center jc--center w--100`}>
                  <Span
                    className="ff--sans ta--center c--white p--big lh--1-4 fs--normal"
                    dangerouslySetInnerHTML={{
                      __html: obeseLabel,
                    }}
                  />
                </Box>
                <Box className={`item ${className} ${mediaStyles.className} d--flex ai--center jc--center w--100`}>
                  <Span
                    className="ff--sans ta--center c--white p--big lh--1-4 fs--normal"
                    dangerouslySetInnerHTML={{
                      __html: overweightLabel,
                    }}
                  />
                </Box>
                <Box className={`item ${className} ${mediaStyles.className} d--flex ai--center jc--center w--100`}>
                  <Span
                    className="ff--sans ta--center c--white p--big lh--1-4 fs--normal"
                    dangerouslySetInnerHTML={{
                      __html: healthyLabel,
                    }}
                  />
                </Box>
                <Box className={`item ${className} ${mediaStyles.className} d--flex ai--center jc--center w--100`}>
                  <Span
                    className="ff--sans ta--center c--white p--big lh--1-4 fs--normal"
                    dangerouslySetInnerHTML={{
                      __html: underweightLabel,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {/* custom styles */}
        {styles}
        {!isAmp && mediaStyles.styles}
      </Box>
    </IntlProvider>
  );
}
IMCCalculator.defaultProps = {
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
  underWeightTip: 'A few more pounds can decrease your chances of wearing out your bones and weakening your immune system, as well as decreasing the feeling of tiredness. Women who are underweight may have their periods unregulated or stopped. Underweight men may have smaller amounts of sperm.'
};

IMCCalculator.propTypes = {
  /**
   * Google Data Events Tracking
   */
  buttonData: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Text from content
   */
  mainTitle: PropTypes.string,
  btnCalc: PropTypes.string,
  youLabel: PropTypes.string,
  years: PropTypes.string,
  waistLabel: PropTypes.string,
  weightLabel: PropTypes.string,
  heightLabel: PropTypes.string,
  ageLabel: PropTypes.string,
  genderLabel: PropTypes.string,
  obeseLabel: PropTypes.string,
  overweightLabel: PropTypes.string,
  healthyLabel: PropTypes.string,
  underweightLabel: PropTypes.string,
  male: PropTypes.string,
  female: PropTypes.string,
  editButton: PropTypes.string,
  bmi: PropTypes.string,
  enterYourData: PropTypes.string,
  btnLetsGo: PropTypes.string,
  healthyWeight: PropTypes.string,
  healthyRange: PropTypes.string,
  underWeightTip: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default IMCCalculator;
