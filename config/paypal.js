const paypal = require("paypal-rest-sdk");

/* Credentials provided when a Paypal App is created */
const paypalConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return paypal.configure({
      mode: "sandbox",
      client_id: process.env.PAYPAL_TEST_CLIENT_ID,
      client_secret: process.env.PAYPAL_TEST_CLIENT_SECRET,
    });
  } else {
    return paypal.configure({
      mode: "live",
      client_id: process.env.PAYPAL_CLIENT_ID,
      client_secret: process.env.PAYPAL_CLIENT_SECRET,
    });
  }
};

module.exports = paypalConfig;
