// src/components/FilterSidebar.jsx
import React from "react";
import { motion } from "framer-motion";

const FilterSidebar = ({ filters, onFilterChange }) => {
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $50", min: 25, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: 1000 },
  ];

  return (
    <motion.div
      className="filter-sidebar"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Category</h4>
        {categories.map((category) => (
          <label key={category} className="filter-option">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
            />
            {category}
          </label>
        ))}
        <button
          className="clear-filter"
          onClick={() => onFilterChange({ ...filters, category: "" })}
        >
          Clear Category
        </button>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        {priceRanges.map((range) => (
          <label key={range.label} className="filter-option">
            <input
              type="radio"
              name="priceRange"
              checked={
                filters.priceRange.min === range.min &&
                filters.priceRange.max === range.max
              }
              onChange={() => onFilterChange({ ...filters, priceRange: range })}
            />
            {range.label}
          </label>
        ))}
        <button
          className="clear-filter"
          onClick={() =>
            onFilterChange({ ...filters, priceRange: { min: 0, max: 1000 } })
          }
        >
          Clear Price
        </button>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;
