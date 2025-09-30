// backend/index.js
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const checkoutRouter = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/checkout', checkoutRouter);

// health check
app.get('/', (req, res) => res.send({ status: 'ok', message: 'Simple Shopping Cart backend' }));

// Export app for tests
module.exports = app;

// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
