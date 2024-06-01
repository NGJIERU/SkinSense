const express = require('express');
const { getCarts, addItemToCart, removeItemFromCart, updateItemQuantity } = require('../controllers/CartController');

const router = express.Router();

router.get('/', getCarts);
router.post('/add', addItemToCart);
router.delete('/remove', removeItemFromCart);
router.put('/update', updateItemQuantity);

module.exports = router;
