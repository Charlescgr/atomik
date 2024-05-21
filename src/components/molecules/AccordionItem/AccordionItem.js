import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import Paragraph from '../../atoms/Paragraph';
import TitleCustom from '../TitleCustom';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function AccordionItem({
  index,
  isOpen,
  accordion: {
    title, figure, excerpt
  }, textColor, messages, returnIsOpen, ...props
}) {
  const [active, setActive] = useState(isOpen ? 'active' : '');
  const [heightSize, setHeightSize] = useState('0px');

  const { direction } = useTheme();
  const heightAnsware = useRef(null);

  const propsBlacklist = [
    'index',
    'accordion',
    'textColor',
    'messages',
    'isOpen',
    'returnIsOpen',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  // open/close first accordion answer
  useLayoutEffect(() => {
    setActive(isOpen ? 'active' : '');
    setHeightSize(isOpen ? `${heightAnsware.current.scrollHeight + 16}px` : '0px');
  }, [isOpen]);

  // toggle open/close accordion answers
  const handleToggle = () => {
    setActive(active === '' && !isOpen ? 'active' : '');
    setHeightSize(active === 'active' ? '0px' : `${heightAnsware.current.scrollHeight}px`);

    returnIsOpen(active === '' ? index : -1);
  };

  const { className, styles } = css.resolve`
    .box-answer{
      max-height: 0;
      opacity: 0;
      transition: all 0.5s ease;
    }
    .item-open .box-answer{
      opacity: 1;
    }
    .divider-accordion{
      height: 2px;
    }
  `;

  return (
    <Box
      className={`accordion-item ${className} item-${active === '' ? 'close' : 'open'}${handleCreateStyleClass(props)} p--relative`}
      {...allowedProps}
    >
      <Button type="button" onClick={handleToggle} size="custom" className={`box-question ${active} plr--0 mlr--0 w--100 ta--left`}>
        <TitleCustom titleIsSpan type="h4" textColor={textColor} className="p--relative w--100">
          {title}
          <Icon name={`chevron-${active === '' ? 'down' : 'up'}`} color="main.800" className={`p--absolute t--0 ${direction === 'rtl' ? 'l' : 'r'}--0 mt--small`} />
        </TitleCustom>
      </Button>
      <div ref={heightAnsware} className={`box-answer o--hidden ${className}`} style={{ maxHeight: `${heightSize}` }}>
        <Image src={figure} alt={title} width="526" height="165" className="mtb--normal w--100 of--cover" />
        <Paragraph textColor={textColor}>
          {excerpt}
          {' '}
          {/* <A to={permalink || slug} textColor="secondary.600" className="fw--bold">{messages.readMore}</A> */}
        </Paragraph>
      </div>
      <Divider type="dashed" color={textColor} className={`divider-accordion ${className} mtb--0`} />

      {/* common and custom styles */}
      {styles}
    </Box>
  );
}

AccordionItem.defaultProps = {
  textColor: 'main.800',
  isOpen: false,
};

AccordionItem.propTypes = {
  /**
   * The index position on loop of this component/item
   */
  index: PropTypes.number,

  /**
   * The title from the item
   */
  title: PropTypes.string,

  /**
   * The color of text
   */
  textColor: PropTypes.string,

  /**
   * Informs if the item is open
   */
  isOpen: PropTypes.bool,

  /**
   * Return to parent component if this child component is open/close
   */
  returnIsOpen: PropTypes.func,

  /**
   * The contem of this item
   */
  accordion: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    figure: PropTypes.any,
    excerpt: PropTypes.string,
    permalink: PropTypes.string,
    slug: PropTypes.string
  }).isRequired,

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

export default AccordionItem;
