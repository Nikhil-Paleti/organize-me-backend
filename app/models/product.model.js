const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: String,
    description: String,
    cost: { type: Number, required: true }, 
    quantity: Number,
  })
);

module.exports = Product;
