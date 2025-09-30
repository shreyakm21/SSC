import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch products from backend
    useEffect(() => {
    fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        })
        .catch((err) => console.error("Error fetching products:", err));
    }, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-32 h-32 object-cover mb-3"
            />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-700">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
