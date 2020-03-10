const express = require("express");
const {
  getOrderItems,
  getOrderItem,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
} = require("../controllers/orderItem.controllers");
const router = express.Router({ mergeParams: true });

const OrderItem = require("../models/orderItem.model");

// Middleware
const { protect } = require("../middleware/auth.middleware");
const advancedResults = require("../middleware/advancedResults.middleware");

router.use(protect);

router
  .route("/")
  .get(
    advancedResults(OrderItem, {
      path: "product",
      select: "name category price"
    }),
    getOrderItems
  )
  .post(addOrderItem);

router
  .route("/:id")
  .get(getOrderItem)
  .put(updateOrderItem)
  .delete(deleteOrderItem);

module.exports = router;
