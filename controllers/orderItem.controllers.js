const OrderItem = require("../models/orderItem.model");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");

// @desc    Get all order items
// @route   GET /api/v1/orderitems
// @route   GET /api/v1/orders/:orderId/orderitems
// @access  Private / Admin
exports.getOrderItems = asyncHandler(async (req, res, next) => {
  if (req.params.orderId) {
    const orderItems = await OrderItem.find({
      order: req.params.orderId
    }).populate({
      path: "product",
      select: "name category price"
    });

    // Check Resource Exists
    if (!orderItems) {
      return next(new ErrorResponse(`Resource not found`, 404));
    }

    res
      .status(200)
      .json({ success: true, count: orderItems.length, data: orderItems });
  } else {
    // Check Resource Ownership
    if (req.user.role !== "admin") {
      return next(
        new ErrorResponse(`Not authorized to access this route`, 401)
      );
    }

    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get an order item
// @route   GET /api/v1/orderitems/:id
// @access  Private / Admin
exports.getOrderItem = asyncHandler(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  // Check Resource Exists
  if (!orderItem) {
    return next(new ErrorResponse(`Resource not found`, 404));
  }

  res.status(200).json({ success: true, data: orderItem });
});

// @desc    Create an order item
// @route   POST /api/v1/orders/:orderId/products/:productId/orderitems
// @access  Private
exports.addOrderItem = asyncHandler(async (req, res, next) => {
  req.body.order = req.params.orderId;
  req.body.product = req.params.productId;

  const orderItem = await OrderItem.create(req.body);

  res.status(201).json({ success: true, data: orderItem });
});

// @desc    Update an order item
// @route   PUT /api/v1/orderitems/:id
// @access  Private / Admin
exports.updateOrderItem = asyncHandler(async (req, res, next) => {
  let orderItem = await OrderItem.findById(req.params.id);

  // Check Resource Exists
  if (!orderItem) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: orderItem });
});

// @desc    Delete an order item
// @route   DELETE /api/v1/orderitems/:id
// @access  Private / Admin
exports.deleteOrderItem = asyncHandler(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  // Check Resource Exists
  if (!orderItem) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  await orderItem.remove();

  res.status(200).json({ success: true, data: {} });
});
