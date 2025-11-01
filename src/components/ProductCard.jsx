// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
//import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <motion.button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart
        </motion.button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
        <div className="product-rating">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span>({product.rating})</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
