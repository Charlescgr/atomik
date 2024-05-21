import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withNextRouter } from 'storybook-addon-next-router';

import PageWrapper from './PageWrapper';

export default {
  title: 'Components/Molecules/PageWrapper',
  component: PageWrapper,
  decorators: [withA11y, withNextRouter],
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
  <PageWrapper>
    Content Here
  </PageWrapper>
);

export const WithConfig = () => {
  const pageConfig = {
    title: 'theme.name',
    meta: [
      {
        name: 'description',
        content: 'Description of the page',
        bodyClasses: 'class1 class2 class3',
      }
    ],
    hasProgress: false,
    brandWeek: {
      active: false,
    },
  };
  return (
    <PageWrapper config={pageConfig}>
      Content Here
    </PageWrapper>
  );
};
