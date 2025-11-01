// src/components/ShoppingCart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const { cart, getCartTotal, clearCart } = useCart();

  return (
    <motion.div
      className="shopping-cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          {cart.items.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        <div className="cart-content">
          {cart.items.length === 0 ? (
            <motion.div
              className="empty-cart"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="cart-items">
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                className="cart-summary"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>$5.99</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${(getCartTotal() + 5.99).toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ShoppingCart;
