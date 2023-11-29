// Dropdown.js
import React from 'react';

const Dropdown = ({ onSelectOption }) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        // Call the provided onSelectOption function with the selected value
        onSelectOption(selectedValue);
    };

    return (
        <div>
            <select id="dropdown" onChange={handleSelectChange}>
                <option value="">Price</option>
                <option value="ascending">Price: Low to High</option>
                <option value="descending">Price: High to Low</option>
            </select>
        </div>
    );
};

export default Dropdown;
