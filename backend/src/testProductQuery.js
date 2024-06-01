// src/testProductQuery.js
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const ProductModel = require('./models/ProductModel');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  try {
    const product = await ProductModel.findOne({ name: "Dettol" });
    console.log(product ? "Product found: " + product : "Product not found");
  } catch (error) {
    console.error("Error querying product:", error);
  } finally {
    mongoose.disconnect();
  }
}).catch((error) => {
  console.error('Connection error', error);
});
