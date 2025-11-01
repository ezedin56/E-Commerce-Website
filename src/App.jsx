// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductListing from "./components/ProductListing";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
//import { CartProvider } from "./context/CartContext";
import { products as initialProducts } from "./data/products";
import "./App.css";
import Debug from "./Debug";
// ... in your return, add:
<Debug />;

function App() {
  const [products, setProducts] = useState(initialProducts); // Fixed: setproducts -> setProducts
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProductListing
                    products={filteredProducts}
                    onFilter={(category, priceRange) => {
                      let filtered = initialProducts;
                      if (category) {
                        filtered = filtered.filter(
                          (p) => p.category === category
                        );
                      }
                      if (priceRange) {
                        filtered = filtered.filter(
                          (p) =>
                            p.price >= priceRange.min &&
                            p.price <= priceRange.max
                        );
                      }
                      if (searchTerm) {
                        filtered = filtered.filter((p) =>
                          p.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      }
                      setFilteredProducts(filtered);
                    }}
                  />
                }
              />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
