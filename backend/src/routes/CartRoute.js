const express = require('express');
const { getCarts, addItemToCart, removeItemFromCart } = require('../controllers/CartController');

const router = express.Router();

router.get('/', getCarts);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);

module.exports = router;
