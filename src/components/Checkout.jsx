// src/components/Checkout.jsx
import React, { useState } from "react";
//import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <div className="checkout">
        <div className="container">
          <h2>No items in cart</h2>
          <p>Please add some items to your cart before checking out.</p>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <motion.div
        className="order-complete"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="container">
          <motion.div
            className="success-animation"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          <h2>Order Complete!</h2>
          <p>
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="name-fields">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <div className="city-zip">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Information</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
              <div className="card-details">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="place-order-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Place Order
            </motion.button>
          </form>

          <motion.div
            className="order-summary"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Order Summary</h3>
            {cart.items.map((item) => (
              <div key={item.id} className="order-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total: ${(getCartTotal() + 5.99).toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
