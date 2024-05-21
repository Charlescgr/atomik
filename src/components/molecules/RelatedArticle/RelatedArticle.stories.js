import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import RelatedArticle from './RelatedArticle';

export default {
  title: 'Components/molecules/RelatedArticle',
  component: RelatedArticle,
  args: {
    recommendedPost: {
      title: 'Inglaterra: los mejores destinos para visitar',
      figure: {
        thumb: 'https://miviaje.com/wp-content/uploads/2017/04/shutterstock_97754657.jpg'
      },
      description: '\n                                Inglaterra es mucho más que Londres. Además de la capital, las tierras inglesas esconden ciudades y espacios naturales de gran belleza e interés. ',
      link: 'https://miviaje.com/inglaterra-los-mejores-destinos-visitar/'
    },
    messages: {
      cardTitle: <FormattedMessage tagName={React.Fragment} {...messages.interestYou} />
    }
  }
};

export const Default = (args) => (
  <RelatedArticle {...args} />
);
