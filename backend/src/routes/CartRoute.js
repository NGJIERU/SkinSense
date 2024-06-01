// src/routes/CartRoute.js
const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
  getCart,
  clearCart,
} = require('../controllers/CartController');
const { cartExists } = require('../middleware/CartMiddleware');

router.post('/', addItemToCart);
router.delete('/:productName', cartExists, removeItemFromCart);
router.get('/', getCart);
router.delete('/', clearCart);

module.exports = router;
