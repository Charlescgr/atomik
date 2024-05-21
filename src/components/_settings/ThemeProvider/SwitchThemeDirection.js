import React from 'react';
import PropTypes from 'prop-types';

const SwitchThemeDirection = ({
  onText,
  offText,
  value,
  onChange
}) => (
  <>
    <div className="column__field">
      <label
        htmlFor="checkbox-direction"
        className="switch d--inline-block c--white fs--normal ff--sans lh--2 mtb--big"
      >
        <input
          type="checkbox"
          id="checkbox-direction"
          name="checkbox-direction"
          className="switch__input ta--right p--absolute c--black zi--11"
          checked={value}
          onChange={onChange}
        />
        <span className="switch__slider">
          {onText}
        </span>
      </label>
    </div>
    <style jsx>
      {`
        // custom styles
        .column__field {
          margin-right: 20px;
          font-family: sans-serif;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 110px;
          height: 34px;
          background-color: #ccc;
          margin: 0;
        }

        .switch .switch__input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch__slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: transparent;
          -webkit-transition: .4s;
          transition: .4s;
          font-family: sans-serif;
          line-height: 34px;
          padding-left: 8px;
          z-index: 11;
          text-align: start;
          color: black;
        }

        .switch__slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 50px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
          z-index: -1;
        }

        .switch__input:checked + .switch__slider {
          background-color: #2196F3;
        }

        .switch__input:focus + .switch__slider {
          box-shadow: 0 0 1px #2196F3;
        }

        .switch__input:checked + .switch__slider:before {
          -webkit-transform: translateX(50px);
          -ms-transform: translateX(50px);
          transform: translateX(50px);
        }

        .switch__input + .switch__slider:after {
          content: "${offText}";
          position: absolute;
          line-height: 34px;
          text-align: end;
          right: 8px;

        }
      `}
    </style>
  </>
);

SwitchThemeDirection.propTypes = {
  /**
   * The onText property
   */
  onText: PropTypes.string,
  /**
   * The ofText property
   */
  offText: PropTypes.string,
  /**
   * The raw value
   */
  value: PropTypes.any,
  /**
   * Onchange callback function
   */
  onChange: PropTypes.func
};

export default SwitchThemeDirection;
