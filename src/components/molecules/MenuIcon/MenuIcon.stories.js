import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import MenuIcon from './MenuIcon';

export default {
  title: 'Components/Molecules/MenuIcon',
  component: MenuIcon,
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
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <MenuIcon onClick={() => setOpenMenu(!openMenu)} clicked={openMenu} className="m--big" />
  );
};
