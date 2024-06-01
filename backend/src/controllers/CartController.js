const Cart = require('../models/CartModel');

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addItemToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.itemId === itemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
    } else {
      cart = new Cart({ userId, items: [{ itemId, quantity }] });
    }
    await cart.save();
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
};

const removeItemFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.itemId !== itemId);
      await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getCarts, addItemToCart, removeItemFromCart };
