import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { gsap } from 'gsap';
import scrollTrigger from 'gsap/dist/ScrollTrigger';

import { useAmp } from 'next/amp';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';

import { onSubmit } from './actions';
import Result from './result';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Box from '../../atoms/Box';
import Label from '../../atoms/Label';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import InputField from '../../atoms/InputField';

import InputSelect from '../../molecules/InputSelect';

gsap.registerPlugin(scrollTrigger);

function ChildDevelopmentChart({
  calculate,
  height,
  weight,
  female,
  male,
  gender,
  birthday,
  babyData,
  babyPercentile,
  calculateButton,
  editButton,
  ...props
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [data, setData] = useState({});
  const [birthdayState, setBirthdayState] = useState('');
  const [genderState, setGenderState] = useState('');
  const [heightState, setHeightState] = useState('');
  const [weightState, setWeightState] = useState('');

  const isAmp = useAmp();
  const { isDesktop } = useDeviceScreen();
  const { theme, cdnPath, colorMode } = useTheme();

  // animations
  useEffect(() => {
    gsap.fromTo('.child-development__form',
      { x: -70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.child-development__form', start: 'top center' }
      }
    );
    gsap.fromTo('.child-development__illustration',
      { x: 70, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: '.child-development__illustration', start: 'top center' }
      }
    );
  }, []);

  const submit = () => {
    const form = {
      birthdayState, genderState, heightState, weightState
    };
    onSubmit(form, (result) => {
      const { datas } = result;
      setData(datas);
      setHasSubmitted(result.submitSucceeded);
    });
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
    <Box className={`child-development-chart ${handleCreateStyleClass(props)}`}>
      {!hasSubmitted ? (
        <>
          <Heading className="fs--x-big">
            {babyPercentile}
          </Heading>
          <Paragraph>
            {babyData}
          </Paragraph>
          <Row className={`mb--medium ${mediaStyles.className}${isDesktop ? ' reverse' : ''}`}>

            <Col colSize="6" className="ta--center">
              <Image
                src={`${cdnPath}widgets/child-development-chart/grown-icon.svg`}
                className="child-development__illustration"
                alt="Illustration"
                width={isAmp ? '288' : '378'}
                height="206"
                layout="fixed"
              />
            </Col>
            <Col colSize="6">
              <form className="child-development__form" action="#" method="get" target="_top">
                <Row className="mt--normal">
                  <Col colSize="6" className="pr--small">
                    <Box className="label-with-icon mtb--normal pl--medium w--100 d--flex ai--center jc--flex-start">
                      <Image
                        className="mr--normal"
                        width="30"
                        height="30"
                        layout="fixed"
                        src={`${cdnPath}widgets/child-development-chart/calendar-icon.svg`}
                        alt="icon calendar"
                      />
                      <Label
                        textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.300'}
                        className="ff--sans fs--small ml--small"
                      >
                        {birthday}
                      </Label>
                    </Box>
                    <InputField
                      id="birthday"
                      name="birthday"
                      type="date"
                      className="p--x-medium w--100 d--block mb--normal bs--small"
                      placeholder={birthday}
                      value={birthdayState}
                      textColor={colorMode === 'dark' ? 'main.700' : 'main.500'}
                      color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                      onChange={(value) => setBirthdayState(value)}
                    />
                  </Col>
                  <Col colSize="6" className="pl--small">
                    <Box className="label-with-icon mtb--normal pl--medium w--100 d--flex ai--center jc--flex-start">
                      <Image
                        className="mr--normal"
                        width="30"
                        height="30"
                        layout="fixed"
                        src={`${cdnPath}widgets/child-development-chart/gender-icon.svg`}
                        alt={'icon gender'}
                      />
                      <Label
                        textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.300'}
                        className="ff--sans fs--small ml--small"
                      >
                        {gender}
                      </Label>
                    </Box>
                    <InputSelect
                      full
                      id="gender"
                      name="gender"
                      className={`${colorMode === 'dark' ? 'bc--grey-neutral-200' : 'bc--white'} mb--normal bs--small`}
                      borderColor="grey-neutral.200"
                      size="xx-medium"
                      rounded
                      fontSize="normal"
                      placeholder={gender}
                      options={[
                        {
                          value: 'male',
                          label: male,
                        },
                        {
                          value: 'female',
                          label: female,
                        },
                      ]}
                      value={genderState}
                      onChange={(value) => setGenderState(value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col colSize="6" className="pr--small">
                    <Box className="label-with-icon mtb--normal pl--medium w--100 d--flex ai--center jc--flex-start">
                      <Image
                        className="mr--normal"
                        width="30"
                        height="30"
                        layout="fixed"
                        src={`${cdnPath}widgets/child-development-chart/weight-icon.svg`}
                        alt={'icon weight'}
                      />
                      <Label
                        textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.300'}
                        className="ff--sans fs--small ml--small"
                      >
                        {weight}
                      </Label>
                    </Box>
                    <InputField
                      full
                      id="weight"
                      name="weight"
                      type="number"
                      textColor={colorMode === 'dark' ? 'main.700' : 'main.500'}
                      className="p--x-medium d--block mb--normal bs--small"
                      min="1"
                      max="200"
                      placeholder={weight}
                      value={weightState}
                      color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                      onChange={(value) => setWeightState(value)}
                    />
                  </Col>
                  <Col colSize="6" className="pl--small">
                    <Box className="label-with-icon mtb--normal pl--medium w--100 d--flex ai--center jc--flex-start">
                      <Image
                        className="mr--normal"
                        width="30"
                        height="30"
                        layout="fixed"
                        src={`${cdnPath}widgets/child-development-chart/ruler-icon.svg`}
                        alt={'icon ruler'}
                      />
                      <Label
                        textColor={colorMode === 'dark' ? 'grey-neutral.700' : 'grey-neutral.300'}
                        className="ff--sans fs--small ml--small"
                      >
                        {height}
                      </Label>
                    </Box>
                    <InputField
                      id="height"
                      name="height"
                      type="number"
                      className="p--x-medium w--100 d--block mb--normal bs--small"
                      min="1"
                      placeholder={height}
                      value={heightState}
                      textColor={colorMode === 'dark' ? 'main.700' : 'main.500'}
                      color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                      onChange={(value) => setHeightState(value)}
                    />
                  </Col>
                </Row>
                <Button
                  rounded
                  data-google-events={calculateButton.dataGoogleEvents}
                  color="secondary.600"
                  textColor={colorMode === 'dark' ? 'black' : 'white'}
                  className="p--normal w--100 d--block mtb--big bs--small jc--center"
                  onClick={() => submit()}
                >
                  {calculate}
                </Button>
              </form>
            </Col>
          </Row>
        </>
      ) : (
        <Result
          data={data}
          editButton={editButton}
          setSubmitted={(value) => setHasSubmitted(value)}
        />
      )}

      {/* custom styles */}
      {!isAmp && mediaStyles.styles}
    </Box>
  );
}
ChildDevelopmentChart.defaultProps = {
  calculate: 'Calculate',
  height: 'Height (cm)',
  weight: 'Weight (kg)',
  female: 'Feminine',
  male: 'Male',
  gender: 'Gender',
  birthday: 'Birth date',
  babyData: 'Enter baby data',
  babyPercentile: "Calculate your baby's percentile",
};

ChildDevelopmentChart.propTypes = {
  /**
 * Google Data Events Tracking
 */
  calculateButton: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),
  editButton: PropTypes.shape({
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Text from content
   */
  calculate: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  female: PropTypes.string,
  male: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  babyData: PropTypes.string,
  babyPercentile: PropTypes.string,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default ChildDevelopmentChart;
