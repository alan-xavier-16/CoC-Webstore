const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ErrorResponse = require("../utils/errorResponse.utils");
const asyncHandler = require("../middleware/asyncHandler.middleware");

// @desc    Get all products
// @route   GET /api/v1/products
// @route   GET /api/v1/categories/:categoryId/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Apply filter for SPECIFIC Category
  if (req.params.categoryId) {
    const products = await Product.find({ category: req.params.categoryId });

    return res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get a product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // Check Resource Exists
  if (!product) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc    Create new product
// @route   POST /api/v1/categories/:categorySlug/products
// @access  Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.categorySlug });

  // Check Resource Exists
  if (!category) {
    return next(
      new ErrorResponse(
        `Resource not found with id ${req.params.categorySlug}`,
        404
      )
    );
  }

  req.body.category = category._id;

  const product = await Product.create(req.body);

  res.status(201).json({ success: true, data: product });
});

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // Check Resource Exists
  if (!product) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  // LOOP REQ.BODY & UPDATE PRODUCT WITH FIELDS IN FORM
  for (let key in req.body) {
    product[key] = req.body[key];
  }

  product.save();

  res.status(200).json({ success: true, data: product });
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // Check Resource Exists
  if (!product) {
    return next(
      new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
    );
  }

  // TODO: Check user is Admin

  product.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload a product image
// @route   PUT /api/v1/products/:id/photo
// @access  Private
exports.productFileUpload = asyncHandler(async (req, res, next) => {
  res.status(200).json(res);
});
