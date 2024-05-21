import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import Box from '../../atoms/Box';
import Container from '../../atoms/Container';
import Accordion from '../Accordion';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function AccordionFullBg({
  firstOpen, openSingle, title, titleIsSpan, titleType, textColor, lineColor, lineType, messages, content, background, ...props
}) {
  const propsBlacklist = [
    'firstOpen',
    'openSingle',
    'title',
    'titleIsSpan',
    'titleType',
    'textColor',
    'lineColor',
    'lineType',
    'messages',
    'content',
    'background',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const { theme, getColor, colorMode } = useTheme();
  return (
    <Box
      className={`accordion-full-bg ${handleCreateStyleClass(props)} p--relative`}
      {...allowedProps}
    >
      <Container wrap className="plr--big">
        <Accordion
          title={title}
          firstOpen={firstOpen}
          openSingle={openSingle}
          titleIsSpan={titleIsSpan}
          lineType={lineType}
          titleType={titleType}
          textColor={textColor}
          lineColor={lineColor}
          content={content}
          messages={messages}
          className="accordion__full"
        />
      </Container>

      {/* custom styles */}
      <style jsx global>
        {`
          /* *** schema
            .accordion__full
              h2
              .accordion
                .acordion-item
                  .button
                    span
                  .box-awnswer
                    img
                    p
                hr
          */
          .accordion-full-bg {
            background-color: ${getColor(background)};
          }

          .accordion__full .accordion{
            padding: 4px 0 8px 0;
          }

          .accordion__full .accordion-item {
            margin: 8px 0;
            padding: 0px;
            border: 1px solid ${getColor('grey-neutral.200')};
            border-radius: ${theme.configBase['border-radius']};
          }

          .accordion__full .button{
            padding: 8px 16px;
            border-radius:${theme.configBase['border-radius']} ${theme.configBase['border-radius']} 0 0;
          }
          .accordion__full .button span{
            color: ${getColor('main.700')};
            font-size: ${theme.fontSizes['xx-medium']};
          }
          .accordion__full .button.active{
            background-color: ${getColor('main.700')};
          }
          .accordion__full .button.active span{
            color: #ffffff;
          }
          .accordion__full .button.active span path{
            fill: #ffffff;
          }

          .accordion__full .box-answer{
            background-color: ${colorMode === 'dark' ? getColor('main.100') : 'white'};
            color: ${getColor(colorMode === 'dark' ? 'grey-neutral.900' : 'grey-neutral.800')};
            border-radius:0 0 ${theme.configBase['border-radius']} ${theme.configBase['border-radius']};
            display: flex;
            justify-content: space-between;
          }
          .accordion__full .box-answer p{
            color: ${getColor(colorMode === 'dark' ? 'grey-neutral.900' : 'grey-neutral.600')};
          }
          .accordion__full .box-answer img{
            margin:16px;
            width: 215px;
            height: 120px;
            order: 2;
            display: none;
          }
          .accordion__full .box-answer p{
            padding:8px 16px;
            order: 1;
          }

          .accordion__full .divider{
            background: none;
            height: 0;
          }

          @media only screen and (min-width: ${theme.medias.tablet}) {
            .accordion__full .box-answer img{
              display: flex;
            }
          }
      `}
      </style>
    </Box>

  );
}

AccordionFullBg.propTypes = {
  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,

  /**
   * The title from the box
   */
  title: PropTypes.string,

  /**
   * The heading level type
   */
  titleType: PropTypes.string.isRequired,

  /**
   * The color of text
   */
  textColor: PropTypes.string,

  /**
   * The type of underline eg: dotted, dashed, solid
   */
  lineType: PropTypes.string,

  /**
   * The color of underline
   */
  lineColor: PropTypes.string,

  /**
   * Informs if the first question is open
   */
  firstOpen: PropTypes.bool,

  /**
   * Informs if just one question stay open
   */
  openSingle: PropTypes.bool,

  /**
   * The list of questions/answers (array of objects)
   */
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      featured_media: PropTypes.any,
      content: PropTypes.string,
      permalink: PropTypes.string,
      slug: PropTypes.string
    })
  ).isRequired,

  /**
   * The texts
   */
  messages: PropTypes.shape({
    readMore: PropTypes.string
  }).isRequired,

  /**
   * Custom ClassNames
   */
  className: PropTypes.string,

  /**
   * The background color from the parent box
   */
  background: PropTypes.string
};

export default AccordionFullBg;
