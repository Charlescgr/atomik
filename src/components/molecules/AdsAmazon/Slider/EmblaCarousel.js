import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import PropTypes from 'prop-types';

import A from '../../../atoms/A';
import Box from '../../../atoms/Box';
import List from '../../../atoms/List';

import { PrevButton, NextButton } from './EmblaCarouselButtons';
import { Thumb } from './EmblaCarouselThumb';
import Styles from './styles';

const EmblaCarousel = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    selectedClass: '',
    dragFree: true
  });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <Styles>
      <Box className="template-slider__main-container">
        <Box className="embla">
          <Box className="embla__viewport" ref={mainViewportRef}>
            <Box className="embla__container">
              {product.slides.map((item) => (
                <Box className="embla__slide" key={item.src}>
                  <Box className="embla__slide__inner">
                    <img
                      className="embla__slide__img"
                      src={item.src}
                      alt={item.alt}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </Box>
        </Box>

        <Box className="embla embla--thumb">
          <Box className="embla__viewport" ref={thumbViewportRef}>
            <Box className="embla__container embla__container--thumb">
              {product.slides.map((item, index) => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={item.src}
                  alt={item.alt}
                  key={item.src}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box className="slider-content-info">
          <Box className="slider-content-info__header">
            <A
              to={product.details.link}
              target="_blank"
              externalLink
              className="aawp-button aawp-button--buy aawp-button aawp-button--amazon aawp-button--icon aawp-button--icon-black"
            >
              {product.messages.seePrice}
            </A>
            {product?.details?.primeLink && (
              <A
                to={product?.details?.primeLink}
                target="_blank"
                externalLink
                className="aawp-check-prime"
              >
                &nbsp;
              </A>
            )}
          </Box>
          <Box className="slider-content__details">
            <A to={product.details.link} className="slider-content__details--link" target="_blank" externalLink>
              {product.details.title}
            </A>
            <List className={'content__list'}>
              {product.details.listDetails.map((item) => (
                <li className={'content__list__item'} key={item}>{item}</li>
              ))}
            </List>
          </Box>
          <Box className="slider-content-info__footer">
            <A
              to={product.details.link}
              target="_blank"
              externalLink
              className="aawp-button aawp-button--buy aawp-button aawp-button--amazon aawp-button--icon aawp-button--icon-black"
            >
              {product.messages.seePrice}
            </A>
            {product?.details?.primeLink && (
              <A
                to={product?.details?.primeLink}
                target="_blank"
                externalLink
                className="aawp-check-prime"
              >
                 &nbsp;
              </A>
            )}
          </Box>
        </Box>
      </Box>
    </Styles>
  );
};

EmblaCarousel.defaultProps = {
  product: {
    slides: [{
      alt: '',
      src: ''
    }],
    messages: {
      seePrice: 'Ver Precio'
    }
  }
};

EmblaCarousel.propTypes = {
  product: PropTypes.shape({
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string
      })),
    details: PropTypes.shape({
      link: PropTypes.string.isRequired,
      primeLink: PropTypes.string,
      listDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    }),
    messages: PropTypes.shape({
      seePrice: PropTypes.string
    })
  })
};

export default EmblaCarousel;
