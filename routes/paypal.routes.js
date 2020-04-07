const express = require("express");
const {
  startPaypalPayment,
  executePaypalPayment,
  cancelPaypalPayment,
} = require("../controllers/paypal.controllers");
const router = express.Router();

/** Middleware */
// const { protect } = require("../middleware/auth.middleware");

// router.use(protect);

router.route("/pay").get(startPaypalPayment);
router.route("/success").get(executePaypalPayment);
router.route("/cancel").get(cancelPaypalPayment);

module.exports = router;
