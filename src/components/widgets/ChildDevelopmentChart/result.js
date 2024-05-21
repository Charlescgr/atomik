import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { useAmp } from 'next/amp';

import { Line } from 'react-chartjs-2';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Col from '../../atoms/Col';
import Row from '../../atoms/Row';
import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';

import Tabs from '../../molecules/Tabs';

/**
 * The Result component.
 */
function Result({
  messages, data, setSubmitted, editButton,
}) {
  const { theme, cdnPath } = useTheme();
  const isAmp = useAmp();

  const dataLine = {
    weight: {
      labels: data.weight.labels,
      datasets: data.weight.series,
    },
    height: {
      labels: data.height.labels,
      datasets: data.height.series,
    },
  };

  const yourPercentil = {
    weight: data.weight.myPercentile,
    height: data.height.myPercentile,
  };

  const periodName = {
    weight: data.weight.periodName,
    height: data.height.periodName,
  };

  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  };

  const mediaStyles = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}) {
      .info-bar{
        text-align: left;
        display: flex;
      }
      .info__text{
        display: flex;
      }
      .info__button{
        display: block;
        margin: 0 16px 0 0;
      }
    }
  `;

  const { className, styles } = css.resolve`
    .info-bar{
      text-align: center;
      display: block;
      justify-content: space-between;
    }
    .info__text{
      display: inline-flex;
      min-width: 100px;
    }
    .info__button{
      display: table;
      margin: 8px auto 0 auto;
    }
  `;

  return (
    <Box className="mb--small">

      <Heading className="mb--big">
        {messages.results}
      </Heading>
      <Row className={`info-bar ${className} ${mediaStyles.className} bc--grey-neutral-100 p--big br--normal ai--center`}>
        <Col colSize="10" className="d--flex jc--center fw--wrap">
          <Box className={`info__text ${className} ${mediaStyles.className} ai--center jc--flex-start`}>
            <Image
              className="calendar-icon mr--normal"
              width="35"
              height="35"
              src={`${cdnPath}widgets/child-development-chart/calendar-icon.svg`}
              alt={'icon calendar'}
            />
            <Span textColor="grey-neutral.500" className="span ff--sans fw--bold">
              {data.birthday}
            </Span>
            <Span textColor="grey-neutral.200" className="bar mlr--x-big fs--big">/</Span>
          </Box>
          <Box className={`info__text ${className} ${mediaStyles.className} ai--center jc--flex-start`}>
            <Image
              className="icon weight-icon mr--normal"
              width="35"
              height="35"
              src={`${cdnPath}widgets/child-development-chart/weight-icon.svg`}
              alt={'icon weight'}
            />
            <Span textColor="grey-neutral.500" className="span ff--sans fw--bold">{`${data.weight.me} (kg)`}</Span>
            <Span textColor="grey-neutral.200" className="bar mlr--x-big fs--big">/</Span>
          </Box>
          <Box className={`info__text ${className} ${mediaStyles.className} ai--center jc--flex-start`}>
            <Image
              className="icon gender-icon mr--normal"
              width="35"
              height="35"
              src={`${cdnPath}widgets/child-development-chart/gender-icon.svg`}
              alt={'icon gender'}
            />
            <Span textColor="grey-neutral.500" className="span ff--sans fw--bold">
              {messages[data.gender]}
            </Span>
            <Span textColor="grey-neutral.200" className="bar mlr--x-big fs--big">/</Span>
          </Box>
          <Box className={`info__text ${className} ${mediaStyles.className} ai--center jc--flex-start`}>
            <Image
              className="ruler-icon mr--normal"
              width="35"
              height="35"
              src={`${cdnPath}widgets/child-development-chart/ruler-icon.svg`}
              alt={'icon ruler'}
            />
            <Span textColor="grey-neutral.500" className="span ff--sans fw--bold">{`${data.height.me} (cm)`}</Span>
          </Box>
        </Col>
        <Col colSize="2">
          <Button
            rounded
            data-google-events={editButton.dataGoogleEvents}
            color="secondary.600"
            textColor="white"
            className={`info__button ${className} ${mediaStyles.className} bs--small w--100`}
            onClick={() => setSubmitted(false)}
          >
            {messages.edit}
          </Button>
        </Col>
      </Row>

      <Heading type="h3" className="mt--x-big mt--big">{messages.legend}</Heading>
      <Box className="d--flex ai--center jc--space-between">
        <Box className="mb--big d--flex ai--center">
          <Span className="span-baby mr--big d--inline-block br--50 bc--red-600" />
          <Span className="span ff--sans">{messages.yourBaby}</Span>
        </Box>
        <Box className="mb--big d--flex ai--center">
          <Span className="span-p3 mr--normal d--inline-block br--small bc--main-300" />
          <Span className="span ff--sans">P3%</Span>
        </Box>
        <Box className="mb--big d--flex ai--center">
          <Span className="span-p15 mr--normal d--inline-block br--small bc--secondary-600" />
          <Span className="span ff--sans">P15%</Span>
        </Box>
        <Box className="mb--big d--flex ai--center">
          <Span className="span-p50 mr--normal d--inline-block br--small bc--main-300" />
          <Span className="span ff--sans">P50%</Span>
        </Box>
        <Box className="mb--big d--flex ai--center">
          <Span className="span-p85 mr--normal d--inline-block br--small bc--secondary-600" />
          <Span className="span ff--sans">P85%</Span>
        </Box>
        <Box className="mb--big d--flex ai--center">
          <Span className="span-p97 mr--normal d--inline-block br--small bc--main-900" />
          <Span className="span ff--sans">P97%</Span>
        </Box>
      </Box>

      <Tabs className="mtb--big w--100">
        <Box label={<Span className="fs--medium" dangerouslySetInnerHTML={{ __html: messages.weight }} />}>
          <Row>
            <Col colSize="12">
              <Line data={dataLine.weight} options={options} redraw />
              <Box className="d--flex jc--center mt--x-big">
                <Span textColor="grey-neutral.800" className="ff--sans fs--medium span-age">
                  {`${messages.age} (${messages[periodName.weight]})`}
                </Span>
              </Box>

              <Box className="d--flex jc--center mt--small">
                <strong className="span-your-percentil-label c--grey-neutral-800 ff--sans fs--medium">
                  {`${messages.yourBabyPercentileIs}: `}
                  <Span textColor="red.600" className="span-your-percentil">
                    {yourPercentil.weight}
                  </Span>
                </strong>
              </Box>
            </Col>
          </Row>
        </Box>
        <Box label={<Span className="fs--medium" dangerouslySetInnerHTML={{ __html: messages.height }} />}>
          <Row>
            <Col colSize="12">
              <Line data={dataLine.height} options={options} redraw />
              <Box className="d--flex jc--center mt--x-big">
                <Span textColor="grey-neutral.800" className="ff--sans fs--medium span-age">
                  {`${messages.age} (${messages[periodName.height]})`}
                </Span>
              </Box>
              <Box className="d--flex jc--center mt--small">
                <strong className="span-your-percentil-label c--grey-neutral-800 ff--sans fs--medium">
                  {`${messages.yourBabyPercentileIs}: `}
                  <Span textColor="red.600" className="span-your-percentil">
                    {yourPercentil.height}
                  </Span>
                </strong>
              </Box>
            </Col>
          </Row>
        </Box>
      </Tabs>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
          .span-baby {
            width: 15px;
            height: 15px;
          }
          .span-p3 {
            width: 20px;
            height: 4px;
          }
          .span-p15 {
            width: 20px;
            height: 4px;
          }
          .span-p50 {
            width: 20px;
            height: 4px;
          }
          .span-p85 {
            width: 20px;
            height: 4px;
          }
          .span-p97 {
            width: 20px;
            height: 4px;
          }
        `}
      </style>
    </Box>
  );
}

Result.propTypes = {
  data: PropTypes.any,
  editButton: PropTypes.any,
  setSubmitted: PropTypes.func,
  messages: PropTypes.shape({
    yourBabyPercentileIs: PropTypes.string,
    age: PropTypes.string,
    months: PropTypes.string,
    weeks: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    legend: PropTypes.string,
    yourBaby: PropTypes.string,
    birthday: PropTypes.string,
    male: PropTypes.string,
    female: PropTypes.string,
    gender: PropTypes.string,
    results: PropTypes.string,
    edit: PropTypes.string,
  })
};

Result.defaultProps = {
  messages: {
    yourBabyPercentileIs: 'O percentil do seu bebê é',
    age: 'Idade',
    months: 'Meses',
    weeks: 'Semanas',
    height: 'Altura (cm)',
    weight: 'Peso (kg)',
    legend: 'Legenda',
    yourBaby: 'Seu Bebê',
    birthday: 'Data de Nascimento',
    male: 'Masculino',
    female: 'Feminino',
    gender: 'Sexo',
    results: 'Resultados',
    edit: 'Editar',
  }
};

export default Result;
