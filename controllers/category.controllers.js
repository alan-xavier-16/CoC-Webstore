const Category = require("../models/category.model");
const ErrorResponse = require("../utils/errorResponse.utils");
const asyncHandler = require("../middleware/asyncHandler.middleware");

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get a category
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  // Check Resource Exists
  if (!category) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({ success: true, data: category });
});

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  // Check Resource Exists
  if (!category) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  category.save();

  res.status(200).json({ success: true, data: category });
});

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  // Check Resource Exists
  if (!category) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  category.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload a category image
// @route   PUT /api/v1/category/:id/photo
// @access  Private
exports.categoryFileUpload = asyncHandler(async (req, res, next) => {
  res.status(200).json(res);
});
