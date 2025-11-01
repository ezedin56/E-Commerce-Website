// src/components/CartItem.jsx
import React from "react";
import { motion } from "framer-motion";
//import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-category">{item.category}</p>
        <p className="item-price">${item.price}</p>
      </div>

      <div className="quantity-controls">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      <div className="item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <motion.button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
