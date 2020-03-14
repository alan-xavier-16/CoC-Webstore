const crypto = require("crypto");
const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");
const sendEmail = require("../utils/sendEmail.utils");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create and Save User to Database
  const user = await User.create({ name, email, password, role });

  // Get JWT
  const token = user.getSignedJWT();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Verify email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  // Verify User in Database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // Verify Pwd
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // Get JWT
  const token = user.getSignedJWT();

  res.status(200).json({ success: true, token });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc    Update User Details
// @route   PUT /api/v1/auth/updateme
// @access  Private
exports.updateMe = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  // Check Resource Exists
  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc    Update User Password
// @route   PUT /api/v1/auth/updatepwd
// @access  Private
exports.updatePwd = asyncHandler(async (req, res, next) => {
  // Find User with Pwd
  const user = await User.findById(req.user.id).select("+password");

  // Compare Passwords
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse(`Password is incorrect`, 401));
  }

  // Save User
  user.password = req.body.newPassword;
  await user.save();

  // Get JWT
  const token = user.getSignedJWT();

  res.status(200).json({ success: true, token });
});

// @desc    Log user out
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: {} });
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgotPwd
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  // Check Resource Exists
  if (!user) {
    return next(
      new ErrorResponse(`User not found with email ${req.body.email}`, 404)
    );
  }

  // Set resetPasswordToken
  const resetToken = user.getResetPwdToken();

  // Save User
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/resetpassword/${resetToken}`;

  let resetUrl;
  if (process.env.NODE_ENV === "production") {
    resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/signin/identity/${resetToken}`;
  } else {
    resetUrl = `${req.protocol}://localhost:3000/signin/identity/${resetToken}`;
  }

  const message = `You are receiving this email because you (or someone else) has requested a password reset. Click this link to reset: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: `${user.name} Password Reset`,
      message
    });

    res
      .status(200)
      .json({ success: true, data: `Email sent to ${user.email}` });
  } catch (err) {
    console.log(err);
    // Reset Token Fields in Error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });

    return next(new ErrorResponse(`Email could not be sent`, 500));
  }
});

// @desc    Reset Password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get Hashed Token from Request Param
  const resetPasswordToken = crypto
    .createHash("sha512")
    .update(req.params.resettoken)
    .digest("hex");

  // Find User by Token & Verify Validity
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  // Check Resource Exists
  if (!user) {
    return next(new ErrorResponse(`Invalid token`, 400));
  }

  // Save User
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Get JWT
  const token = user.getSignedJWT();

  res.status(200).json({ success: true, token });
});
