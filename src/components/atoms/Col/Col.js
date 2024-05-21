import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { useAmp } from 'next/amp';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function Col({
  children, ...props
}) {
  const propsBlacklist = [
    'children',
    'className',
    'colSize'
  ];
  const allowedProps = omit(props, propsBlacklist);
  const { theme } = useTheme();
  const isAmp = useAmp();

  const globalStyles = !isAmp && (
    <style jsx global>
      {`
        @media only screen and (min-width: ${theme.medias.tablet}){
          .column__aside{
            width:301px;
          }
        }
      `}
    </style>
  );

  return (
    <div
      className={`column ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      {children}
      <style jsx>
        {`
        /* MOBILE AND SMALL TABLETS */
        .column {
          box-sizing: border-box;
          flex-basis: 100%;
          max-width: 100%;
          min-width: 0;
        }

        /* IPADS and ALL DESKTOP SCREEN */
        @media only screen and (min-width: 900px) {
          .column{
            flex: 1 0 100%;
          }
          .column--1 {
            max-width: 8.3333333333%;
          }
          .column--2 {
            max-width: 16.6666666667%;
          }
          .column--3 {
            max-width: 25%;
          }
          .column--4 {
            max-width: 33.3333333333%;
          }
          .column--5 {
            max-width: 41.6666666667%;
          }
          .column--6 {
            max-width: 50%;
          }
          .column--7 {
            max-width: 58.3333333333%;
          }
          .column--8 {
            max-width: 66.6666666667%;
          }
          .column--9 {
            max-width: 75%;
          }
          .column--10 {
            max-width: 83.3333333333%;
          }
          .column--11 {
            max-width: 91.6666666667%;
          }

          .column--12 {
            flex-basis: 100%;
          }
          .column--auto{
            flex: 1 0 0;
            max-width:100%;
            min-width:0;
          }
          .column--fixed {
            flex: initial;
          }
        }
        `}
      </style>
      {globalStyles}
    </div>
  );
}

Col.propTypes = {
  /**
   * The type of column size 1,2,6,10 | auto | fixed
   */
  colSize: PropTypes.string,

  /**
   * The children element
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default Col;
