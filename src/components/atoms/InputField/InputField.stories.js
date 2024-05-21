import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import InputField from './InputField';
import Label from '../Label';

export default {
  title: 'Components/Atoms/InputField',
  component: InputField,
  decorators: [withA11y],
  parameters: {
    options: {
      selectedPanel: true,
      showPanel: true,
      showNav: true,
      isToolshown: true
    },
    notes: 'type the notes here.'
  }
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <FormattedMessage {...messages.textInput}>
        {(msg) => (
          <InputField
            name="firstName"
            id="firstName"
            value={value}
            onChange={(v) => setValue(v)}
            required
            type="text"
            placeholder={msg}
            className="mb--medium"
          />
        )}
      </FormattedMessage>
      <p className="ff--sans fs--small c--main-500">
        Value:
        {' '}
        <span className="fw--bold">{value}</span>
      </p>
    </>
  );
};

export const Sizes = () => (
  <>
    <FormattedMessage {...messages.textInput}>
      {(msg) => (
        <InputField
          name="firstName"
          id="firstName"
          required
          type="text"
          placeholder={msg}
          size="small"
          className="mb--medium"
        />
      )}
    </FormattedMessage>
    <FormattedMessage {...messages.textInput}>
      {(msg) => (
        <InputField
          name="firstName"
          id="firstName"
          required
          type="text"
          placeholder={msg}
          size="medium"
          className="mb--medium"
        />
      )}
    </FormattedMessage>
    <FormattedMessage {...messages.textInput}>
      {(msg) => (
        <InputField
          name="firstName"
          id="firstName"
          required
          type="text"
          placeholder={msg}
          size="big"
          className="mb--medium"
        />
      )}
    </FormattedMessage>
  </>
);

export const TextArea = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <FormattedMessage {...messages.textInput}>
        {(msg) => (
          <InputField
            name="firstName"
            id="firstName"
            required
            type="textarea"
            placeholder={msg}
            value={value}
            onChange={(v) => setValue(v)}
            className="mb--medium"
          />
        )}
      </FormattedMessage>
      <p className="ff--sans fs--small c--main-500">
        Value:
        {' '}
        <span className="fw--bold">{value}</span>
      </p>
    </>
  );
};

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const handleCheckbox = (v) => {
    setChecked(!checked);
    // eslint-disable-next-line no-console
    console.log('value: ', v);
  };

  return (
    <>
      <div className="d--block mb--small">
        <InputField
          type="checkbox"
          name="terms"
          id="terms"
          onChange={(v) => handleCheckbox(v)}
          className="d--inline-block"
        />
        <Label htmlFor="terms" className="d--inline-block c--pointer">
          <FormattedMessage tagName={React.Fragment} {...messages.textAgree} />
        </Label>
      </div>
      <p className="mt--medium">{checked ? <>checked</> : <>not checked</>}</p>
    </>
  );
};

export const Radio = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="d--block mb--small">
        <InputField
          type="radio"
          name="gender"
          id="male"
          value="Male"
          onChange={(v) => setValue(v)}
          className="d--inline-block"
        />
        <label htmlFor="male" className="d--inline-block c--pointer">
          <FormattedMessage tagName={React.Fragment} {...messages.textMale} />
        </label>
      </div>
      <div className="d--block mb--small">
        <InputField
          type="radio"
          name="gender"
          id="female"
          value="Female"
          onChange={(v) => setValue(v)}
          className="d--inline-block"
        />
        <label htmlFor="female" className="d--inline-block c--pointer">
          <FormattedMessage tagName={React.Fragment} {...messages.textFemale} />
        </label>
      </div>
      <p className="mt--medium">
        Genre:
        {value}
      </p>
    </>
  );
};
