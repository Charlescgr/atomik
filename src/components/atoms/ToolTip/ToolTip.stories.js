import React from 'react';
import css from 'styled-jsx/css';

import { withA11y } from '@storybook/addon-a11y';

import ToolTip from './ToolTip';
import Paragraph from '../Paragraph';
import Avatar from '../Avatar';
import A from '../A';

export default {
  title: 'Components/Atoms/ToolTip',
  component: ToolTip,
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

const description = '<strong>Licenciada en Enfermería</strong> por la Universidad de Carabobo (2010), con méritos académicos y <strong>especializada en Inmunohematología y transfusión de derivados Sanguíneos</strong> por la Universidad Experimental Rómulo Gallegos (2013).';
const name = 'Leidy Mora Molina';
const avatar = 'https://mejorconsalud.as.com/wp-content/uploads/2020/10/leidymora_Fotor.jpg';

export const Default = () => {
  const { className, styles } = css.resolve`
    .link-tool-tip .tool-tip {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .link-tool-tip:hover .tool-tip {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.5s ease;
    }
  `;
  return (
    <>
      <Paragraph>
        Revisado e aprobado por la psicóloga
        {' '}
        <A to="#" externalLink underlineColor="main.600" lineType="dotted" textColor="grey-neutral.800" className={`link-tool-tip ${className} p--relative`}>
          <ToolTip className={`${className}`}>
            <Avatar src={avatar} alt={name} size="big" className="f--left mr--normal" />
            <div className="fs--small c--gray-neutral-600 ff--sans" dangerouslySetInnerHTML={{ __html: description }} />
          </ToolTip>
          <strong>
            {name}
          </strong>
        </A>
      </Paragraph>
      {styles}
    </>
  );
};
