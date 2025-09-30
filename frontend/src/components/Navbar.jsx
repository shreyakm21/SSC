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
