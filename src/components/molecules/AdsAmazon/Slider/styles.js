import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '../../../_settings/ThemeProvider/ThemeContext';

const Style = ({ children }) => {
  const { theme, direction } = useTheme();

  return (
    <>
      {children}
      <style jsx global>
        {`

        .template-slider__main-container {
          display: flex;
          flex-direction: column;
          align-items: center;

          max-width: 670px;
        }

        .embla__button {
          outline: 0;
          cursor: pointer;
          background-color: transparent;
          touch-action: manipulation;
          position: absolute;
          z-index: 1;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          width: 30px;
          height: 30px;
          justify-content: center;
          align-items: center;
          fill: #59B1D3;
          padding: 0;
        }

        .embla__button:disabled {
          cursor: default;
          opacity: 0.3;
        }

        .embla__button__svg {
          width: 100%;
          height: 100%;
        }

        .embla__button--prev {
          left: 0px;
        }

        .embla__button--next {
          right: 0px;
        }

        .footer {
          display: flex;
          align-items: center;
          margin-bottom: 5rem;
          margin-right: auto;
          margin-left: auto;
          max-width: 80rem;
          padding-right: 2.5rem;
          padding-left: 2.5rem;
        }

        .footer__text {
          margin-right: 1rem;
        }

        .footer__text__highlight {
          color: #1bcacd;
          font-weight: bold;
        }

        .footer__iframe {
          font-size: 0;
          height: 30px;
        }

        .embla {
          position: relative;
          background-color: #f7f7f7;
          padding: 20px;
          max-width: 670px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .embla__viewport {
          overflow: hidden;
          width: 100%;
        }

        .embla__viewport.is-draggable {
          cursor: move;
          cursor: grab;
        }

        .embla__viewport.is-dragging {
          cursor: grabbing;
        }

        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          margin-left: -10px;
        }

        .embla__slide {
          padding-left: 10px;
          min-width: 100%;
          position: relative;
        }

        .embla__slide__inner {
          position: relative;
          overflow: hidden;
          height: 480px;
        }

        .embla__slide__img {
          position: absolute;
          display: block;
          top: 50%;
          left: 50%;
          width: auto;
          min-height: 100%;
          max-width: none;
          transform: translate(-50%, -50%);
          height: 100%;
        }

        .embla--thumb {
          padding-top: 0;
        }

        .embla__container--thumb {
          cursor: default;
          margin-left: -8px;
        }

        .embla__slide--thumb {
          padding-left: 8px;
          min-width: 20%;
        }

        .embla__slide__inner--thumb {
          touch-action: manipulation;
          cursor: pointer;
          border: 0;
          outline: 0;
          margin: 0;
          padding: 0;
          height: 100px;
          width: 100%;
          background-color: transparent;
          position: relative;
          display: block;
          overflow: hidden;
        }

        .embla__slide__thumbnail {
          object-fit: contain;
          position: absolute;
          opacity: 0.2;
          top: 0;
          bottom: 0;
          left: -10000%;
          right: -10000%;
          margin: auto;
          min-height: 1000%;
          max-width: none;
          transform: scale(0.1);
          transition: opacity 0.2s;
        }

        .embla__slide--thumb.is-selected .embla__slide__thumbnail {
          opacity: 1;
        }

        .slider-content-info {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .slider-content-info__header {
          display: flex;
          justify-content: center;
          padding: 20px 20px 20px 20px;
          display: flex;
          align-items: center;
          background-color: #003;
        }

        .slider-content-info__footer {
          display: flex;
          justify-content: center;
          padding: 20px 20px 20px 20px;
          display: flex;
          align-items: center;
          background-color: #003;
        }

        .content__list {
          margin: 0 auto;
          padding: 0 0 0 20px;
          list-style-type: disc;
          max-width: 600px;
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .content__list__item {
          color: #333;
          font-size: 17px;
          font-weight: 500;
          line-height: 2rem;
          position: relative;
          font-family: ${theme.fontFamilies.sans};
          width: 100%;
        }

        .slider-content__details {
          background-color: #fff;
          border-left: 1px solid #003;
          border-right: 1px solid #003;
        }

        .slider-content__details--link {
          font-family: ${theme.fontFamilies.sans};
          font-size: 28px;
          letter-spacing: -.6px;
          margin: 0 10px;
          word-wrap: break-word;
          color: #003;
          display: inline-block;
          text-align: center;
          margin-top: 25px;
        }

        .footer__link {
          display: flex;
          align-items: center;
          background-color: transparent;
          text-decoration: none;
          border-radius: 30px;
          text-align: center;
          font-weight: bold;
          color: black;
          font-size: 14px;
        }

        .footer__link__svg {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          fill: rgb(192, 192, 192);
        }

        .header {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          padding: 40px 20px 20px 20px;
        }

        .aawp-button.aawp-button--icon, .aawp .aawp-button.aawp-button--icon {
          position: relative;
          padding-left: 32px;
          font-family: ${theme.fontFamilies.sans};
        }

        .aawp-button.aawp-button--amazon, .aawp .aawp-button.aawp-button--amazon {
          border-color: #9c7e31 #90742d #786025;
          border-radius: 3px;
          box-shadow: inset 0 1px 0 hsl(0deg 0% 100% / 40%);
          background: #f0c14b;
          background: linear-gradient(180deg,#f7dfa5,#f0c14b) repeat scroll 0 0 transparent;
          color: #111;
          width: 200px;
        }

        .aawp-button, .aawp .aawp-button {
          box-sizing: border-box;
          display: inline-block;
          margin: 0;
          padding: 7px 12px 6px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 400;
          line-height: 19px;
          text-align: center;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #ccc;
          color: #333;
        }

        .aawp-button.aawp-button--icon-black:before, .aawp .aawp-button.aawp-button--icon-black:before {
          background-image: url(https://www.comprarmicafetera.com/wp-content/plugins/aawp/assets/img/icon-amazon-black.svg);
        }

        .aawp-button.aawp-button--icon:before, .aawp .aawp-button.aawp-button--icon:before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-repeat: no-repeat;
          background-size: 14px 14px;
          background-position: 9px;
        }

        .aawp a.aawp-check-premium, .aawp a.aawp-check-premium:active, .aawp a.aawp-check-premium:focus, .aawp a.aawp-check-premium:hover, .aawp a.aawp-check-premium:visited, .aawp a.aawp-check-prime, .aawp a.aawp-check-prime:active, .aawp a.aawp-check-prime:focus, .aawp a.aawp-check-prime:hover, .aawp a.aawp-check-prime:visited, a.aawp-check-premium, a.aawp-check-premium:active, a.aawp-check-premium:focus, a.aawp-check-premium:hover, a.aawp-check-premium:visited, a.aawp-check-prime, a.aawp-check-prime:active, a.aawp-check-prime:focus, a.aawp-check-prime:hover, a.aawp-check-prime:visited {
          border: none;
          box-shadow: none;
          outline: none;
          text-decoration: none;
        }

        .aawp-check-prime, .aawp .aawp-check-prime {
          display: inline-block;
          width: 55px;
          height: 16px;
          margin-${direction === 'rtl' ? 'right' : 'left'}: 8px;
          vertical-align: middle;
          background-position: -185px -182px;
          background-image: url(https://m.media-amazon.com/images/S/sash/E6vgqiIirWgGb3f.png);
          background-size: 512px 256px;
          background-repeat: no-repeat;
          margin-left: 50px;
        }

        @media only screen and (max-width: ${theme.medias.tablet}) {
          .embla {
            height: 300px;
            padding: 8px;
          }

          .slider-content-info__header {
            flex-direction: column;
          }

          .slider-content-info__footer {
            flex-direction: column;
          }

          .content__list {
            padding-left: 25px;
          }

          .aawp-check-prime {
            margin-left: 0;
            margin-top: 16px;
          }

          .slider-content__details--link {
            font-size: 24px;
          }

          .embla.embla--thumb {
            height: 100%;
          }

          .embla__viewport {
            height: 100%;
          }

          .embla__container {
            height: 100%;
          }

          .embla__slide__img {
            object-fit: contain;
          }

          .embla__slide__inner {
            height: 100%;
          }

          .embla__slide--thumb {
            min-width: 35%;
          }

          .embla__container--thumb {
            height: 100px;
            display: flex;
            column-gap: 8px;
          }
        }
      `}
      </style>
    </>
  );
};

Style.propTypes = {
  children: PropTypes.any
};

export default Style;
