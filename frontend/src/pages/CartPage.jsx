// src/components/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderDate, setOrderDate] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    const payload = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity || 1,
    }));

    const res = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: payload }),
    });

    const data = await res.json();

    // save current cart for order bill
    setOrderItems(cartItems);
    setOrderDate(new Date().toLocaleString());
    setOrderCompleted(true);
    clearCart(); // clear cart for new shopping
  };

  if (cartItems.length === 0 && !orderCompleted) {
    return <p className="text-lg">Your cart is empty.</p>;
  }

  if (orderCompleted) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <p className="mb-4">Order Date: {orderDate}</p>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Item Name</th>
              <th className="border px-4 py-2 text-center">Quantity</th>
              <th className="border px-4 py-2 text-right">Price per Item (₹)</th>
              <th className="border px-4 py-2 text-right">Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map(item => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-center">{item.quantity}</td>
                <td className="border px-4 py-2 text-right">{item.price}</td>
                <td className="border px-4 py-2 text-right">{item.price * (item.quantity || 1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="border px-4 py-2 text-left">Grand Total</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 text-right">
                ₹{orderItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)}
              </td>
            </tr>
          </tfoot>
        </table>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go back to shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                –
              </button>
              <span className="text-lg font-bold">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xl font-bold">Total: ₹{total}</div>
      <button
        onClick={handleCheckout}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Checkout
      </button>
    </div>
  );
}
