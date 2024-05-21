import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import Divider from '../../atoms/Divider';

import TitleCustom from '../../molecules/TitleCustom';

import Address from './Address';

function ContactBox({
  title, titleType, showOpenAddress, showOpenCloseControl, social = {}, clinics = [], messages, ...props
}) {
  const propsBlacklist = [
    'title',
    'showOpenCloseControl',
    'showOpenAddress',
    'titleType',
    'social',
    'clinics',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  return (
    <Box
      className={`contacts-list ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom type={titleType} textColor="main.800">{title}</TitleCustom>
      )}

      <Divider color="main.300" type="dashed" className="mt--0" />

      {Object.keys(social).length !== 0 && (
        <>
          <List className="d--flex ai--center jc--space-around mt--big mb--medium">
            {Object.keys(social).map((item) => (
              <li key={item}>
                <A to={social[item]} externalLink target="_blank">
                  <Icon inline size="medium" prefix={`bx${item !== 'website' ? 'l' : ''}`} name={item === 'website' ? 'world' : item} color="main.800" />
                </A>
              </li>
            ))}
          </List>
          <Divider color="main.300" type="dashed" />
        </>
      )}

      {clinics?.slice(0, 2)?.map(({
        id, address
      }, index) => (
        <Address
          key={id}
          index={index}
          title={messages.addressTitle[index].title}
          titleType={titleType}
          showOpenCloseControl={showOpenCloseControl}
          showOpenAddress={showOpenAddress}
          address={address}
          messages={messages}
        />
      ))}

      <A to={messages?.correctData.url} textColor="main.800" className="ta--center mtb--big d--table mlr--auto ff--sans">{messages?.correctData.label}</A>
    </Box>
  );
}

ContactBox.propTypes = {
  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * Show address open/close controls
   */
  showOpenCloseControl: PropTypes.bool,

  /**
   * Show address open or closed
   */
  showOpenAddress: PropTypes.bool,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * The list of social links
   */
  social: PropTypes.objectOf(PropTypes.string),

  /**
   * The clinics infos (array of objects)
   */
  clinics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      phone_number: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.number
    })
  ).isRequired,

  /**
   * Texts content
   */
  messages: PropTypes.shape({
    addressTitle: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string
      })
    ),
    call: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }),
    contact: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }),
    correctData: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  })
};

export default ContactBox;
