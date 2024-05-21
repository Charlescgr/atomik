import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

import Modal from '../Modal';
import TitleCustom from '../TitleCustom';

function ArticleInfo(props) {
  const {
    checked, sponsored, minutes, evidenceBased
  } = props;
  const [modalSponsor, setModalSponsor] = useState(false);
  const [modalFastCheck, setModalFastCheck] = useState(false);
  const [modalEvidenceBased, setModalEvidenceBased] = useState(false);

  const { direction } = useTheme();

  const propsBlacklist = [
    'className',
    'checked',
    'sponsored',
    'evidenceBased',
    'minutes'
  ];
  const allowedProps = omit(props, propsBlacklist);

  /* ***
  open/close modal Fast Check */
  const handleFastCheck = () => {
    setModalFastCheck(!modalFastCheck);
  };

  /* ***
  open/close modal Sponsor */
  const handleSponsor = () => {
    setModalSponsor(!modalSponsor);
  };

  /* ***
  open/close modal Evidence Based */
  const handleEvidenceBased = () => {
    setModalEvidenceBased(!modalEvidenceBased);
  };

  return (
    <Box
      className={`article-info ${handleCreateStyleClass(props)} mtb--normal lh--1-5 c--main-800 d--flex ai--center`}
      {...allowedProps}
    >
      {sponsored?.title && (
        <>
          {' '}
          <Button
            hasIcon
            onClick={handleSponsor}
            size="custom"
            color="transparent"
            textColor="main.800"
            className={`pl--0 m${direction === 'rtl' ? 'l' : 'r'}--x-big`}
            on="tap:modal-sponsor.toggleClass(class='modal--show'),modal__overlay-sponsor.toggleClass(class='modal--show'),modal__overlay-sponsor.toggleClass(class='fade')"
            data-google-events={sponsored?.dataGoogleEvents}
          >
            <Icon inline color="orange.500" size="small" prefix="bx" name="info-circle" className={`m${direction === 'rtl' ? 'l' : 'r'}--small`} />
            <span className="fs--small lh--1-7 ff--serif ta--left">
              { sponsored?.title }
            </span>
          </Button>
          <Modal id="sponsor" isOpen={modalSponsor} closeModal={() => setModalSponsor(false)} className="bc--white br--small w--50">
            <TitleCustom
              titleIsSpan
              type="h5"
              textColor="main.800"
              className="p--x-big"
            >
              { sponsored?.text }
            </TitleCustom>
          </Modal>
        </>
      )}
      {checked?.title && (
        <>
          {' '}
          <Button
            hasIcon
            onClick={handleFastCheck}
            size="custom"
            color="transparent"
            textColor="main.800"
            className={`pl--0 m${direction === 'rtl' ? 'l' : 'r'}--x-big`}
            on="tap:modal-fast-check.toggleClass(class='modal--show'),modal__overlay-fast-check.toggleClass(class='modal--show'),modal__overlay-fast-check.toggleClass(class='fade')"
            data-google-events={checked.dataGoogleEvents}
          >
            <Icon inline color="lime.500" size="small" prefix="bx" name="check-circle" className={`m${direction === 'rtl' ? 'l' : 'r'}--small`} />
            <span className="fs--small lh--1-7 ff--serif ta--left">
              { checked?.title }
            </span>
          </Button>
          <Modal id="fast-check" isOpen={modalFastCheck} closeModal={() => setModalFastCheck(false)} className="bc--white br--small w--50">
            <TitleCustom
              titleIsSpan
              type="h5"
              textColor="main.800"
              className="p--x-big"
            >
              { checked.text }
            </TitleCustom>
          </Modal>
        </>
      )}
      {evidenceBased?.title && (
        <>
          {' '}
          <Button
            hasIcon
            onClick={handleEvidenceBased}
            size="custom"
            color="transparent"
            textColor="main.800"
            className={`pl--0 m${direction === 'rtl' ? 'l' : 'r'}--x-big`}
            on="tap:modal-evidence-based.toggleClass(class='modal--show'),modal__overlay-evidence-based.toggleClass(class='modal--show'),modal__overlay-evidence-based.toggleClass(class='fade')"
            data-google-events={evidenceBased.dataGoogleEvents}
          >
            <Icon inline color="lime.500" size="small" prefix="bx" name="check-double" className={`m${direction === 'rtl' ? 'l' : 'r'}--small`} />
            <span className="fs--small lh--1-7 ff--serif ta--left">
              { evidenceBased?.title }
            </span>
          </Button>
          <Modal id="evidence-based" isOpen={modalEvidenceBased} closeModal={() => setModalEvidenceBased(false)} className="bc--white br--small w--50">
            <TitleCustom
              titleIsSpan
              type="h5"
              textColor="main.800"
              className="p--x-big"
            >
              { evidenceBased.text }
            </TitleCustom>
          </Modal>
        </>
      )}
      {minutes && (
        <>
          <Icon inline color="indigo.500" size="small" prefix="bx" name="stopwatch" className={`m${direction === 'rtl' ? 'l' : 'r'}--small`} />
          {' '}
          <span className="fs--small lh--1-7 ff--serif ta--left">
            {minutes}
          </span>
        </>
      )}
    </Box>
  );
}

ArticleInfo.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Informs if the article is sponsored with sponsored title and text
   */
  sponsored: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Informs if the article was checked with checked title and text
   */
  checked: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Informs if the article was evidence based
   */
  evidenceBased: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    dataGoogleEvents: PropTypes.string
  }),

  /**
   * Informs reading time text
   */
  minutes: PropTypes.string
};

export default ArticleInfo;
