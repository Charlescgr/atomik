import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import Container from '../../atoms/Container';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

import Paragraph from '../../atoms/Paragraph';
import Divider from '../../atoms/Divider';
import Box from '../../atoms/Box';

import TitleCustom from '../TitleCustom';

function Editorial({ content, titleIsSpan, ...props }) {
  const { isDesktop } = useDeviceScreen();

  // -- allowed props
  const propsBlacklist = [
    'content',
    'titleIsSpan',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { direction } = useTheme();

  const { className, styles } = css.resolve`
    .editorial-box {
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
    }
  `;

  return (
    <Box
      className={`editorial-box ${className} bc--main-50 ptb--big ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Container wrap className="plr--big">
        <Row className={`two__columns__padding${direction === 'rtl' ? '-reverse' : ''} ${className}`}>
          <Col colSize="4" className={`${className}`}>
            {content.map(({
              id, type, title, text
            }) => {
              if (type === 'intro') {
                return (
                  <React.Fragment key={id}>
                    <TitleCustom titleIsSpan={titleIsSpan} type="h2" textColor="main.600" className={isDesktop ? `p${direction === 'rtl' ? 'l' : 'r'}--x-medium` : ''}>{title}</TitleCustom>
                    <Paragraph className={`pt--normal ${isDesktop ? `p${direction === 'rtl' ? 'l' : 'r'}--x-big` : ''}`}>{text}</Paragraph>
                  </React.Fragment>
                );
              }
              return null;
            }
            )}
          </Col>
          <Col colSize="8" className={`${className}`}>
            {content.map(({
              id, type, title, text
            }, index, arrayRef) => {
              if (type !== 'intro') {
                return (
                  <React.Fragment key={id}>
                    <TitleCustom titleIsSpan={titleIsSpan} type="h3" textColor="main.600" className={`${!isDesktop && ('mtb--normal')}`}>{title}</TitleCustom>
                    <div
                      className="ls--medium lh--2 fs--normal ff--serif c--grey-neutral-800"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                    {isDesktop && (index < arrayRef.length - 1) && (
                      <Divider key={id} color="main.200" type="dashed" className="mb--x-medium" />
                    )}
                  </React.Fragment>
                );
              }
              return null;
            }
            )}
          </Col>
        </Row>
      </Container>
      {styles}
    </Box>
  );
}

Editorial.defaultProps = {
  titleIsSpan: false
};

Editorial.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The object content
   */
  content: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number,
      type: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })
  ),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Editorial;
