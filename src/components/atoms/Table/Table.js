import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import { v4 as uuid } from 'uuid';

import { handleCreateStyleClass } from '../../_settings/Utils';

function Table({
  dataTable, hasThead, ...props
}) {
  const propsBlacklist = [
    'dataTable',
    'hasThead',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const getKeys = () => (dataTable.length > 0 ? Object.keys(dataTable[0]) : []);
  const arrKeys = getKeys();

  return (
    <>
      <table
        className={`table ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        {hasThead && (
          <thead>
            <tr>
              {arrKeys.map((content) => (
                <th key={content}>
                  {content}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {dataTable.length > 0 && (
          <tbody>
            {dataTable.map((theRow) => (
              <tr key={uuid()}>
                {arrKeys.map((item) => <td key={uuid()}>{theRow[item]}</td>)}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

Table.defaultProps = {
  hasThead: true,
  dataTable: []
};

Table.propTypes = {
  /**
   * Inform if the tabla hava <thead> structure
   */
  hasThead: PropTypes.bool,

  /**
   * The data from table
   */
  dataTable: PropTypes.arrayOf(PropTypes.object),

  /**
   * The custom classname prop
   */
  className: PropTypes.string
};

export default Table;
