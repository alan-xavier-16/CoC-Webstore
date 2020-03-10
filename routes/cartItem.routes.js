const express = require("express");
const {
  getCart,
  getCartItem,
  addCartItem,
  updateCartItem,
  deleteCartItem
} = require("../controllers/cartItem.controllers");
const router = express.Router({ mergeParams: true });

/** Middleware */
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router
  .route("/")
  .get(getCart)
  .post(addCartItem);

router
  .route("/:id")
  .get(getCartItem)
  .put(updateCartItem)
  .delete(deleteCartItem);

module.exports = router;
