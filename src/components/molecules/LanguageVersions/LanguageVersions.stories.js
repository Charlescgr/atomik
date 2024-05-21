import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import LanguageVersions from './LanguageVersions';
import { versionLinks } from '../../../../mocks/lmem/menusData';

export default {
  title: 'Components/Molecules/LanguageVersions',
  component: LanguageVersions,
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
  const platformConfig = {
    name: '',
    disclaimer: '.',
    description: ''
  };
  return (
    <LanguageVersions links={versionLinks} messages={{ isAvailableIn: 'también está disponible en:' }} platformConfig={platformConfig} />
  );
};
