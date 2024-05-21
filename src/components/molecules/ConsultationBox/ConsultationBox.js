import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import TitleCustom from '../TitleCustom';

function ConsultationBox({
  titleIsSpan,
  figure,
  title,
  messages: {
    professional, description, consult, info
  }, ...props
}) {
  const { theme, colorMode, direction } = useTheme();

  const propsBlacklist = [
    'titleIsSpan',
    'figure',
    'title',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const handleGo = (url) => {
    window.open(url, '_blank');
  };

  const { className, styles } = css.resolve`
    .consultation-box{
      margin-top: ${theme.sizes['15']};
    }
    .consultation-box__figure{
      padding-top: ${theme.sizes['4']};
      top: -165px;
    }
    .consultation-box__figure{
      left: calc(50% - 150px);
    }
  `;

  const backgroundStyle = () => {
    if (colorMode === 'dark') {
      return 'bc--main-1000';
    }
    return 'bc--main-50';
  };

  return (
    <>
      <Box
        className={`consultation-box ${className} ${handleCreateStyleClass(props)} p--relative mb--big pt--x-big pb--big ta--center ${backgroundStyle()} p--relative br--small`}
        {...allowedProps}
      >
        {figure && (
          <figure className={`consultation-box__figure ${className} p--0 b--0 p--absolute`}>
            <Image {...figure} layout="fixed" className={`consultation-box__image ${className}`} />
          </figure>
        )}
        <TitleCustom titleIsSpan={titleIsSpan} type="h3" textColor={colorMode === 'dark' ? 'grey-neutral.100' : 'grey-neutral.800'} className="mt--x-big">{title}</TitleCustom>
        <Paragraph textColor={colorMode === 'dark' ? 'grey-neutral.100' : 'grey-neutral.800'} className="lh--2 m--normal">
          {professional && (
            <>
              <strong>{professional}</strong>
              {' '}
            </>
          )}
          {description}
        </Paragraph>
        <Box className="d--flex ai--center jc--center">
          {consult && (
            <Button hasIcon rounded onClick={() => handleGo(consult.url)} textColor="white" color="main.600" size="normal" className="fw--bold mlr--medium">
              <Icon inline color="white" size="normal" prefix="bx" name="calendar-check" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
              {' '}
              {consult.label}
            </Button>
          )}
          {info && (
            <Button hasIcon rounded onClick={() => handleGo(info.url)} textColor="white" color="secondary.600" size="normal" className="fw--bold mlr--medium">
              <Icon inline color="white" size="normal" prefix="bxs" name="info-circle" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
              {' '}
              {info.label}
            </Button>
          )}
        </Box>
      </Box>

      {/* common styles */}
      {styles}
    </>
  );
}

ConsultationBox.defaultProps = {
  titleIsSpan: false,
};

ConsultationBox.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The title from content
   */
  title: PropTypes.string.isRequired,

  /**
   * The content text / description and links
   */
  messages: PropTypes.shape({
    professional: PropTypes.string,
    description: PropTypes.string.isRequired,
    consult: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }),
    info: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    })
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Image props.
   */
  figure: PropTypes.object
};

export default ConsultationBox;
