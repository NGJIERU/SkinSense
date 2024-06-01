// src/models/CartModel.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
