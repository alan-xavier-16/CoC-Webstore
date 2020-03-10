const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  updateMe,
  updatePwd,
  forgotPassword,
  resetPassword
} = require("../controllers/auth.controllers");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/logout").get(logout);
router.route("/updateme").put(protect, updateMe);
router.route("/updatepwd").put(protect, updatePwd);
router.route("/forgotPwd").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);

module.exports = router;
