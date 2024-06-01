const Product = require('../models/ProductModel');

const addProduct = async (req, res) => {
  const { name, description, price, quantity, img, sellername } = req.body;

  if (!sellername) {
    return res.status(400).send('Seller name is required');
  }

  const newProduct = new Product({
    name,
    description,
    price,
    quantity,
    img,
    sellername,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { addProduct };
