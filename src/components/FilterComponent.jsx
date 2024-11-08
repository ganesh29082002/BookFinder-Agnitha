import React, { useState } from 'react';

const FilterComponent = ({ formData, onChangeHandler, fetchBooks }) => {

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="mb-4">
  
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="query"
          placeholder="Search by book title"
          value={formData.query}
          onChange={onChangeHandler}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={toggleFilters}
          className="ml-2 p-2 border rounded bg-gray-100"
        >

          <span className="material-icons">menu</span>
        </button>
      </div>


      {showFilters && (
        <div className="mt-4">
          <input
            type="text"
            name="author"
            placeholder="Filter by author"
            value={formData.author}
            onChange={onChangeHandler}
            className="border rounded p-2 w-full mb-2"
          />
          <input
            type="number"
            name="year"
            placeholder="Filter by publication year"
            value={formData.year}
            onChange={onChangeHandler}
            className="border rounded p-2 w-full mb-2"
          />
          <input
            type="text"
            name="language"
            placeholder="Filter by language"
            value={formData.language}
            onChange={onChangeHandler}
            className="border rounded p-2 w-full mb-4"
          />
          <button
            onClick={fetchBooks}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
