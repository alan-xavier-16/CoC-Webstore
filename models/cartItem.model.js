const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    min: 1,
    max: 100,
    default: 1
  },
  wish: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CartItem", CartItemSchema);
