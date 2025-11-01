// src/components/ProductListing.jsx
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";

const ProductListing = ({ products, onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000 },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilter(newFilters.category, newFilters.priceRange);
  };

  return (
    <div className="product-listing">
      <div className="container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

        <div className="products-grid">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>

          {products.length === 0 && (
            <motion.div
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
