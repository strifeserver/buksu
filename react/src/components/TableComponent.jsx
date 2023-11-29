// TableComponent.js
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const TableComponent = ({
    data: initialData,
    columns,
    onDetailsClick,
    onRemoveClick,
    onSelectedRowsChange,
    onKgChange
}) => {
    const [filterText, setFilterText] = useState('');
    const [data, setData] = useState(initialData);

    useEffect(() => {
        // Filter data when the filterText changes
        const filteredData = initialData.filter((item) =>
            columns.some((column) => {
                const columnValue = item[column.selector];

                // Check if columnValue is not undefined and not null before calling toString
                if (columnValue !== undefined && columnValue !== null) {
                    const stringValue = columnValue.toString().toLowerCase();
                    return stringValue.includes(filterText.toLowerCase());
                }

                return false;
            })
        );

        setData(filteredData);
    }, [filterText, initialData, columns]);


    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        // Update the filterText state
        setFilterText(searchText);

        // Filter data when the filterText changes
        const filteredData = initialData.filter((item) =>
            columns.some((column) => {
                const columnValue = item[column.selector];

                if (columnValue !== undefined && columnValue !== null) {
                    const stringValue = columnValue.toString().toLowerCase();
                    return stringValue.includes(searchText);
                }

                return false;
            })
        );

        setData(filteredData);
    };

    const tableProps = {
        columns: columns.map((column) =>
            column.selector === 'kg'
                ? {
                    ...column,
                    cell: (row) => (
                        <input
                            type="number"
                            value={row.kg}
                            onChange={(e) => onKgChange(row.id, e.target.value)}
                        />
                    ),
                }
                : column.selector === 'itemDetails'
                    ? {
                        ...column,
                        cell: (row) => (
                            <button
                                onClick={() => onDetailsClick(row.itemDetails)}
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Details
                            </button>
                        ),
                    }
                    : column.selector === 'blankColumn'
                        ? {
                            ...column,
                            cell: (row) => (
                                <button
                                    onClick={() => onRemoveClick(row.id)}
                                    style={{
                                        background: 'red',
                                        color: 'white',
                                        padding: '5px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            ),
                        }
                        : column
        ),
        data,
        pagination: true,
        paginationPerPage: 5,
        highlightOnHover: true,
        pointerOnHover: true,
        selectableRows: 'multiple',
        selectableRowsHighlight: true,
        onSelectedRowsChange: onSelectedRowsChange,
        paginationRowsPerPageOptions: [5, 10, 15],
        noHeader: true,
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={filterText}
                onChange={handleSearch}
            />
            <DataTable {...tableProps} />
        </div>
    );
};

export default TableComponent;
