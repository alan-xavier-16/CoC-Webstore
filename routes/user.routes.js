const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser
} = require("../controllers/user.controllers");
const router = express.Router();

// Other Resource Files
const orderRouter = require("../routes/order.routes");

// Middleware
const advancedResults = require("../middleware/advancedResults.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const User = require("../models/user.model");

router.use(protect);
router.use(authorize("admin"));

router.use("/:userId/orders", orderRouter);

router.route("/").get(advancedResults(User), getUsers);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser);

module.exports = router;
