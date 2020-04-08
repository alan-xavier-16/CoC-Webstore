const express = require("express");
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controllers");
const router = express.Router({ mergeParams: true });

/** Models */
const Order = require("../models/order.model");

/** Other Resource Routers */
const productRouter = require("../routes/product.routes");

/** Middlewares */
const { protect } = require("../middleware/auth.middleware");
const advancedResults = require("../middleware/advancedResults.middleware");

router.use(protect);

router.use("/:orderId/products", productRouter);

router
  .route("/")
  .get(
    advancedResults(Order, { path: "user", select: "name email" }),
    getOrders
  )
  .post(addOrder);

router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
