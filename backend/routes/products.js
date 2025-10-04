/*
// backend/routes/products.js
const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
*/


// backend/routes/products.js
const express = require('express');
const router = express.Router();
const productsData = require('../data/products');

/**
 * GET /products
 * Returns the list of all available products
 */
router.get('/', (req, res) => {
  res.json(productsData);
});

module.exports = router;
