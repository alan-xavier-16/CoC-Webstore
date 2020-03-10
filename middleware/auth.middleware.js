const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");
const User = require("../models/user.model");

/** Protect USER Routes */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get JWT Token from Request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  // Verify Token in Request
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});

/** Protect AUTHORIZED Routes */
exports.authorize = (...authRoles) => (req, res, next) => {
  if (!authRoles.includes(req.user.role)) {
    return next(new ErrorResponse(`User has no access to this route`, 403));
  }
  next();
};
