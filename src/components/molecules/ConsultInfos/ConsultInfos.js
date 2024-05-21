import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Span from '../../atoms/Span';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';

import TitleCustom from '../TitleCustom';

function ConsultInfos({
  title, titleType, email, telephone, onlineService, costPerSession, presentialAssistance, messages, orientation, hasBackground, hasBorder, ...props
}) {
  // -- theme
  const { getColor, direction } = useTheme();

  // -- allowedProps
  const propsBlacklist = [
    'title',
    'titleType',
    'email',
    'telephone',
    'onlineService',
    'costPerSession',
    'presentialAssistance',
    'messages',
    'orientation',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- scripts
  const handleGo = (val) => {
    if (!val.includes('@')) {
      window.open(`tel:${val}`);
    } else {
      window.open(`mailto:${val}`, '_blank');
    }
  };

  // -- styles
  const { className, styles } = css.resolve`
    .consult-infos {
      border: 2px solid ${hasBorder ? getColor('grey-neutral.50') : 'transparent'};
      border-radius: ${hasBorder ? '8px' : '0'};
    }
    .badge__online {
      background-color: ${getColor('acqua.50')};
      color: ${getColor('acqua.600')};
    }
    .consult-infos__buttons {
      border-left: 1px solid ${orientation === 'horizontal' ? getColor('grey-neutral.200') : 'transparent'};
    }
  `;

  // -- content
  const contentInfos = () => (
    <>
      <Box className={`consult-infos__main-infos${orientation === 'horizontal' ? ' w--100' : ''}`}>
        {title && (
          <TitleCustom type={titleType} textColor="main.800" className="mlr--big mt--normal mb--small">{title}</TitleCustom>
        )}

        {costPerSession && (
          <Span textColor="grey-neutral.600" className="d--flex ai--center mtb--normal mlr--big ff--sans">
            <Icon inline color="grey-neutral.500" size="normal" prefix="bx" name="dollar-circle" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
            {messages.costPerSession}
            :
            <strong className="ml--normal">
              {costPerSession}
            </strong>
          </Span>
        )}

        {presentialAssistance && (
          <Span textColor="grey-neutral.600" className="d--flex ai--center mtb--normal mlr--big ff--sans">
            <Icon size="normal" name="map" color="grey-neutral.500" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
            {messages?.presentialAssistance}
          </Span>
        )}

        {orientation === 'vertical' && (
          <Divider color="grey-neutral.200" type="solid" className="mlr--big w--auto" />
        )}

      </Box>
      <Box className={`consult-infos__buttons ${className} d--flex ai--center jc--center ${(messages.call || messages.contact) && orientation === 'vertical' ? 'mt--big' : ''}${orientation === 'horizontal' ? ' w--100 ptb--normal' : ''}`}>
        {telephone && (
          <Button hasIcon rounded onClick={() => handleGo(telephone)} textColor="white" color="main.800" size="normal" className="fw--bold mlr--medium">
            <Icon inline color="white" size="normal" prefix="bx" name="phone-call" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
            {' '}
            {messages?.call}
          </Button>
        )}
        {email && (
          <Button hasIcon rounded onClick={() => handleGo(email)} textColor="white" color="blue.600" size="normal" className="fw--bold mlr--medium">
            <Icon inline color="white" size="normal" prefix="bxs" name="chat" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
            {' '}
            {messages?.contact}
          </Button>
        )}
      </Box>
    </>
  );

  return (
    <Box
      className={`consult-infos ${className} ${handleCreateStyleClass(props)} ${hasBackground ? 'bc--grey-neutral-50' : 'transparent'}`}
      {...allowedProps}
    >
      {orientation === 'vertical' ? (
        contentInfos()
      ) : (
        <Box className={`consult-infos__group-infos d--flex ai--center jc--space-between mb--normal ${title ? '' : ' pt--normal'}`}>
          {contentInfos()}
        </Box>
      )}

      {onlineService && (
        <Span className={`badge__online d--flex ai--center fw--semibold plr--big ff--sans p--normal ${orientation === 'horizontal' ? 'mt--normal' : 'mt--big'} ${className}`}>
          <Icon inline name="video" prefix="bxs" color="acqua.600" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
          {messages.onlineService}
        </Span>
      )}

      {/* common styles */}
      {styles}
    </Box>
  );
}

ConsultInfos.defaultProps = {
  titleType: 'h3',
  hasBackground: false,
  hasBorder: false,
  orientation: 'vertical'
};

ConsultInfos.propTypes = {
  /**
   * Inform the render orientation, vertical or horizontal
   */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),

  /**
   * Inform if the component has background
   */
  hasBackground: PropTypes.bool,

  /**
   * Inform if the component has border
   */
  hasBorder: PropTypes.bool,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * The of the container
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The email
   */
  email: PropTypes.string,

  /**
   * The phone number
   */
  telephone: PropTypes.string,

  /**
   * Inform if the this profile attend online
   */
  onlineService: PropTypes.bool,

  /**
    * The value of the consult
    */
  costPerSession: PropTypes.string,

  /**
   * Inform if the this profile attend in person
   */
  presentialAssistance: PropTypes.bool,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    call: PropTypes.string,
    onlineService: PropTypes.string,
    costPerSession: PropTypes.string,
    presentialAssistance: PropTypes.string
  })
};

export default ConsultInfos;
