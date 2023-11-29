// src/DataTable.js
import React from 'react';
import DataTable from 'react-data-table-component';

const DataTableComponent = ({ data, columns, handleEdit }) => {
  return (
    <DataTable
      title="Product Management"
      columns={columns}
      data={data}
      pagination
      onRowClicked={(row) => handleEdit(row.id)} // Handle row click for the entire row
    />
  );
};

export default DataTableComponent;
