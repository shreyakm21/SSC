/*
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Simple Shop
      </Link>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Cart (0)
      </button>
    </nav>
  );
}

export default Navbar;
*/

// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo / Home Link */}
      <Link
        to="/"
        className="text-2xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        🛍️ ShopEase
      </Link>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full transition-colors"
      >
        <span>🛒</span>
        <span>Cart (0)</span>
      </Link>
    </header>
  );
}

