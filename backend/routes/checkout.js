// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const products = require('../data/products');

/**
 * Expected body:
 * {
 *   items: [{ id: <number>, quantity: <number> }, ...]
 * }
 */
router.post('/', (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, message: "Invalid payload. 'items' array is required." });
  }

  // Map items to product data (if product id invalid, skip)
  const order = items.map(it => {
    const p = products.find(prod => prod.id === it.id);
    if (!p) return null;
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: Math.max(1, Number(it.quantity) || 1),
      lineTotal: p.price * (Number(it.quantity) || 1)
    };
  }).filter(Boolean);

  // simple server-side total
  const total = order.reduce((s, o) => s + o.lineTotal, 0);

  // For this task: log to console (simulate persisting/processing)
  console.log('— New checkout order received —');
  console.log(JSON.stringify({ order, total, receivedAt: new Date().toISOString() }, null, 2));

  // Return success
  res.json({ success: true, message: "Order received", orderCount: order.length, total });
});

module.exports = router;
