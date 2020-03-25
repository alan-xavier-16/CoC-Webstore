const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  categoryFileUpload
} = require("../controllers/category.controllers");
const router = express.Router();

// Models
const Category = require("../models/category.model");

// Other Resource Files
const productRouter = require("./product.routes");

// Middleware
const advancedResults = require("../middleware/advancedResults.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");
const fileUpload = require("../middleware/photoUpload.middleware");

router.use("/:categorySlug/products", productRouter);

router
  .route("/")
  .get(
    advancedResults(Category, {
      path: "products"
    }),
    getCategories
  )
  .post(protect, authorize("admin"), addCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

router
  .route("/:id/photo")
  .put(protect, authorize("admin"), fileUpload(Category), categoryFileUpload);

module.exports = router;
