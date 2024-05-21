import React from 'react';
import PropTypes from 'prop-types';

function HelpersClasses({ data }) {
  return (
    <style jsx global>
      {`
        .overlay {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.8);
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
        }

        .t--1 {
          top: ${data.sizes[1]};
        }
        .t--5 {
          top: ${data.sizes[5]};
        }
        .t--10 {
          top: ${data.sizes[10]};
        }

        .t--0 {
          top: 0;
        }
        .b--0 {
          bottom: 0;
        }
        .l--0 {
          left: 0;
        }
        .r--0 {
          right: 0;
        }

        .p--relative {
          position: relative;
        }
        .p--absolute {
          position: absolute;
        }
        .p--fixed {
          position: fixed;
        }
        .p--sticky {
          position: sticky;
        }
        .v--hidden{
          visibility: hidden;
        }
        .v--visible{
          visibility: visible;
        }

        .d--none {
          display: none;
        }
        .d--block {
          display: block;
        }
        .d--inline-block {
          display: inline-block;
        }
        .d--inline {
          display: inline;
        }
        .d--table {
          display: table;
        }

        .d--flex {
          display: flex;
        }
        .f--1 {
          flex: 1;
        }
        .d--inline-flex {
          display: inline-flex;
        }
        .ai--center {
          align-items: center;
        }
        .ai--flex-end {
          align-items: flex-end;
        }
        .ai--flex-start {
          align-items: flex-start;
        }
        .as--center {
          align-self: center;
        }
        .jc--space-between {
          justify-content: space-between;
        }
        .jc--space-around {
          justify-content: space-around;
        }
        .jc--flex-end {
          justify-content: flex-end;
        }
        .jc--center {
          justify-content: center;
        }
        .jc--flex-start {
          justify-content: flex-start;
        }
        .fd--column {
          flex-direction: column;
        }
        .fd--row {
          flex-direction: row;
        }
        .fd--row-reverse {
          flex-direction: row-reverse;
        }
        .ff--row{
          flex-flow: row;
        }
        .ff--column{
          flex-flow: column;
        }
        .fd--column-reverse {
          flex-direction: column-reverse;
        }
        .fw--wrap {
          flex-wrap: wrap;
        }

        .f--right {
          float: right;
        }
        .f--left {
          float: left;
        }

        .h--100 {
          height: 100%;
        }
        .mh--140 {
          min-height: 140px;
        }

        .w--100 {
          width: 100%;
        }
        .w--75 {
          width: 75%;
        }
        .w--50 {
          width: 50%;
        }
        .w--25 {
          width: 25%;
        }

        .w--auto {
          width: auto;
        }

        .c--both {
          clear: both;
        }
        .c--pointer {
          cursor: pointer;
        }
        .c--not-alowed{
          cursor: not-allowed;
        }

        .o--none {
          outline: none;
        }
        .o--100 {
          opacity: 1;
        }
        .o--75 {
          opacity: 0.75;
        }
        .o--50 {
          opacity: 0.5;
        }
        .o--25 {
          opacity: 0.25;
        }
        .b--none {
          border: none;
        }
        .of--cover {
          object-fit: cover;
        }

        .o--hidden{
          overflow: hidden;
        }
        .o--scroll{
          overflow: scroll;
        }
       .o--x-scroll{
          overflow-x: scroll;
        }
        .o--y-scroll{
          overflow-y: scroll;
        }

        .br--small {
          border-radius: ${data.spacings.small};
        }
        .brb--small {
          border-bottom-left-radius: ${data.spacings.small};
          border-bottom-right-radius:  ${data.spacings.small};
        }
        .brr--small {
          border-top-right-radius: ${data.spacings.small};
          border-bottom-right-radius:  ${data.spacings.small};
        }
        .brl--small {
          border-top-left-radius: ${data.spacings.small};
          border-bottom-left-radius:  ${data.spacings.small};
        }
        .brt--small {
          border-top-right-radius: ${data.spacings.small};
          border-top-left-radius: ${data.spacings.small};
        }
        .brt--normal {
          border-top-right-radius: ${data.spacings.normal};
          border-top-left-radius: ${data.spacings.normal};
        }

        .br--normal {
          border-radius: ${data.spacings.normal};
        }
        .br--big {
          border-radius: ${data.spacings.big};
        }
        .br--x-big {
          border-radius: ${data.spacings['x-big']};
        }

        .br--50 {
          border-radius: 50%;
        }
        .bs--small {
          box-shadow: ${data.shadows.small};
        }
        .bs--default {
          box-shadow: ${data.shadows.default};
        }

        .bs--medium {
          box-shadow: ${data.shadows.medium};
        }

        .bs--strong {
          box-shadow: ${data.shadows.strong};
        }
        .zi--12 {
          z-index: 12;
        }
        .zi--11 {
          z-index: 11;
        }
        .zi--10 {
          z-index: 10;
        }
        .zi--9 {
          z-index: 9;
        }
        .zi--8 {
          z-index: 8;
        }
        .zi--7 {
          z-index: 7;
        }
        .zi--6 {
          z-index: 6;
        }
        .zi--5 {
          z-index: 5;
        }
        .zi--1 {
          z-index: 1;
        }

        .lst--disc{
          list-style-type: disc;
        }
        .lst--decimal{
          list-style-type: decimal;
        }
        @media (max-width: 899px) {
          .hidden-mobile {
            display: none;
          }
        }
        @media (min-width: 900px) {
          .hidden-desktop {
            display: none;
          }
        }
      `}
    </style>
  );
}

HelpersClasses.propTypes = {
  /**
   * The object theme.
   */
  data: PropTypes.any
};

export default HelpersClasses;
