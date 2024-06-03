const express = require('express');
const { addProduct, updateProduct, deleteProduct } = require('../controllers/SellerController');

const router = express.Router();

router.post('/add-product', addProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
