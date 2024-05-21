import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Paragraph from '../../atoms/Paragraph';
import Image from '../../atoms/Image';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import TitleCustom from '../../molecules/TitleCustom';

import { listWeeks } from './weeks';

function PregnancyWeeks({
  title, titleIsSpan, messages, ...props
}) {
  const { isDesktop } = useDeviceScreen();
  const { cdnPath } = useTheme();

  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleIsSpan',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    .pregnancy-week__content {
      flex: 1;
    }

    .pregnancy-week__link{
      min-width: 40px;
      min-height: 40px;
      text-align:center;
    }
  `;

  return (
    <Box
      className={`pregnancy-week ${className} d--flex fw--wrap ai--center jc--space-between p--relative ${handleCreateStyleClass(props)} ${!isDesktop ? 'fd--column' : ''}`}
      {...allowedProps}
    >
      <Image src={`${cdnPath}widgets/pregnancy-weeks/pregnancy-40-weeks.svg`} layout="fixed" alt="" width="288" height="200" className={`${isDesktop ? '' : 'mlr--auto mb--small'}`} />
      <Box className={`pregnancy-week__content ${className}`}>
        <TitleCustom titleIsSpan={titleIsSpan} type="h2" textColor="main.600" lineType="dashed" lineColor={`${isDesktop ? 'secondary.200' : 'transparent'}`} className="pb--normal">{title}</TitleCustom>
        {(isDesktop && messages.recommendations !== null) && (
          <A to={messages.recommendations.url} textColor="grey-neutral.500" className={`link-see-more ${className} ff--sans fw--bold p--absolute r--0 t--0 lh--1-5 d--flex ai--center mt--normal`}>
            {messages.recommendations.label}
            <Icon name="chevron-right" color="grey-neutral.500" />
          </A>
        )}
        {messages.textIntro && (
          <Paragraph textColor="gray-neutral.800" className={`${isDesktop ? 'mt--big mb--normal' : 'mtb--small'}`}>{messages.textIntro}</Paragraph>
        )}
        <Box className="d--flex fw--wrap">
          {listWeeks.map(({
            week, id, link, name
          }) => (
            <A
              key={id}
              href={link}
              textColor="white"
              title={name}
              className={`pregnancy-week__link ${className} ff--sans fw--bold d--flex ai--center jc--center mt--normal mr--normal br--small bc--secondary-400`}
            >
              {week}
            </A>
          ))}
        </Box>
      </Box>
      {styles}
    </Box>
  );
}

PregnancyWeeks.defaultProps = {
  titleIsSpan: false
};
PregnancyWeeks.propTypes = {

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    textIntro: PropTypes.string,
    recommendations: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired
};

export default PregnancyWeeks;
