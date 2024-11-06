import React, { useState } from 'react';
import './FilterSort.css';

function FilterSort({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    sortBy: '',
    sortOrder: 'asc'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    
    console.log('Applying filters:', activeFilters);
    onApplyFilters(activeFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      title: '',
      author: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: '',
      sortBy: '',
      sortOrder: 'asc'
    };
    setFilters(resetFilters);
    onApplyFilters({});
  };

  return (
    <div className="filter-sort">
      <div className="filters">
        <div className="filter-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            placeholder="Filter by title"
          />
        </div>

        <div className="filter-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={filters.author}
            onChange={handleInputChange}
            placeholder="Filter by author"
          />
        </div>

        <div className="filter-group">
          <label>Year:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="yearFrom"
              value={filters.yearFrom}
              onChange={handleInputChange}
              placeholder="From"
            />
            <input
              type="number"
              name="yearTo"
              value={filters.yearTo}
              onChange={handleInputChange}
              placeholder="To"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Price:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="priceFrom"
              value={filters.priceFrom}
              onChange={handleInputChange}
              placeholder="From"
            />
            <input
              type="number"
              name="priceTo"
              value={filters.priceTo}
              onChange={handleInputChange}
              placeholder="To"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select 
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
          >
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="yearPublished">Year</option>
            <option value="price">Price</option>
          </select>
          {filters.sortBy && (
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleInputChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          )}
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="apply-button"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button 
          className="reset-button"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FilterSort; 