import React from 'react';

import { FormattedMessage } from 'react-intl';

import ArticleInfo from './ArticleInfo';
import messages from './messages';

export default {
  title: 'Components/Molecules/ArticleInfo',
  component: ArticleInfo,
  args: {
    sponsored: {
      title: <FormattedMessage tagName={React.Fragment} {...messages.sponsored} />,
      text: <FormattedMessage tagName="string" values={{ pageName: 'lmem', pageSponsor: 'David' }} {...messages.modalSponsored} />
    },
    checked: {
      title: <FormattedMessage tagName={React.Fragment} {...messages.factChecked} />,
      text: <FormattedMessage tagName={React.Fragment} {...messages.modalFact} />
    },
    minutes: <FormattedMessage tagName="string" values={{ number: 7 }} {...messages.minutes} />
  }
};

export const Default = (args) => <ArticleInfo {...args} />;
