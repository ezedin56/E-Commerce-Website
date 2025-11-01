// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//import { useCart } from "../context/CartContext";

const Header = ({ searchTerm, onSearchChange }) => {
  const { getCartItemsCount } = useCart();

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="container">
        <Link to="/" className="logo">
          <motion.h1 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            ShopEasy
          </motion.h1>
        </Link>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {getCartItemsCount() > 0 && (
              <motion.span
                className="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={getCartItemsCount()}
              >
                {getCartItemsCount()}
              </motion.span>
            )}
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
