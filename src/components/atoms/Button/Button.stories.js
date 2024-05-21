import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { allPaletteColors } from '../../_settings/ThemeProvider/ThemeContext';

import messages from './messages';

import Button from './Button';
import Icon from '../Icon';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  args: {
    // eslint-disable-next-line no-console
    onClick: () => console.log('clicou'),
  }
};

export const Default = (args) => (
  <Button {...args}>
    <FormattedMessage tagName={React.Fragment} {...messages.textButton} />
  </Button>
);
Default.argTypes = {
  children: {
    table: {
      disable: true
    }
  },
  color: {
    control: {
      type: 'select',
      options: allPaletteColors(),
    }
  },
  textColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  borderColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  }
};

export const WithAnimation = (args) => (
  <Button
    {...args}
    color="main.500"
    textColor="white"
    rounded
  >
    <FormattedMessage tagName={React.Fragment} {...messages.textButton} />
  </Button>
);
WithAnimation.argTypes = {
  children: {
    table: {
      disable: true
    }
  },
  color: {
    control: {
      type: 'select',
      options: allPaletteColors(),
    }
  },
  textColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  borderColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  iconSize: {
    control: {
      type: 'select',
      options: ['small', 'normal', 'medium', 'big']
    }
  },
  withAnimation: {
    control: {
      type: 'boolean',
    },
    defaultValue: true
  }
};
WithAnimation.propTypes = {
  iconSize: PropTypes.number
};

export const WithIcon = ({ iconSize, ...args }) => (
  <Button {...args}>
    <Icon name="share-alt" size={iconSize} />
    <FormattedMessage tagName={React.Fragment} {...messages.textButton} />
  </Button>
);
WithIcon.argTypes = {
  children: {
    table: {
      disable: true
    }
  },
  color: {
    control: {
      type: 'select',
      options: allPaletteColors(),
    }
  },
  textColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  borderColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  iconSize: {
    control: {
      type: 'select',
      options: ['small', 'normal', 'medium', 'big']
    }
  }
};

WithIcon.propTypes = {
  iconSize: PropTypes.number
};

export const OnlyIcon = ({ iconSize, ...args }) => (
  <Button
    {...args}
    // eslint-disable-next-line no-console
    onClick={() => console.log('Clicou')}
    color="main.500"
    textColor="white"
    rounded
    onlyIcon
  >
    <Icon name="share-alt" size={`${iconSize || 'small'}`} color="white" />
  </Button>
);
OnlyIcon.argTypes = {
  children: {
    table: {
      disable: true
    }
  },
  color: {
    control: {
      type: 'select',
      options: allPaletteColors(),
    }
  },
  textColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  borderColor: {
    control: {
      type: 'select',
      options: allPaletteColors()
    }
  },
  iconSize: {
    control: {
      type: 'select',
      options: ['small', 'normal', 'medium', 'big']
    }
  }
};

OnlyIcon.propTypes = {
  iconSize: PropTypes.number
};
