const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  productFileUpload,
} = require("../controllers/product.controllers");
const router = express.Router({ mergeParams: true });

// Middleware
const advancedResults = require("../middleware/advancedResults.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");
const fileUpload = require("../middleware/photoUpload.middleware");

// Other Resource Files
const cartItemRouter = require("../routes/cartItem.routes");

// Models
const Product = require("../models/product.model");

router.use("/:productId/cart", cartItemRouter);

router
  .route("/")
  .get(
    advancedResults(Product, { path: "category", select: "name description" }),
    getProducts
  )
  .post(protect, authorize("admin"), addProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

router
  .route("/:id/photo")
  .put(protect, authorize("admin"), fileUpload(Product), productFileUpload);

module.exports = router;
