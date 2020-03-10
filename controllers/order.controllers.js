const Order = require("../models/order.model");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");

// @desc    Get all orders
// @route   GET /api/v1/orders
// @route   GET /api/v1/users/:userId/orders
// @access  Private / Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const orders = await Order.find({ user: req.params.userId }).populate({
      path: "user",
      select: "id name email"
    });

    // Check Resource Exists
    if (!orders) {
      return next(new ErrorResponse(`Resource not found`, 404));
    }

    // Check Resource Ownership
    if (req.params.userId !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(`Not authorized to access this route`, 401)
      );
    }

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } else {
    // Check Resource Authorization
    if (req.user.role !== "admin") {
      return next(
        new ErrorResponse(`Not authorized to access this route`, 401)
      );
    }

    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get an order
// @route   GET /api/v1/orders/:id
// @access  Private / Admin
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // Check Resource Exists
  if (!order) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  // Check Resource Ownership
  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  res.status(200).json({ success: true, data: order });
});

// @desc    Create an order
// @route   POST /api/v1/orders
// @access  Private
exports.addOrder = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const order = await Order.create(req.body);

  res.status(201).json({ success: true, data: order });
});

// @desc    Update an order
// @route   PUT /api/v1/orders/:id
// @access  Private / Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  // Check Resource Exists
  if (!order) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  // Check Resource Ownership
  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: order });
});

// @desc    Delete an order
// @route   DELETE /api/v1/orders/:id
// @access  Private / Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // Check Resource Exists
  if (!order) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  // Check Resource Ownership
  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  await order.remove();

  res.status(200).json({ success: true, data: {} });
});
