const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"]
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must contain at least six characters and has at least one lowercase, one uppercase alphabetical character and one numeric character"
    ],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/** Encrypt Password with bcryptjs */
UserSchema.pre("save", async function(next) {
  // Only perform when password field is modified
  if (!this.isModified("password")) {
    next();
  }

  // Bcryptjs Action
  salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/** JWT Token Authentication */
// Sign Token
UserSchema.methods.getSignedJWT = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    algorithm: "HS384",
    expiresIn: process.env.JWT_EXPIRE
  });
};

/** Compare User Pwd on Login */
UserSchema.methods.matchPassword = async function(enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

/** Reset & Forgot Password */
UserSchema.methods.getResetPwdToken = function() {
  // Create a Random Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash Token
  this.resetPasswordToken = crypto
    .createHash("sha512")
    .update(resetToken)
    .digest("hex");

  // Expire Token in 10 Mins
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
