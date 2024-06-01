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

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, img, sellername } = req.body;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Update product fields if provided in the request body
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (quantity) product.quantity = quantity;
      if (img) product.img = img;
      if (sellername) product.sellername = sellername;
  
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { sellername } = req.body;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      if (product.sellername !== sellername) {
        return res.status(403).send('You are not authorized to delete this product');
      }
  
      await Product.findByIdAndDelete(id);
      res.status(200).send('Product deleted successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  module.exports = { addProduct, updateProduct, deleteProduct };
