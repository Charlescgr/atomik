import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import A from '../../atoms/A';
import Divider from '../../atoms/Divider';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import ContentList from '../../atoms/ContentList';

import BreakContent from './BreakContent';

export default {
  title: 'Components/Molecules/BreakContent',
  component: BreakContent,
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
  <BreakContent>
    <Heading type="h2">Heading 2</Heading>
    <Heading type="h3">Heading 3</Heading>
    <Heading type="h4">Heading 4</Heading>
    <Heading type="h5">Heading 5</Heading>
    <Heading type="h6">Heading 6</Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
      {' '}
      <A
        to="#"
        textColor="secondary.600"
        underlineColor="secondary.600"
        lineType="dotted"
      >
        ullamcorper
      </A>
      {' '}
      felis vel ante ullamcorper, sed tempus ante dictum. Quisque finibus, enim eu dictum varius, risus ex blandit lorem, sed interdum ex sem sit amet justo. Duis id ultrices turpis.
    </Paragraph>
    <Paragraph>Suspendisse rhoncus ligula lectus. Sed purus libero, faucibus eget semper sed, hendrerit eget odio. Donec id tellus mi. Etiam sit amet lorem posuere, sodales dui sed, euismod massa. Mauris a porttitor neque, vitae vulputate risus. Nullam sem dolor, posuere non diam eu, lobortis rutrum dolor.</Paragraph>
    <Divider color="secondary.300" />
    <Heading type="h3">Heading 3</Heading>
    <ContentList type="ul" listStyleType="disc">
      <li>
        Es
        {' '}
        <A>alérgico</A>
        {' '}
        a la enoxaparina sódica o a alguno de los demás componentes de este medicamento.
      </li>
      <li>
        <strong>
          Padece
          {' '}
          <A>hemorragias</A>
          {' '}
          activas
        </strong>
        {' '}
        que estén en curso o condiciones de alto riesgo de hemorragia incontrolada, incluyendo ictus hemorrágico reciente.
      </li>
      <li>
        Alguna vez ha sufrido una disminución del número de plaquetas en sangre, lo que se conoce como trombocitopenia, o la formación de trombos debido a la administración de enoxaparina.
      </li>
    </ContentList>
  </BreakContent>
);
