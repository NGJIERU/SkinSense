const express = require('express');
const { addProduct } = require('../controllers/SellerController');

const router = express.Router();

router.post('/add-product', addProduct);


module.exports = router;
