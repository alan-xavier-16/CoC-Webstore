const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");

// @desc    Get all cart items
// @route   GET /api/v1/cart
// @access  Private
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await CartItem.find({ user: req.user.id })
    .populate({
      path: "product"
    })
    .sort("-createdAt");

  // Check Cart Exists
  if (!cart) {
    return next(new ErrorResponse(`Cart not found`), 404);
  }

  res.status(200).json({ success: true, data: cart });
});

// @desc    Get a cart item
// @route   GET /api/v1/cart/:id
// @access  Private
exports.getCartItem = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.findById(req.params.id).populate("product");

  // Check Resource Exists
  if (!cartItem) {
    return next(new ErrorResponse(`Item not found`), 404);
  }

  // Check Resource Ownership
  if (cartItem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`You are not authorized to access this cart`, 401)
    );
  }

  res.status(200).json({ success: true, data: cartItem });
});

// @desc    Create a cart item
// @route   POST /api/v1/products/:productId/cart
// @access  Private
exports.addCartItem = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.product = req.params.productId;

  const cartItem = await CartItem.create(req.body);

  res.status(201).json({ success: true, data: cartItem });
});

// @desc    Update a cart item
// @route   PUT /api/v1/cart/:id
// @access  Private
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  let cartItem = await CartItem.findById(req.params.id);

  // Check Resource Exists
  if (!cartItem) {
    return next(new ErrorResponse(`Item not found`), 404);
  }

  // Check Resource Ownership
  if (cartItem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`You are not authorized to update this cart`, 401)
    );
  }

  cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate({ path: "product" });

  res.status(200).json({ success: true, data: cartItem });
});

// @desc    Delete a cart item
// @route   DELETE /api/v1/cart/:id
// @access  Private
exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.findById(req.params.id);

  // Check Resource Exists
  if (!cartItem) {
    return next(new ErrorResponse(`Item not found`), 404);
  }

  // Check Resource Ownership
  if (cartItem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`You are not authorized to update this cart`, 401)
    );
  }

  await cartItem.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Remove all cart items
// @route   DELETE /api/v1/cart
// @access  Private
exports.deleteCart = asyncHandler(async (req, res, next) => {
  const cart = await CartItem.find({ user: req.user.id })
    .populate({
      path: "product"
    })
    .sort("-createdAt");

  // Check Cart Exists
  if (!cart) {
    return next(new ErrorResponse(`Cart not found`), 404);
  }

  await CartItem.remove();

  res.status(200).json({ success: true, data: {} });
});
