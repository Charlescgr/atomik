/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import Box from '../../atoms/Box';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import InputField from '../../atoms/InputField';

import Modal from '../../molecules/Modal';
import TitleCustom from '../../molecules/TitleCustom';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function PushAlert({
  messages, lists, returnFilter, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'lists',
    'messages',
    'returnFilter',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- theme
  const {
    theme, cdnPath, colorMode, direction
  } = useTheme();

  // -- states
  const [showModal, setShowModal] = useState(true);
  const [listsChecked, setListsChecked] = useState([]);

  // -- scripts
  // toggle open/close alert push
  const handleReturnList = () => {
    returnFilter(listsChecked);
    setShowModal(false);
  };

  const handleSaveList = (list, v) => {
    setListsChecked((prevState) => ({
      ...prevState,
      [list]: v
    }));
  };

  const input = (id, name) => (
    <Box>
      <InputField
        key={id}
        type="checkbox"
        id={`list-${id}`}
        name={`list-${id}`}
        className="d--inline-block"
        borderColor={colorMode === 'dark' ? 'main.600' : 'main.200'}
        color="main.400"
        onChange={(v) => handleSaveList(`list-${id}`, v)}
      />
      <Label
        inputId={`list-${id}`}
        textColor="main.700"
        className={`ff--sans fs--normal lh--2 mb--normal m${direction === 'rtl' ? 'r' : 'l'}--normal`}
      >
        {name}
      </Label>
    </Box>
  );

  const content = () => {
    if (lists.length > 1) {
      return (
        <Row className={`two__columns__padding${direction === 'rtl' ? '-reverse' : ''}`}>
          <Col colSize="6">
            {lists.slice(0, lists.length / 2).map(({ id, name }) => input(id, name))}
          </Col>
          <Col colSize="6">
            {lists.slice(lists.length / 2, lists.length).map(({ id, name }) => input(id, name))}
          </Col>
        </Row>
      );
    }
    return (
      lists.map(({ id, name }) => input(id, name))
    );
  };

  const theLogo = () => `${cdnPath}themes/${theme.base}/logo__icon${colorMode === 'dark' ? '--reverse' : ''}.svg`;

  return (
    <>
      <Box
        className={`push-alert ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        <Modal
          isOpen={showModal}
          animation="sticky-top"
          closeModal={() => setShowModal(false)}
          size="small"
          closeIcon={false}
          contentColor={colorMode === 'dark' ? 'black' : 'white'}
        >
          <Box className="p--x-big">
            <Box className="alert__header d--flex ai--center jc--flex-start">
              <Image
                src={theLogo()}
                layout="fixed"
                alt={theme.name}
                width="60"
                height="60"
                className="alert__image"
              />
              <TitleCustom
                titleIsSpan
                size="medium"
                textColor="main.700"
                className={`d--inline-block m${direction === 'rtl' ? 'r' : 'l'}--big`}
              >
                {messages.title}
              </TitleCustom>
            </Box>
            <Box className="alert__content ptb--big">
              {content()}
            </Box>
            <Box className="alert__content d--flex jc--flex-end">
              <Button
                rounded
                invertOnHover
                color={colorMode === 'dark' ? 'grey-neutral.200' : 'white'}
                borderColor="secondary.600"
                textColor="secondary.600"
                className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
                onClick={() => setShowModal(false)}
              >
                {messages.no}
              </Button>
              <Button
                rounded
                invertOnHover
                color="secondary.600"
                borderColor="secondary.600"
                textColor="secondary.50"
                onClick={() => handleReturnList()}
              >
                {messages.yes}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

PushAlert.defaultProps = {
  lists: [
    {
      id: '000001',
      name: 'Todo series',
    },
    {
      id: '000002',
      name: 'Diarias: “Dos vidas”',
    },
    {
      id: '000003',
      name: 'Diarias: “Amar”',
    },
    {
      id: '000004',
      name: 'Diarias: “Servir y prote”',
    }
  ],
  messages: {
    title: '¿Te avisamos cuando publiquemos algo sobre tu serie favoria?',
    yes: 'OK!',
    no: 'No, gracias',
  }
};

PushAlert.propTypes = {
  /**
   * The list of option
   */
  lists: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),

  /**
   * Return selected lists
   */
  returnLists: PropTypes.func,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    title: PropTypes.string,
    yes: PropTypes.string,
    no: PropTypes.string
  })
};

export default PushAlert;
