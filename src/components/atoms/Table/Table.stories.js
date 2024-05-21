import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Icon from '../Icon';
import Table from './Table';
import Button from '../Button';

export default {
  title: 'Components/Atoms/Table',
  component: Table,
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

const actions = (
  // eslint-disable-next-line no-alert
  <Button onlyIcon size="small" color="transparent" onClick={() => alert('Eliminar el registro?')} className="m--auto">
    <Icon name="trash" color="red.500" />
  </Button>
);

export const Default = () => (
  <>
    <Table
      className="table__data--default w--100 ff--sans mtb--normal c--grey-neutral-800"
      dataTable={[
        {
          Curso: 'Activa tu fortaleza emocional',
          'Fecha de conclusión': '20/01/2021',
          'Fecha de creación': '13/10/2020',
          Acción: actions,
        },
        {
          Curso: 'Introducción al Coaching Educativo',
          'Fecha de conclusión': '24/12/2020',
          'Fecha de creación': '11/11/2020',
          Acción: actions,
        },
        {
          Curso: 'Mejora tu comunicación',
          'Fecha de conclusión': '05/02/2020',
          'Fecha de creación': '18/01/2020',
          Acción: actions,
        }
      ]}
    />
    <style jsx global>
      {`
        .table__data--default thead{
          background-color: #e4e4e4;
          border-bottom: 1.5px solid #7d7d7d;
        }
        .table__data--default tbody tr{
          border-bottom: 1px solid #e4e4e4;
        }
        .table__data--default tbody tr:nth-child(even){
          background-color: #f1f1f1;
        }
        .table__data--default tbody tr:hover{
          background-color: #ecf0f7;
          transition: all 0.5s;
        }
        .table__data--default tbody tr td:last-child{
          display: flex;
          justify-content: center;
        }
        .table__data--default th{
          font-weight:bold;
          padding: 16px;
          border: 1px solid #fff;
        }
        .table__data--default td{
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
      `}
    </style>
  </>
);

export const WithoutHeader = () => (
  <>
    <Table
      hasThead={false}
      className="table__data--default w--100 ff--sans mtb--normal c--grey-neutral-800"
      dataTable={[
        {
          Curso: 'Activa tu fortaleza emocional',
          'Fecha de conclusión': '20/01/2021'
        },
        {
          Curso: 'Introducción al Coaching Educativo',
          'Fecha de conclusión': '24/12/2020'
        },
        {
          Curso: 'Mejora tu comunicación',
          'Fecha de conclusión': '05/02/2020'
        }
      ]}
    />
    <style jsx global>
      {`
        .table__data--default tbody tr{
          border-bottom: 1px solid #e4e4e4;
        }
        .table__data--default tbody tr:nth-child(even){
          background-color: #f1f1f1;
        }
        .table__data--default tbody tr:hover{
          background-color: #ecf0f7;
          transition: all 0.5s;
        }
        .table__data--default tbody tr td:last-child{
          display: flex;
          justify-content: center;
        }
        .table__data--default td{
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
      `}
    </style>
  </>
);
