/* // controllers/CartController.js
let cart = {};

const addItemToCart = (req, res) => {
  const { itemId, quantity } = req.body;
  if (cart[itemId]) {
    cart[itemId] += quantity;
  } else {
    cart[itemId] = quantity;
  }
  res.status(201).send({ message: 'Item added to cart', cart });
};

const removeItemFromCart = (req, res) => {
  const itemId = req.params.itemId;
  if (cart[itemId]) {
    delete cart[itemId];
    res.send({ message: 'Item removed from cart', cart });
  } else {
    res.status(404).send({ message: 'Item not found in cart' });
  }
};

const viewCart = (req, res) => {
  res.send(cart);
};

const clearCart = (req, res) => {
  cart = {};
  res.send({ message: 'Cart cleared', cart });
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  viewCart,
  clearCart,
};
 */

// src/controllers/CartController.js
// src/controllers/CartController.js
const { CartModel } = require('../models/CartModel');
const { ProductModel } = require('../models/ProductModel');

const addItemToCart = async (req, res) => {
    try {
        const { productName, quantity } = req.body;
        const product = await ProductModel.findOne({ name: productName });
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await CartModel.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new CartModel({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === product._id.toString());
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ itemId: product._id, quantity });
        }

        await cart.save();
        res.json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user.id }).populate('items.itemId');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { productName } = req.params;
        const product = await ProductModel.findOne({ name: productName });
        if (!product) return res.status(404).json({ message: "Product not found" });

        const cart = await CartModel.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === product._id.toString());
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.json({ message: "Item removed from cart", cart });
        }

        res.status(404).json({ message: "Item not found in cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();
        res.json({ message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addItemToCart,
    getCart,
    removeItemFromCart,
    clearCart,
};
