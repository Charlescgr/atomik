import React, { useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import Box from '../../atoms/Box';

import TitleCustom from '../../molecules/TitleCustom';
import AccordionItem from '../../molecules/AccordionItem';

import { handleCreateStyleClass } from '../../_settings/Utils';

function Accordion({
  firstOpen, openSingle, title: titleBox, titleIsSpan, titleType, textColor, lineColor, lineType, messages, content, ...props
}) {
  const [indexActive, setIndexActive] = useState(null);
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
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const handleInformOpen = (i) => {
    setIndexActive(i);
  };
  return (
    <Box
      className={`accordion-box ${handleCreateStyleClass(props)} p--relative`}
      {...allowedProps}
    >
      {titleBox && (
        <TitleCustom
          titleIsSpan={titleIsSpan}
          type={titleType}
          textColor={textColor}
          lineType={lineType}
          lineColor={lineColor}
          className="mb--normal pb--normal"
        >
          {titleBox}
        </TitleCustom>
      )}
      <Box className="accordion">
        {content?.map(({
          id, title, featured_media: figure, permalink, slug, content: contentFaq
        }, index) => (
          <AccordionItem
            key={id}
            index={index}
            returnIsOpen={(v) => openSingle && (handleInformOpen(v))}
            isOpen={(indexActive === null && index === 0 && firstOpen) || (indexActive === index && openSingle)}
            textColor={textColor}
            accordion={{
              title,
              figure,
              excerpt: contentFaq,
              permalink,
              slug
            }}
            messages={messages}
          />
        ))}
      </Box>
    </Box>
  );
}

Accordion.defaultProps = {
  titleIsSpan: false,
  firstOpen: false,
  openSingle: false
};

Accordion.propTypes = {
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
  className: PropTypes.string
};

export default Accordion;
