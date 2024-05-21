/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import css from 'styled-jsx/css';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Box from '../../atoms/Box';

import A from '../../atoms/A';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';

import TitleCustom from '../../molecules/TitleCustom';

function KeyTermsContent({
  title, titleType, terms, titleIsSpan, activeTerm, messages, ...props
}) {
  // -- allowed props
  const propsBlacklist = [
    'title',
    'titleType',
    'titleIsSpan',
    'terms',
    'activeTerm',
    'messages',
    'className',
  ];
  const allowedProps = omit(props, propsBlacklist);

  // -- state
  const [showTermContent, setShowTermContent] = useState(activeTerm);
  const [graterHeight, setGraterHeight] = useState();

  // -- hook
  const { isDesktop } = useDeviceScreen();

  // -- context
  const { theme, cdnPath, direction } = useTheme();

  // -- css style
  const { className, styles } = css.resolve`
    .terms__content {
      background-repeat: no-repeat;
      background-position: 97% 95%;
      background-size: 150px;
      background-image:url(${cdnPath}themes/${theme.base}/symbol__color.svg);

      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }
    .terms__content.is--active{
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease-in;
    }
  `;

  // -- scripts
  const handleClickTerm = (term) => {
    setShowTermContent(term);
  };

  const handeGraterHeight = () => {
    const contents = document.getElementsByClassName('terms__content');
    let lastHeight = 0;
    Array.prototype.forEach.call(contents, (element) => {
      const rect = element.getBoundingClientRect();
      if (rect.height > lastHeight) {
        lastHeight = rect.height;
        setGraterHeight(rect.height);
      }
    });
  };

  useEffect(() => {
    handeGraterHeight();
    window.addEventListener('resize', handeGraterHeight);
    return () => {
      window.removeEventListener('resize', handeGraterHeight);
    };
  }, []);

  return (
    <Box
      className={`keys-terms ${className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {title && (
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.400" className="mb--small pb--normal">
          {title}
        </TitleCustom>
      )}
      <Row className={`pb--big ${isDesktop ? 'pt--big' : 'pt--normal'}`}>
        <Col colSize="6">
          <Box className={`d--flex jc--flex-start mtb--big fw--wrap fd--row ${isDesktop ? `p${direction === 'rtl' ? 'l' : 'r'}--x-big` : ''}`}>
            {terms?.map(({ id, title: keyName }, index) => (
              <Button
                key={id}
                rounded
                withAnimation
                invertOnHover
                onClick={() => handleClickTerm(index)}
                size="medium"
                color={index === showTermContent ? 'main.800' : 'grey-neutral.100'}
                textColor={index === showTermContent ? 'grey-neutral.100' : 'main.800'}
                className={`fw--bold m${direction === 'rtl' ? 'l' : 'r'}--medium mb--medium ${index === showTermContent ? ' is--active' : ''}`}
              >
                {keyName}
              </Button>
            ))}
          </Box>
        </Col>
        <Col colSize="6" className="p--relative" style={{ height: `${graterHeight}px` }}>

          {terms?.map(({
            id, title: keyName, content, permalink
          }, index) => (
            <Box
              key={id}
              className={`terms__content ${className} p--x-big br--small p--absolute t--0 l--0 bc--main-100${index === showTermContent ? ' is--active' : ''}`}
            >
              <TitleCustom titleIsSpan type="h3" textColor="grey-neutral.900">{keyName}</TitleCustom>
              <Paragraph className="ptb--normal">{content}</Paragraph>
              {messages?.learnMore && (
                <A to={permalink} title={`${messages.learnMore} ${keyName}`} size="normal" className="ff--serif mt--x-big d--flex ai--center">
                  <Icon name="plus-circle" color="main.800" className="mr--normal" />
                  {' '}
                  <span className="c--secondary-700">
                    <strong className="c--main-800 mr--normal">
                      {messages?.learnMore}
                      :
                    </strong>
                    {' '}
                    {keyName}
                  </span>
                </A>
              )}
            </Box>
          ))}

        </Col>
      </Row>

      {/* custom styles */}
      {styles}
    </Box>
  );
}

KeyTermsContent.defaultProps = {
  titleIsSpan: false,
  titleType: 'h2'
};

KeyTermsContent.propTypes = {
  /**
   * The index of the active term
   */
  activeTerm: PropTypes.number,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Container title
   */
  title: PropTypes.string,

  /**
   * The type of title
   */
  titleType: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The list of terms (array of objects)
   */
  terms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      permalink: PropTypes.string
    })
  ).isRequired,

  /**
   * Text for the component
   */
  messages: PropTypes.shape({
    learnMore: PropTypes.string
  })
};

export default KeyTermsContent;
