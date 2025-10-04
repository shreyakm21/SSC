/*
// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const products = require('../data/products');


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
*/

// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const products = require('../data/products');

/**
 * POST /checkout
 * Expected payload:
 * {
 *   items: [{ id: <number>, quantity: <number> }, ...]
 * }
 */
router.post('/', (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payload. 'items' array is required." });
  }

  // Map items to product info, calculate line totals
  const orderDetails = items
    .map(({ id, quantity }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;

      const qty = Math.max(1, Number(quantity) || 1);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        lineTotal: product.price * qty,
      };
    })
    .filter(Boolean);

  // Calculate total amount
  const totalAmount = orderDetails.reduce((sum, item) => sum + item.lineTotal, 0);

  // Log order to console (simulate server processing)
  console.log('— New checkout order received —');
  console.log(
    JSON.stringify(
      { order: orderDetails, total: totalAmount, receivedAt: new Date().toISOString() },
      null,
      2
    )
  );

  // Send success response
  res.json({
    success: true,
    message: 'Order received',
    orderCount: orderDetails.length,
    total: totalAmount,
  });
});

module.exports = router;


