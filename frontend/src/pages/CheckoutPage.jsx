// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [orderReceived, setOrderReceived] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Send order to backend
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        cartItems.map(({ id, quantity }) => ({ id, quantity }))
      ),
    })
      .then((res) => res.json())
      .then(() => setOrderReceived(true))
      .catch((err) => console.error("Checkout error:", err));
  };

  if (orderReceived) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <ul className="mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="mb-2">
              {item.name} x {item.quantity} = ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-4">Total: ₹{total}</h2>
        <button
          onClick={() => {
            clearCart();
            window.location.href = "/";
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handleCheckout}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  );
}
