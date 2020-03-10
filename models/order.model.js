const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    default: "New",
    enum: [
      "New",
      "Awaiting Payment",
      "Payment Received",
      "Payment Failed",
      "Awaiting Collection",
      "Completed",
      "Cancelled"
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
