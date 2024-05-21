import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Badge from './Badge';
import Icon from '../Icon';

export default {
  title: 'Components/Atoms/Badge',
  decorators: [withA11y],
  component: Badge,
  parameters: {},
};

export const Default = () => (
  <Badge>
    <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
  </Badge>
);

export const RoundedAndWithColor = () => (
  <Badge
    rounded
    color="orange.400"
    textColor="blue.800"
  >
    <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
  </Badge>
);

export const DefaultSizes = () => (
  <>
    <Badge
      color="red.500"
      textColor="white"
      rounded
      size="small"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textSmall} />
    </Badge>

    <Badge
      color="purple.500"
      textColor="white"
      rounded
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textNormal} />
    </Badge>

    <Badge
      color="yellow.500"
      textColor="white"
      rounded
      size="medium"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textMedium} />
    </Badge>

    <Badge
      color="blue.500"
      textColor="white"
      rounded
      size="big"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textBig} />
    </Badge>
  </>
);
export const CustomSizes = () => (
  <>
    <Badge
      className="fs--small"
      color="red.500"
      textColor="white"
      rounded
      size="custom"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
    </Badge>

    <Badge
      className="fs--x-big plr--x-big"
      color="purple.500"
      textColor="white"
      rounded
      size="custom"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
    </Badge>

    <Badge
      className="fs--small p--big"
      color="yellow.500"
      textColor="black"
      rounded
      size="custom"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
    </Badge>

    <Badge
      className="fs--medium plr--x-big ptb--small"
      color="blue.500"
      textColor="white"
      rounded
      size="custom"
    >
      <FormattedMessage tagName={React.Fragment} {...messages.textBadge} />
    </Badge>
  </>
);

export const OnlyIcon = () => (
  <>
    <Badge
      color="main.500"
      textColor="white"
      rounded
      onlyIcon
      size="small"
    >
      <Icon name="share-alt" size="small" color="white" />
    </Badge>

    <Badge
      color="main.500"
      textColor="white"
      rounded
      onlyIcon
    >
      <Icon name="share-alt" size="normal" color="white" />
    </Badge>
    <Badge
      color="main.500"
      textColor="white"
      rounded
      onlyIcon
      size="medium"
    >
      <Icon name="share-alt" size="medium" color="white" />
    </Badge>

    <Badge
      color="main.500"
      textColor="white"
      rounded
      onlyIcon
      size="big"
    >
      <Icon name="share-alt" size="big" color="white" />
    </Badge>
  </>
);
