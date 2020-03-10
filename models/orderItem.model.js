const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
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
    required: [true, "Please select a minimum of 1 item"]
  }
});

/** 
Static Method to Get TOTAL Cost of an Order from multiple Order Items
- $match filters OrderItems that match the 'orderId' passed into the function
- $lookup joins the product matching the id into an array in the 'price' field
- $unwind deconstructs this array to a new document for each element in price
- $project excludes product fields leaving only price
- $group groups documents by 'order id' and calculates totalCost
- $sort sorts the results in descending order
*/
OrderItemSchema.statics.getAmountTotal = async function(orderId) {
  try {
    const obj = await this.aggregate([
      { $match: { order: orderId } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "price"
        }
      },
      { $unwind: { path: "$price" } },
      {
        $project: {
          "price._id": 0,
          "price.photo": 0,
          "price.category": 0,
          "price.name": 0,
          "price.description": 0,
          "price.createdAt": 0,
          "price.slug": 0
        }
      },
      {
        $group: {
          _id: "$order",
          totalCost: { $sum: { $multiply: ["$price.price", "$quantity"] } }
        }
      },
      {
        $sort: { order: -1 }
      }
    ]);

    await this.model("Order").findByIdAndUpdate(orderId, {
      amount: obj[0].totalCost
    });
  } catch (err) {
    console.error(err);
  }
};

OrderItemSchema.post("save", function() {
  this.constructor.getAmountTotal(this.order);
});

OrderItemSchema.pre("remove", function() {
  this.constructor.getAmountTotal(this.order);
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);
