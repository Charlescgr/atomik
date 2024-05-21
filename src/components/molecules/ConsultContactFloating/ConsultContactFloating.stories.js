import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import ConsultContactFloating from './ConsultContactFloating';
import Paragraph from '../../atoms/Paragraph';

export default {
  title: 'Components/Molecules/ConsultContactFloating',
  component: ConsultContactFloating,
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

export const Default = () => (
  <div style={{ marginLeft: '-1rem' }}>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>
    <Paragraph className="m--big">
      <FormattedMessage tagName={React.Fragment} {...messages.textParagraph} />
    </Paragraph>

    <ConsultContactFloating
      email="gema@gemapsicologa.es"
      telephone="99357083"
      messages={{
        contact: 'Contactar',
        call: 'Llamar'
      }}
    />
  </div>
);
