// SearchBar.js
import React from 'react';

const SearchBar = ({ onSearchChange }) => {
    const handleInputChange = (event) => {
        // Call the provided onSearchChange function with the new input value
        onSearchChange(event.target.value);
    };

    return (
        <div className="p-4">
            <div className="relative text-gray-600">
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                    onChange={handleInputChange} // Attach onChange event handler
                />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <svg
                        className="h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className="heroicon-ui"
                            d="M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-1.29 6.3a8 8 0 1 0-1.41 1.41 7 7 0 0 0 1.41-1.41zM2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
