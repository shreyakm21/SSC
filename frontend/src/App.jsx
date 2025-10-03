// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import CartPage from "./pages/CartPage";
import { CartProvider, useCart } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./components/HomePage";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Simple Shopping Cart</Link>
      </h1>
      <nav>
        <Link to="/products" className="mr-6 hover:underline">
          Products
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart 🛒 ({cartItems.length})
        </Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductGrid />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
