const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  customerId: { type: Number, required: true },
  cart: [cartItemSchema], // Array of cart items
  totalCost: { type: Number, required: true },
  status: String,
  machineID: Number,
  quality: Number,
  noPackets: Number,
  noBoxes: Number,
  feedback: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
